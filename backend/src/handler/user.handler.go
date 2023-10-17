package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/ddash/src/lib"
	"github.com/ddash/src/model"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

// getUserOr404 gets a user instance if exists, or respond the 404 error otherwise
func getUserOr404(db *gorm.DB, id string, w http.ResponseWriter, r *http.Request) *model.User {
	uintID, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		respondError(w, http.StatusBadRequest, "Invalid ID format")
		return nil
	}

	user := model.User{}
	if err := db.First(&user, uint(uintID)).Error; err != nil {
		respondError(w, http.StatusNotFound, err.Error())
		return nil
	}
	return &user
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []model.User
	lib.DB.Find(&users)
	respondJSON(w, http.StatusOK, &users)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	id := params["id"]
	user := getUserOr404(lib.DB, id, w, r)
	if user == nil {
		return
	}
	respondJSON(w, http.StatusOK, user)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	user := model.User{}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&user); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := lib.DB.Save(&user).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusCreated, user)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	id := params["id"]
	user := getUserOr404(lib.DB, id, w, r)
	if user == nil {
		return
	}

	var updatedUser model.User
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&user); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

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

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	id := params["id"]
	user := getUserOr404(lib.DB, id, w, r)
	if user == nil {
		return
	}

	if err := lib.DB.Unscoped().Delete(&user).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, user)
}
