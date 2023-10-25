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

// ValidatePassword validates a password against the given salt and hash.
func ValidatePassword(password string, salt string, hash string) bool {
	// Decode the salt from the hexadecimal string
	saltBytes, err := hex.DecodeString(salt)
	if err != nil {
		return false
	}

	// Calculate the hash using PBKDF2
	calculatedHashBytes := pbkdf2.Key([]byte(password), saltBytes, 10000, 512, sha512.New)
	calculatedHash := hex.EncodeToString(calculatedHashBytes)

	// Compare the calculated hash to the provided hash
	return calculatedHash == hash
}
