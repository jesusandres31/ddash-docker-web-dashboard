package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/ddash/src/config"
	"github.com/ddash/src/lib"
	"github.com/ddash/src/model"
	"github.com/ddash/src/utils"
)

type SignInRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignInResponse struct {
	UUID         string `json:"uuid"`
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
	Email        string `json:"email"`
}

type RefreshTokenResponse struct {
	AccessToken string `json:"accessToken"`
}

// getUserByEmail
func getUserByEmail(email string) *model.User {
	var user model.User
	if err := lib.DB.First(&user, model.User{Email: email}).Error; err != nil {
		return nil
	}
	return &user
}

// SignIn
func SignIn(w http.ResponseWriter, r *http.Request) {
	var request SignInRequest
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		respondError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	rejectMsg := "Incorrect username or password."

	user := getUserByEmail(request.Email)
	if user == nil {
		respondError(w, http.StatusBadRequest, rejectMsg)
		return
	}

	isMatch := utils.ValidatePassword(request.Password, user.Salt, user.Hash)
	if !isMatch {
		respondError(w, http.StatusBadRequest, rejectMsg)
		return
	}

	accessToken, err := utils.CreateAccessToken(user.UUID.String(), false)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "Failed to create access token")
		return
	}
	refreshToken, err := utils.CreateAccessToken(user.UUID.String(), true)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "Failed to create refresh token")
		return
	}

	response := SignInResponse{
		UUID:         user.UUID.String(),
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		Email:        user.Email,
	}

	respondJSON(w, http.StatusOK, response)
}

// RefreshToken
func RefreshToken(w http.ResponseWriter, r *http.Request) {
	// Get the refresh token from the HTTP header
	token := r.Header.Get(config.AuthHeaderKey)
	if token == "" {
		respondError(w, http.StatusUnauthorized, "Refresh token missing in the header")
		return
	}

	// Clean the refresh token if it contains the "Bearer " prefix
	token = strings.TrimPrefix(token, config.BearerKey)

	// Remove extra spaces
	tokenString := strings.ReplaceAll(token, " ", "")
	fmt.Print(tokenString)

	// Validate the refresh token
	claims, err := utils.ValidateRefreshToken(tokenString)
	if err != nil {
		respondError(w, http.StatusBadRequest, "Invalid refresh token")
		return
	}

	// Check if the refresh token has expired
	exp, ok := claims["exp"].(float64)
	if !ok || int64(exp) < time.Now().Unix() {
		respondError(w, http.StatusUnauthorized, "Refresh token has expired")
		return
	}

	// If the refresh token is valid, create a new access token
	accessToken, err := utils.CreateAccessToken(claims["sub"].(string), false)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "Failed to create access token")
		return
	}

	response := RefreshTokenResponse{
		AccessToken: accessToken,
	}

	respondJSON(w, http.StatusOK, response)
}
