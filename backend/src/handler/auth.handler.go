package handler

import (
	"encoding/json"
	"net/http"

	"github.com/ddash/src/lib"
	"github.com/ddash/src/model"
	"github.com/ddash/src/utils"
)

type SignInRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignInResponse struct {
	UUID        string `json:"uuid"`
	AccessToken string `json:"accessToken"`
	Name        string `json:"name"`
}

func SignInHandler(w http.ResponseWriter, r *http.Request) {
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

	/* accessToken, err := createAccessToken(user.UUID, role)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "Failed to create access token")
		return
	} */

	accessToken := "1234567890"

	response := SignInResponse{
		UUID:        user.UUID.String(),
		AccessToken: accessToken,
		Name:        user.Name,
	}

	respondJSON(w, http.StatusOK, response)
}

func getUserByEmail(email string) *model.User {
	var user model.User
	if err := lib.DB.First(&user, model.User{Email: email}).Error; err != nil {
		return nil
	}
	return &user
}
