package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/ddash/config"
	"github.com/docker/docker/api/types"
)

type ImageInfo struct {
    ID          string   `json:"id"`
    RepoTags    []string `json:"repoTags"`
    Created     int64    `json:"created"`
    VirtualSize int64    `json:"virtualSize"`
}

func ListImages(w http.ResponseWriter, r *http.Request) {
    images, err := config.DockerCli.ImageList(config.BgCtx, types.ImageListOptions{})
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    var imageInfoList []ImageInfo
    for _, image := range images {
        imageInfo := ImageInfo{
            ID:          image.ID,
            RepoTags:    image.RepoTags,
            Created:     image.Created,
            VirtualSize: image.VirtualSize,
        }
        imageInfoList = append(imageInfoList, imageInfo)
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(imageInfoList)
}
