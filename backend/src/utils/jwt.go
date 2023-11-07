package utils

import (
	"fmt"
	"time"

	"github.com/ddash/src/config"
	"github.com/golang-jwt/jwt"
)

// CreateAccessToken creates a JWT access token.
func CreateAccessToken(uuid string, isRefresh bool) (string, error) {
	// Create a new token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["sub"] = uuid
	if isRefresh {
		claims["exp"] = time.Now().Add(24 * time.Hour).Unix() // Refresh Token expires in 24 hours for refresh tokens
	} else {
		claims["exp"] = time.Now().Add(3 * time.Hour).Unix() // Regular Token expires in 3 hours for regular tokens
	}

	// Sign the token with the secret key
	tokenString, err := token.SignedString([]byte(config.JWTSecret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// ValidateRefreshToken valida un JWT "refresh token".
func ValidateRefreshToken(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Validate the signing method and use the same secret key as for access tokens
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte(config.JWTSecret), nil
	})
	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, fmt.Errorf("Invalid token")
	}

	return claims, nil
}
