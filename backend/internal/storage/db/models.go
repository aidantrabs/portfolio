// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package db

import (
	"database/sql"
	"time"

	"github.com/sqlc-dev/pqtype"
)

type About struct {
	ID          int32                 `json:"id"`
	Bio         string                `json:"bio"`
	Skills      []string              `json:"skills"`
	ResumeUrl   sql.NullString        `json:"resume_url"`
	SocialLinks pqtype.NullRawMessage `json:"social_links"`
	CreatedAt   sql.NullTime          `json:"created_at"`
	UpdatedAt   sql.NullTime          `json:"updated_at"`
}

type Experience struct {
	ID           int32          `json:"id"`
	Company      string         `json:"company"`
	Position     string         `json:"position"`
	Location     sql.NullString `json:"location"`
	StartDate    time.Time      `json:"start_date"`
	EndDate      sql.NullTime   `json:"end_date"`
	Current      sql.NullBool   `json:"current"`
	Description  []string       `json:"description"`
	Technologies []string       `json:"technologies"`
	CompanyUrl   sql.NullString `json:"company_url"`
	CreatedAt    sql.NullTime   `json:"created_at"`
	UpdatedAt    sql.NullTime   `json:"updated_at"`
}

type Project struct {
	ID           int32          `json:"id"`
	Title        string         `json:"title"`
	Slug         string         `json:"slug"`
	Description  sql.NullString `json:"description"`
	Technologies []string       `json:"technologies"`
	ImageUrl     sql.NullString `json:"image_url"`
	ProjectUrl   sql.NullString `json:"project_url"`
	GithubUrl    sql.NullString `json:"github_url"`
	Featured     sql.NullBool   `json:"featured"`
	CreatedAt    sql.NullTime   `json:"created_at"`
	UpdatedAt    sql.NullTime   `json:"updated_at"`
}

type User struct {
	ID           int32        `json:"id"`
	Username     string       `json:"username"`
	PasswordHash string       `json:"password_hash"`
	Email        string       `json:"email"`
	CreatedAt    sql.NullTime `json:"created_at"`
	UpdatedAt    sql.NullTime `json:"updated_at"`
}
