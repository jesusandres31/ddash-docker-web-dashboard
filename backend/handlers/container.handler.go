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

func getContainers() []types.Container {
	containers, err := config.DockerCli.ContainerList(config.BgCtx, types.ContainerListOptions{})
	if err != nil {
		log.Printf("Error getting list of containers: %v", err)
		return nil
	}

	var containerInfoList []types.Container
	for _, container := range containers {
		containerInfo := container
		// containerInfo := types.Container{
		// 	ID:              container.ID,
		// 	Names:           container.Names,
		// 	Image:           container.Image,
		// 	ImageID:         container.ImageID,
		// 	Status:          container.Status,
		// 	State:           container.State,
		// 	Command:         container.Command,
		// 	Created:         container.Created,
		// 	Ports:           container.Ports,
		// 	SizeRw:          container.SizeRw,
		// 	SizeRootFs:      container.SizeRootFs,
		// 	Labels:          container.Labels,
		// 	HostConfig:      container.HostConfig,
		// 	NetworkSettings: container.NetworkSettings,
		// 	Mounts:          container.Mounts,
		// }
		containerInfoList = append(containerInfoList, containerInfo)
	}

	return containerInfoList
}

func ListContainers(w http.ResponseWriter, r *http.Request) {
	sseParam := r.URL.Query().Get(constants.SSEQueryParam)

	if sseParam != constants.SSEQueryKey {
		// response with SSE.
		utils.SeHTTPResHeaders(w)

		containers := getContainers()
		json.NewEncoder(w).Encode(containers)

	} else {
		// response with JSON.
		utils.SetSSEHeaders(w)

		c := make(chan []types.Container)
		defer close(c)

		go func() {
			prevContainerData := []types.Container{}

			for {
				currentContainerData := getContainers()

				if !reflect.DeepEqual(prevContainerData, currentContainerData) {
					c <- currentContainerData
					prevContainerData = currentContainerData
				}

				time.Sleep(constants.PollingInterval)
			}
		}()

		for {
			select {
			case containerData := <-c:
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
}
