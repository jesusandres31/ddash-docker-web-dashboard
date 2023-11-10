package handler

import (
	"net/http"

	"github.com/ddash/src/lib"
	"github.com/docker/docker/api/types/volume"
)

func ListVolumes(w http.ResponseWriter, r *http.Request) {
	execAndRespond(w, r, func() (interface{}, error) {
		return lib.DockerCli.VolumeList(lib.Ctx, volume.ListOptions{})
	})
}
