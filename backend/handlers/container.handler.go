package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"reflect"
	"sync"
	"time"

	"github.com/ddash/config"
	"github.com/docker/docker/api/types"
)

type ContainerInfo struct {
	ID      string   `json:"id"`
	Names   []string `json:"names"`
	Image   string   `json:"image"`
	Status  string   `json:"status"`
	State   string   `json:"state"`
	Ports   string   `json:"ports"`
	Created string   `json:"created"`
}

func ListContainers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	containers, err := config.DockerCli.ContainerList(config.BgCtx, types.ContainerListOptions{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var containerInfoList []ContainerInfo
	for _, container := range containers {
		containerInfo := ContainerInfo{
			ID:     container.ID,
			Names:  container.Names,
			Image:  container.Image,
			Status: container.Status,
			State:  container.State,
			// Ports: container.Ports,
			// Created: container.Created,
		}
		containerInfoList = append(containerInfoList, containerInfo)
	}

	json.NewEncoder(w).Encode(containerInfoList)
}

func ServerSentEvents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	// Use a WaitGroup to wait for goroutine to finish before returning
	var wg sync.WaitGroup
	wg.Add(1)

	// Create a channel to signal the goroutine to exit
	stopChan := make(chan struct{})

	// Start a goroutine to handle SSE updates
	go func() {
		defer wg.Done()
		defer close(stopChan)

		prevContainerData := []ContainerInfo{}

		for {
			select {
			case <-stopChan:
				return // Exit the goroutine when signaled
			default:
				currentContainerData := getContainerData()

				if !reflect.DeepEqual(currentContainerData, prevContainerData) {
					data, err := json.Marshal(currentContainerData)
					if err != nil {
						log.Println("Error encoding data:", err)
						return
					}
					fmt.Fprintf(w, "data: %s\n\n", data)
					w.(http.Flusher).Flush()

					prevContainerData = currentContainerData
				}

				time.Sleep(2 * time.Second)
			}
		}
	}()

	// Wait for the goroutine to finish before returning
	wg.Wait()
}

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
