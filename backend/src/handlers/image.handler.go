package handlers

import (
	"net/http"

	"github.com/ddash/src/config"
	"github.com/ddash/src/utils"
	"github.com/docker/docker/api/types"
)

func ListImages(w http.ResponseWriter, r *http.Request) {
	utils.ExecuteAndRespond(w, r, func() (interface{}, error) {
		return config.DockerCli.ImageList(config.BgCtx, types.ImageListOptions{})
	})
}
