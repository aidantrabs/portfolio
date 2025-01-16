package handler

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"portfolio/internal/storage/db"

	"github.com/labstack/echo/v4"
	"github.com/sqlc-dev/pqtype"
)

func (h *Handler) GetAbout(c echo.Context) error {
	ctx := c.Request().Context()
	about, err := h.store.GetAbout(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errorResponse("couldn't get the about info"))
	}

	return c.JSON(http.StatusOK, successResponse(about))
}

func (h *Handler) UpdateAbout(c echo.Context) error {
	var req UpdateAboutRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse("invalid request"))
	}

	if !json.Valid(req.SocialLinks) {
		return c.JSON(http.StatusBadRequest, errorResponse("invalid social links json"))
	}

	params := db.UpsertAboutParams{
		Bio:       req.Bio,
		Skills:    req.Skills,
		ResumeUrl: sql.NullString{String: req.ResumeUrl, Valid: req.ResumeUrl != ""},
		SocialLinks: pqtype.NullRawMessage{
			RawMessage: req.SocialLinks,
			Valid:      len(req.SocialLinks) > 0,
		},
	}

	ctx := c.Request().Context()
	about, err := h.store.UpsertAbout(ctx, params)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errorResponse("couldn't update the about info"))
	}

	return c.JSON(http.StatusOK, successResponse(about))
}
