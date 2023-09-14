package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/ddash/config"
	"github.com/docker/docker/api/types"
)


type ContainerInfo struct {
	ID    string `json:"id"`
	Names []string `json:"names"`
	Image string `json:"image"` 
	Status string `json:"status"` 
	State string `json:"state"` 
 	Ports string `json:"ports"` 
	Created string `json:"created"` 
}

func DockerPSHandler(w http.ResponseWriter, r *http.Request) {  
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
