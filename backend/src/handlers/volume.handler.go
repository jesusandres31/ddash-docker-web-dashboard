package handlers

import (
	"net/http"

	"github.com/ddash/src/config"
	"github.com/ddash/src/utils"
	"github.com/docker/docker/api/types/volume"
)

func ListVolumes(w http.ResponseWriter, r *http.Request) {
	listOptions := volume.ListOptions{}

	utils.ExecuteAndRespond(w, r, func() (interface{}, error) {
		return config.DockerCli.VolumeList(config.BgCtx, listOptions)
	})
}
