package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"reflect"
	"time"

	"github.com/ddash/config"
	"github.com/docker/docker/api/types"
)


type ContainerInfo struct {
	ID string `json:"id"`
	Names []string `json:"names"`
	Image string `json:"image"` 
	Status string `json:"status"` 
	State string `json:"state"` 
 	Ports string `json:"ports"` 
	Created string `json:"created"` 
}

func ListContainers(w http.ResponseWriter, r *http.Request) {
    containers, err := config.DockerCli.ContainerList(config.BgCtx, types.ContainerListOptions{})
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    } 

    var containerInfoList []ContainerInfo
    for _, container := range containers {
        containerInfo := ContainerInfo{
 			ID: container.ID,
            Names: container.Names,
            Image: container.Image,
			Status: container.Status,
			State: container.State,
			// Ports: container.Ports,
			// Created: container.Created, 
        }
        containerInfoList = append(containerInfoList, containerInfo)
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(containerInfoList)
}


func ServerSentEvents(w http.ResponseWriter, r *http.Request) { 
    w.Header().Set("Content-Type", "text/event-stream")
    w.Header().Set("Cache-Control", "no-cache")
    w.Header().Set("Connection", "keep-alive")

    var prevContainerData []ContainerInfo

    for { 
        currentContainerData := getContainerData()
 
        if !reflect.DeepEqual(currentContainerData, prevContainerData) { 
           	data, err := json.Marshal(currentContainerData)
            if err != nil { 
                log.Println("Error encoding data:", err)
                return 
            }
            fmt.Fprintf(w, "data: %s\n\n", data)
            w.(http.Flusher).Flush()
			/* json.NewEncoder(w).Encode(currentContainerData) */
 
            prevContainerData = currentContainerData
        }
 
        time.Sleep(2 * time.Second)
    }
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
            ID:      container.ID,
            Names:   container.Names,
            Image:   container.Image,
            Status:  container.Status,
            State:   container.State,
            // Otras propiedades que desees incluir
        }
        containerInfoList = append(containerInfoList, containerInfo)
    }

    return containerInfoList
}
