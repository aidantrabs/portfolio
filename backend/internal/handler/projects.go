package handler

import (
	"database/sql"
	"net/http"
	"strconv"
	"strings"

	"portfolio/internal/storage/db"

	"github.com/labstack/echo/v4"
)

func (h *Handler) CreateProject(c echo.Context) error {
	var req CreateProjectRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse("invalid request"))
	}

	slug := strings.ToLower(strings.ReplaceAll(req.Title, " ", "-"))

	params := db.CreateProjectParams{
		Title:        req.Title,
		Slug:         slug,
		Description:  sql.NullString{String: req.Description, Valid: req.Description != ""},
		Technologies: req.Technologies,
		ImageUrl:     sql.NullString{String: req.ImageUrl, Valid: req.ImageUrl != ""},
		ProjectUrl:   sql.NullString{String: req.ProjectUrl, Valid: req.ProjectUrl != ""},
		GithubUrl:    sql.NullString{String: req.GithubUrl, Valid: req.GithubUrl != ""},
		Featured:     sql.NullBool{Bool: req.Featured, Valid: true},
	}

	project, err := h.store.CreateProject(c.Request().Context(), params)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errorResponse("couldn't create project"))
	}

	return c.JSON(http.StatusCreated, successResponse(project))
}

func (h *Handler) ListProjects(c echo.Context) error {
	projects, err := h.store.ListProjects(c.Request().Context())
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errorResponse("couldn't fetch projects"))
	}

	return c.JSON(http.StatusOK, successResponse(projects))
}

func (h *Handler) GetProject(c echo.Context) error {
	slug := c.Param("slug")
	project, err := h.store.GetProjectBySlug(c.Request().Context(), slug)
	if err != nil {
		return c.JSON(http.StatusNotFound, errorResponse("Project not found"))
	}

	return c.JSON(http.StatusOK, successResponse(project))
}

func (h *Handler) UpdateProject(c echo.Context) error {
	idStr := c.Param("id")
	if idStr == "" {
		return c.JSON(http.StatusBadRequest, errorResponse("ID is required"))
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse("invalid ID format"))
	}

	var req UpdateProjectRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse("invalid request"))
	}

	params := db.UpdateProjectParams{
		ID:           int32(id),
		Title:        req.Title,
		Description:  sql.NullString{String: req.Description, Valid: req.Description != ""},
		Technologies: req.Technologies,
		ImageUrl:     sql.NullString{String: req.ImageUrl, Valid: req.ImageUrl != ""},
		ProjectUrl:   sql.NullString{String: req.ProjectUrl, Valid: req.ProjectUrl != ""},
		GithubUrl:    sql.NullString{String: req.GithubUrl, Valid: req.GithubUrl != ""},
		Featured:     sql.NullBool{Bool: req.Featured, Valid: true},
	}

	project, err := h.store.UpdateProject(c.Request().Context(), params)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errorResponse("couldn't update project"))
	}

	return c.JSON(http.StatusOK, successResponse(project))
}

func (h *Handler) DeleteProject(c echo.Context) error {
	idStr := c.Param("id")
	if idStr == "" {
		return c.JSON(http.StatusBadRequest, errorResponse("ID is required"))
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse("invalid ID format"))
	}

	err = h.store.DeleteProject(c.Request().Context(), int32(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errorResponse("could not delete project"))
	}

	return c.JSON(http.StatusOK, successResponse(nil))
}

func (h *Handler) GetFeaturedProjects(c echo.Context) error {
	projects, err := h.store.GetFeaturedProjects(c.Request().Context())
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errorResponse("could not fetch featured projects"))
	}

	return c.JSON(http.StatusOK, successResponse(projects))
}

func (h *Handler) SearchProjects(c echo.Context) error {
	query := c.QueryParam("q")
	if query == "" {
		return c.JSON(http.StatusBadRequest, errorResponse("search query is required"))
	}

	searchParam := sql.NullString{
		String: query,
		Valid:  true,
	}

	projects, err := h.store.SearchProjects(c.Request().Context(), searchParam)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errorResponse("couldn't search projects"))
	}

	return c.JSON(http.StatusOK, successResponse(projects))
}
