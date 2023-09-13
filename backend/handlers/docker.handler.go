package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"golang.org/x/net/context"
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
    ctx := context.Background()
    cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    containers, err := cli.ContainerList(ctx, types.ContainerListOptions{})
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
