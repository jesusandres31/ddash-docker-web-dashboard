package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/ddash/config"
	"github.com/docker/docker/api/types/volume"
)

type VolumeInfo struct {
    Name       string `json:"name"`
    Driver     string `json:"driver"`
    Mountpoint string `json:"mountpoint"`
}

func ListVolumes(w http.ResponseWriter, r *http.Request) {
	listOptions := volume.ListOptions{}
    volumes, err := config.DockerCli.VolumeList(config.BgCtx, listOptions )
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    var volumeInfoList []VolumeInfo
    for _, volume := range volumes.Volumes {
        volumeInfo := VolumeInfo{
            Name:       volume.Name,
            Driver:     volume.Driver,
            Mountpoint: volume.Mountpoint,
        }
        volumeInfoList = append(volumeInfoList, volumeInfo)
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(volumeInfoList)
}
