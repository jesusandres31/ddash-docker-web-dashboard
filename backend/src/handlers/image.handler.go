package handlers

import (
	"net/http"

	"github.com/ddash/src/lib"
	"github.com/docker/docker/api/types"
)

func ListImages(w http.ResponseWriter, r *http.Request) {
	ExecuteAndRespond(w, r, func() (interface{}, error) {
		return lib.DockerCli.ImageList(lib.Ctx, types.ImageListOptions{})
	})
}
