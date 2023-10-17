package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"reflect"
	"time"

	"github.com/ddash/src/config"
	"github.com/ddash/src/lib"
	"github.com/docker/docker/api/types"
)

func setSSEHeaders(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
}

func getContainers() []types.Container {
	containers, err := lib.DockerCli.ContainerList(lib.Ctx, types.ContainerListOptions{All: false})
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

func sseContainerUpdater(ctx context.Context, c chan []types.Container) {
	defer close(c)

	prevContainer := []types.Container{}

	for {
		select {
		case <-ctx.Done():
			return
		default:
			containers := getContainers()

			if !reflect.DeepEqual(prevContainer, containers) {
				c <- containers
				prevContainer = containers
			}

			time.Sleep(config.PollingInterval)
		}
	}
}

func ListContainers(w http.ResponseWriter, r *http.Request) {
	sseParam := r.URL.Query().Get(config.SSEQueryParam)

	// response JSON or SSE depending on the query params
	if sseParam != config.SSEQueryKey {
		containers := getContainers()
		if err := json.NewEncoder(w).Encode(containers); err != nil {
			log.Printf("Error encoding data: %v", err)
			w.WriteHeader(http.StatusInternalServerError)
		}

	} else {
		setSSEHeaders(w)

		c := make(chan []types.Container)

		go sseContainerUpdater(r.Context(), c)

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
