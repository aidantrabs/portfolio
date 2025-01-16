package handler

import (
	"net/http"
	"time"

	"portfolio/internal/storage/db"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

func (h *Handler) Login(c echo.Context) error {
	var req LoginRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse("invalid request"))
	}

	ctx := c.Request().Context()
	user, err := h.store.GetUserByUsername(ctx, req.Username)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, errorResponse("invalid credentials"))
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		return c.JSON(http.StatusUnauthorized, errorResponse("invalid credentials"))
	}

	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = user.ID
	claims["username"] = user.Username
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	t, err := token.SignedString([]byte(h.config.JWTSecret))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errorResponse("couldn't generate token"))
	}

	return c.JSON(http.StatusOK, successResponse(LoginResponse{Token: t}))
}

func (h *Handler) Register(c echo.Context) error {
	var req RegisterRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse("invalid request"))
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errorResponse("couldn't hash password"))
	}

	params := db.CreateUserParams{
		Username:     req.Username,
		PasswordHash: string(hashedPassword),
		Email:        req.Email,
	}

	ctx := c.Request().Context()
	user, err := h.store.CreateUser(ctx, params)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errorResponse("couldn't create user"))
	}

	return c.JSON(http.StatusCreated, successResponse(user))
}
