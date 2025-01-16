package handler

import (
	"portfolio/internal/config"
	"portfolio/internal/storage/db"
)

func NewHandler(store db.Querier, cfg *config.Config) *Handler {
	return &Handler{
		store:  store,
		config: cfg,
	}
}

func successResponse(data interface{}) Response {
	return Response{
		Status: "success",
		Data:   data,
	}
}

func errorResponse(message string) Response {
	return Response{
		Status:  "error",
		Message: message,
	}
}
