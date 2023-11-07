package handler

import (
	"encoding/json"
	"net/http"
	"time"

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

type RefreshTokenRequest struct {
	RefreshToken string `json:"refreshToken"`
}

type RefreshTokenResponse struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
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
	var request RefreshTokenRequest
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		respondError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	// Validate the refresh token
	claims, err := utils.ValidateRefreshToken(request.RefreshToken)
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

	// If the refresh token is valid, create a new access and refresh token
	accessToken, err := utils.CreateAccessToken(claims["sub"].(string), false)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "Failed to create access token")
		return
	}
	refreshToken, err := utils.CreateAccessToken(claims["sub"].(string), true)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "Failed to create refresh token")
		return
	}

	response := RefreshTokenResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}

	respondJSON(w, http.StatusOK, response)
}
