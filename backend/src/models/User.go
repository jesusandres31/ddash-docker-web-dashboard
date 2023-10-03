package models

import "gorm.io/gorm"

type User struct {
	gorm.Model

	ID    uint   `json:"id"`
	Email string `gorm:"not null;uniqueIndex" json:"email"`
	Hash  string `json:"hash"`
	Salt  string `json:"salt"`
}
