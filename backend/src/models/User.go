package models

type User struct {
	Id    uint   `json:"id" gorm:"primaryKey;autoIncrement"`
	Name  string `json:"name"`
	Email string `json:"email" gorm:"unique"`
	Hash  string `json:"hash"`
	Salt  string `json:"salt"`
}
