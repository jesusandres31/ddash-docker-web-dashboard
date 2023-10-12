package handlers

import (
	"net/http"

	"github.com/ddash/src/lib"
	"github.com/docker/docker/api/types"
)

func ListNetworks(w http.ResponseWriter, r *http.Request) {
	ExecuteAndRespond(w, r, func() (interface{}, error) {
		return lib.DockerCli.NetworkList(lib.Ctx, types.NetworkListOptions{})
	})
}
