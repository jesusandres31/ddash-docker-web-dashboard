package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/ddash/src/models"
	"github.com/ddash/src/utils"
	"golang.org/x/crypto/bcrypt"
)

var users []models.User

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var newUser models.User
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Generate a salt
	salt := generateSalt()

	// Hash the password with the salt
	passwordHash := hashPassword(newUser.Password, salt)

	newUser.PasswordHash = passwordHash
	newUser.Salt = salt

	users = append(users, newUser)
	w.WriteHeader(http.StatusCreated)
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Find the user by email
	for _, u := range users {
		if u.Email == user.Email {
			// Verify the password hash
			if verifyPassword(u.PasswordHash, user.Password, u.Salt) {
				token, err := utils.GenerateToken(user.Email)
				if err != nil {
					http.Error(w, "Unable to generate token", http.StatusInternalServerError)
					return
				}
				w.Header().Set("Authorization", "Bearer "+token)
				return
			}
		}
	}

	http.Error(w, "Invalid email or password", http.StatusUnauthorized)
}

func generateSalt() string {
	// Generate a random salt (you should use a better method in production)
	return "random_salt"
}

func hashPassword(password, salt string) string {
	// Hash the password and salt (you should use a more secure hashing method)
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password+salt), bcrypt.DefaultCost)
	return string(hashedPassword)
}

func verifyPassword(hash, password, salt string) bool {
	// Verify the password hash
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password+salt))
	return err == nil
}
