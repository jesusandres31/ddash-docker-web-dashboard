package model

import "github.com/google/uuid"

type User struct {
	Id    uint      `json:"id" gorm:"primaryKey;autoIncrement"`
	UUID  uuid.UUID `gorm:"type:uuid;"` // SQLite doesn't have built-in UUID generation functions
	Name  string    `json:"name"`
	Email string    `json:"email" gorm:"unique"`
	Hash  string    `json:"hash"`
	Salt  string    `json:"salt"`
}

type CreateUserRequest struct {
	Name     string `json:"name" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=4"`
}

type UpdateUserRequest struct {
	Name  string `json:"name" validate:`
	Email string `json:"email" validate:email"`
}

// type userRequest struct {
// 	Name  string `json:"name" validate:"required"`
// 	Email string `json:"email" validate:"required,email"`
// }

// type CreateUserRequest struct {
// 	userRequest
// 	Password string `json:"password" validate:"required,min=4"`
// }

// type UpdateUserRequest struct {
// 	userRequest
// }
