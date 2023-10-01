package handlers

import (
	"net/http"

	"github.com/ddash/src/config"
	"github.com/ddash/src/utils"
	"github.com/docker/docker/api/types"
)

func GetSystemInfo(w http.ResponseWriter, r *http.Request) {
	utils.ExecuteAndRespond(w, r, func() (interface{}, error) {
		return config.DockerCli.Info(config.BgCtx)
	})
}

func GetDiskUsage(w http.ResponseWriter, r *http.Request) {
	utils.ExecuteAndRespond(w, r, func() (interface{}, error) {
		return config.DockerCli.DiskUsage(config.BgCtx, types.DiskUsageOptions{})
	})
}

func GetPingStatus(w http.ResponseWriter, r *http.Request) {
	utils.ExecuteAndRespond(w, r, func() (interface{}, error) {
		return config.DockerCli.Ping(config.BgCtx)
	})
}
