package utils

import (
	"github.com/google/uuid"
)

// GenerateUUID generates a new UUID.
func GenerateUUID() uuid.UUID {
	return uuid.New()
}
