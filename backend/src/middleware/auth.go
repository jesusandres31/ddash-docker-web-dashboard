package middleware

import (
	"net/http"
	"strings"

	"github.com/ddash/src/config"
	"github.com/golang-jwt/jwt"
)

// AuthMiddleware is a middleware to check for a valid Bearer token in the Authorization header.
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Get the Authorization header value from header o query string (due to SSE)
		authHeader := r.Header.Get(config.AuthHeaderKey)
		if authHeader == "" {
			authHeader = r.URL.Query().Get(config.AuthHeaderKey)
		}

		// Check if the header is empty
		if authHeader == "" {
			http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
			return
		}

		// Split the header value to get the token part
		authParts := strings.Split(authHeader, " ")
		if len(authParts) != 2 || authParts[0] != config.BearerKey {
			http.Error(w, "Invalid Authorization header format", http.StatusUnauthorized)
			return
		}

		tokenString := authParts[1]

		// Verify the token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// Replace with your secret key used for token signing
			secret := []byte(config.JWTSecret)
			return secret, nil
		})
		if err != nil {
			http.Error(w, "Invalid token: "+err.Error(), http.StatusUnauthorized)
			return
		}

		if !token.Valid {
			http.Error(w, "Expired or invalid token", http.StatusUnauthorized)
			return
		}

		// If the token is valid, proceed to the next handler
		next.ServeHTTP(w, r)
	})
}
