package utils

import (
	"crypto/rand"
	"crypto/sha512"
	"encoding/hex"

	"golang.org/x/crypto/pbkdf2"
)

// EncryptPassword encrypts a password and returns salt and hash.
func EncryptPassword(password string) (salt string, hash string, err error) {
	// Generate a random salt
	saltBytes := make([]byte, 16)
	if _, err = rand.Read(saltBytes); err != nil {
		return
	}
	salt = hex.EncodeToString(saltBytes)

	// Generate the hash using PBKDF2
	hashBytes := pbkdf2.Key([]byte(password), saltBytes, 10000, 512, sha512.New)
	hash = hex.EncodeToString(hashBytes)

	return
}
