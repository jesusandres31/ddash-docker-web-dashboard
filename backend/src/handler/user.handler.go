package handler

import (
	"encoding/json"
	"net/http"

	"github.com/ddash/src/lib"
	"github.com/ddash/src/model"
	"github.com/ddash/src/utils"
	"github.com/gorilla/mux"
)

// getUserOr404 gets a user instance if exists, or respond the 404 error otherwise
func getUserOr404(email string, w http.ResponseWriter, r *http.Request) *model.User {
	user := model.User{}
	if err := lib.DB.First(&user, model.User{Email: email}).Error; err != nil {
		respondError(w, http.StatusNotFound, err.Error())
		return nil
	}
	return &user
}

// Get all
func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []model.User
	lib.DB.Find(&users)
	respondJSON(w, http.StatusOK, &users)
}

// Get one
func GetUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	email := params["email"]
	user := getUserOr404(email, w, r)
	if user == nil {
		return
	}
	respondJSON(w, http.StatusOK, user)
}

// Create / Signup
func CreateUser(w http.ResponseWriter, r *http.Request) {
	request := model.CreateUserRequest{}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&request); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := lib.Validate.Struct(request); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}

	salt, hash, err := utils.EncryptPassword(request.Password)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "Error generating password hash")
		return
	}

	user := model.User{
		Name:  request.Name,
		Email: request.Email,
		Salt:  salt,
		Hash:  hash,
		UUID:  utils.GenerateUUID(),
	}

	if err := lib.DB.Save(&user).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusCreated, user)
}

// Update
func UpdateUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	email := params["email"]
	user := getUserOr404(email, w, r)
	if user == nil {
		return
	}

	var updatedUser model.UpdateUserRequest
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&user); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := lib.Validate.Struct(updatedUser); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}

	if updatedUser.Name != "" {
		user.Name = updatedUser.Name
	}
	if updatedUser.Email != "" {
		user.Email = updatedUser.Email
	}

	if err := lib.DB.Save(&user).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, user)
}

// Delete
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	email := params["email"]
	user := getUserOr404(email, w, r)
	if user == nil {
		return
	}

	if err := lib.DB.Unscoped().Delete(&user).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, user)
}
