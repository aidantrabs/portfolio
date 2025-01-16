package handler

import (
	"encoding/json"
	"portfolio/internal/config"
	"portfolio/internal/storage/db"
	"time"
)

type Handler struct {
	store  db.Querier
	config *config.Config
}

type Response struct {
	Status  string      `json:"status"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

type UpdateAboutRequest struct {
	Bio         string          `json:"bio"`
	Skills      []string        `json:"skills"`
	ResumeUrl   string          `json:"resume_url"`
	SocialLinks json.RawMessage `json:"social_links"`
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token string `json:"token"`
}

type RegisterRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

type CreateExperienceRequest struct {
	Company      string     `json:"company"`
	Position     string     `json:"position"`
	Location     string     `json:"location"`
	StartDate    time.Time  `json:"start_date"`
	EndDate      *time.Time `json:"end_date,omitempty"`
	Current      bool       `json:"current"`
	Description  []string   `json:"description"`
	Technologies []string   `json:"technologies"`
	CompanyUrl   string     `json:"company_url"`
}

type UpdateExperienceRequest struct {
	Company      string     `json:"company"`
	Position     string     `json:"position"`
	Location     string     `json:"location"`
	StartDate    time.Time  `json:"start_date"`
	EndDate      *time.Time `json:"end_date,omitempty"`
	Current      bool       `json:"current"`
	Description  []string   `json:"description"`
	Technologies []string   `json:"technologies"`
	CompanyUrl   string     `json:"company_url"`
}

type CreateProjectRequest struct {
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	Technologies []string `json:"technologies"`
	ImageUrl     string   `json:"image_url"`
	ProjectUrl   string   `json:"project_url"`
	GithubUrl    string   `json:"github_url"`
	Featured     bool     `json:"featured"`
}

type UpdateProjectRequest struct {
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	Technologies []string `json:"technologies"`
	ImageUrl     string   `json:"image_url"`
	ProjectUrl   string   `json:"project_url"`
	GithubUrl    string   `json:"github_url"`
	Featured     bool     `json:"featured"`
}
