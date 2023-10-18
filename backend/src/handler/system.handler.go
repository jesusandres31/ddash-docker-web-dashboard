package handler

import (
	"net/http"

	"github.com/ddash/src/lib"
	"github.com/docker/docker/api/types"
)

func GetSystemInfo(w http.ResponseWriter, r *http.Request) {
	execAndRespond(w, r, func() (interface{}, error) {
		return lib.DockerCli.Info(lib.Ctx)
	})
}

func GetDiskUsage(w http.ResponseWriter, r *http.Request) {
	execAndRespond(w, r, func() (interface{}, error) {
		return lib.DockerCli.DiskUsage(lib.Ctx, types.DiskUsageOptions{})
	})
}

func GetPingStatus(w http.ResponseWriter, r *http.Request) {
	execAndRespond(w, r, func() (interface{}, error) {
		return lib.DockerCli.Ping(lib.Ctx)
	})
}
