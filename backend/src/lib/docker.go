package lib

import (
	"github.com/docker/docker/client"
	"golang.org/x/net/context"
)

var (
	DockerCli *client.Client
	Ctx       context.Context
)
