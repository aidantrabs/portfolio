package handler

import (
	"database/sql"
	"net/http"
	"strconv"

	"portfolio/internal/storage/db"

	"github.com/labstack/echo/v4"
)

func (h *Handler) CreateExperience(c echo.Context) error {
	var req CreateExperienceRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse("invalid request format"))
	}

	if req.Company == "" || req.Position == "" {
		return c.JSON(http.StatusBadRequest, errorResponse("company and position are required stoopid"))
	}

	var sqlEndDate sql.NullTime
	if !req.Current && req.EndDate != nil {
		sqlEndDate = sql.NullTime{
			Time:  *req.EndDate,
			Valid: true,
		}
	}

	params := db.CreateExperienceParams{
		Company:      req.Company,
		Position:     req.Position,
		Location:     sql.NullString{String: req.Location, Valid: req.Location != ""},
		StartDate:    req.StartDate,
		EndDate:      sqlEndDate,
		Current:      sql.NullBool{Bool: req.Current, Valid: true},
		Description:  req.Description,
		Technologies: req.Technologies,
		CompanyUrl:   sql.NullString{String: req.CompanyUrl, Valid: req.CompanyUrl != ""},
	}

	experience, err := h.store.CreateExperience(c.Request().Context(), params)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errorResponse("failed to create experience"))
	}

	return c.JSON(http.StatusCreated, successResponse(experience))
}

func (h *Handler) ListExperience(c echo.Context) error {
	experiences, err := h.store.ListExperience(c.Request().Context())
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errorResponse("failed to fetch experiences"))
	}

	return c.JSON(http.StatusOK, successResponse(experiences))
}

func (h *Handler) UpdateExperience(c echo.Context) error {
	idStr := c.Param("id")
	if idStr == "" {
		return c.JSON(http.StatusBadRequest, errorResponse("ID is required"))
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse("invalid ID format"))
	}

	var req UpdateExperienceRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse("invalid request format"))
	}

	var sqlEndDate sql.NullTime
	if !req.Current && req.EndDate != nil {
		sqlEndDate = sql.NullTime{
			Time:  *req.EndDate,
			Valid: true,
		}
	}

	params := db.UpdateExperienceParams{
		ID:           int32(id),
		Company:      req.Company,
		Position:     req.Position,
		Location:     sql.NullString{String: req.Location, Valid: req.Location != ""},
		StartDate:    req.StartDate,
		EndDate:      sqlEndDate,
		Current:      sql.NullBool{Bool: req.Current, Valid: true},
		Description:  req.Description,
		Technologies: req.Technologies,
		CompanyUrl:   sql.NullString{String: req.CompanyUrl, Valid: req.CompanyUrl != ""},
	}

	experience, err := h.store.UpdateExperience(c.Request().Context(), params)
	if err != nil {
		if err == sql.ErrNoRows {
			return c.JSON(http.StatusNotFound, errorResponse("experience not found"))
		}
		return c.JSON(http.StatusInternalServerError, errorResponse("failed to update experience"))
	}

	return c.JSON(http.StatusOK, successResponse(experience))
}

func (h *Handler) DeleteExperience(c echo.Context) error {
	idStr := c.Param("id")
	if idStr == "" {
		return c.JSON(http.StatusBadRequest, errorResponse("ID is required"))
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse("invalid ID format"))
	}

	err = h.store.DeleteExperience(c.Request().Context(), int32(id))
	if err != nil {
		if err == sql.ErrNoRows {
			return c.JSON(http.StatusNotFound, errorResponse("experience not found"))
		}
		return c.JSON(http.StatusInternalServerError, errorResponse("failed to delete experience"))
	}

	return c.JSON(http.StatusOK, successResponse(nil))
}

func (h *Handler) GetCurrentExperience(c echo.Context) error {
	experiences, err := h.store.GetCurrentExperience(c.Request().Context())
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errorResponse("couldn't fetch current experiences"))
	}

	return c.JSON(http.StatusOK, successResponse(experiences))
}

func (h *Handler) GetPastExperience(c echo.Context) error {
	experiences, err := h.store.GetPastExperience(c.Request().Context())
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errorResponse("couldn't fetch past experiences"))
	}

	return c.JSON(http.StatusOK, successResponse(experiences))
}
