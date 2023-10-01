package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"reflect"
	"time"

	"github.com/ddash/src/config"
	"github.com/ddash/src/constants"
	"github.com/ddash/src/utils"
	"github.com/docker/docker/api/types"
)

func getContainers() []types.Container {
	containers, err := config.DockerCli.ContainerList(config.BgCtx, types.ContainerListOptions{All: true})
	if err != nil {
		log.Printf("Error getting list of containers: %v", err)
		return nil
	}

	// var containerInfoList []types.Container
	// for _, container := range containers {
	// 	containerInfo := container
	// 	containerInfo := types.Container{
	// 		ID:              container.ID,
	// 		Names:           container.Names,
	// 		Image:           container.Image,
	// 		ImageID:         container.ImageID,
	// 		Status:          container.Status,
	// 		State:           container.State,
	// 		Command:         container.Command,
	// 		Created:         container.Created,
	// 		Ports:           container.Ports,
	// 		SizeRw:          container.SizeRw,
	// 		SizeRootFs:      container.SizeRootFs,
	// 		Labels:          container.Labels,
	// 		HostConfig:      container.HostConfig,
	// 		NetworkSettings: container.NetworkSettings,
	// 		Mounts:          container.Mounts,
	// 	}
	// 	containerInfoList = append(containerInfoList, containerInfo)
	// }

	return containers
}

func ListContainers(w http.ResponseWriter, r *http.Request) {
	sseParam := r.URL.Query().Get(constants.SSEQueryParam)

	if sseParam != constants.SSEQueryKey {
		// response SSE.
		utils.SeHTTPResHeaders(w)

		containers := getContainers()
		if err := json.NewEncoder(w).Encode(containers); err != nil {
			log.Printf("Error encoding data: %v", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

	} else {
		// response JSON.
		utils.SetSSEHeaders(w)

		c := make(chan []types.Container)
		defer close(c)

		go func() {
			prevContainer := []types.Container{}

			for {
				containers := getContainers()

				if !reflect.DeepEqual(prevContainer, containers) {
					c <- containers
					prevContainer = containers
				}

				time.Sleep(constants.PollingInterval)
			}
		}()

		for {
			select {
			case containers := <-c:
				data, err := json.Marshal(containers)
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
}
