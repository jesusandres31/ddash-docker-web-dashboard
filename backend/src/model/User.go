package model

type User struct {
	Id       uint   `json:"id" gorm:"primaryKey;autoIncrement"`
	Name     string `json:"name"`
	Email    string `json:"email" gorm:"unique"`
	Password string `json:"password"`
}