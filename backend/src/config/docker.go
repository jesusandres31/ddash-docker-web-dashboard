package config

import (
	"github.com/docker/docker/client"
	"golang.org/x/net/context"
)

var (
    DockerCli *client.Client
    BgCtx     context.Context
)
