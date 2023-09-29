package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"reflect"
	"time"

	"github.com/ddash/config"
	"github.com/ddash/constants"
	"github.com/ddash/utils"
	"github.com/docker/docker/api/types"
)

type ContainerInfo struct {
	ID     string   `json:"id"`
	Names  []string `json:"names"`
	Image  string   `json:"image"`
	Status string   `json:"status"`
	State  string   `json:"state"`
}

func ListContainers(w http.ResponseWriter, r *http.Request) {
	sseParam := r.URL.Query().Get(constants.SSEQueryParam)

	if sseParam == constants.SSEQueryKey {
		serveSSE(w, r)
	} else {
		serveJSON(w, r)
	}
}

func serveJSON(w http.ResponseWriter, r *http.Request) {
	utils.SeHTTPResHeaders(w)

	containers := getContainerData()
	json.NewEncoder(w).Encode(containers)
}

func serveSSE(w http.ResponseWriter, r *http.Request) {
	utils.SetSSEHeaders(w)

	updates := make(chan []ContainerInfo)
	defer close(updates)

	go func() {
		prevContainerData := []ContainerInfo{}

		for {
			currentContainerData := getContainerData()

			if !reflect.DeepEqual(prevContainerData, currentContainerData) {
				updates <- currentContainerData
				prevContainerData = currentContainerData
			}

			time.Sleep(constants.PollingInterval)
		}
	}()

	for {
		select {
		case containerData := <-updates:
			data, err := json.Marshal(containerData)
			if err != nil {
				log.Println("Error encoding data:", err)
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			fmt.Fprintf(w, "data: %s\n\n", data)
			w.(http.Flusher).Flush()
		case <-r.Context().Done():
			return
		}
	}
}

// utils
func getContainerData() []ContainerInfo {
	containers, err := config.DockerCli.ContainerList(config.BgCtx, types.ContainerListOptions{})
	if err != nil {
		log.Printf("Error getting list of containers: %v", err)
		return nil
	}

	var containerInfoList []ContainerInfo
	for _, container := range containers {
		containerInfo := ContainerInfo{
			ID:     container.ID,
			Names:  container.Names,
			Image:  container.Image,
			Status: container.Status,
			State:  container.State,
		}
		containerInfoList = append(containerInfoList, containerInfo)
	}

	return containerInfoList
}
