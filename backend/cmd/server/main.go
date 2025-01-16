package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"portfolio/internal/config"
	"portfolio/internal/handler"
	customMiddleware "portfolio/internal/middleware"
	"portfolio/internal/storage"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	store, err := storage.NewStore(cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("failed to initialize database: %v", err)
	}
	defer store.Close()

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	h := handler.NewHandler(store, cfg)

	api := e.Group("/api")

	api.GET("/health", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{"status": "healthy"})
	})

	auth := api.Group("/auth")
	auth.POST("/login", h.Login)
	auth.POST("/register", h.Register)

	projects := api.Group("/projects")
	projects.GET("", h.ListProjects)
	projects.GET("/featured", h.GetFeaturedProjects)
	projects.GET("/search", h.SearchProjects)
	projects.GET("/:slug", h.GetProject)

	about := api.Group("/about")
	about.GET("", h.GetAbout)

	experience := api.Group("/experience")
	experience.GET("", h.ListExperience)
	experience.GET("/current", h.GetCurrentExperience)
	experience.GET("/past", h.GetPastExperience)

	admin := api.Group("/admin", customMiddleware.JWT(&customMiddleware.JWTConfig{
		Secret: cfg.JWTSecret,
	}))

	adminProjects := admin.Group("/projects")
	adminProjects.POST("", h.CreateProject)
	adminProjects.PUT("/:id", h.UpdateProject)
	adminProjects.DELETE("/:id", h.DeleteProject)

	adminAbout := admin.Group("/about")
	adminAbout.PUT("", h.UpdateAbout)

	adminExperience := admin.Group("/experience")
	adminExperience.POST("", h.CreateExperience)
	adminExperience.PUT("/:id", h.UpdateExperience)
	adminExperience.DELETE("/:id", h.DeleteExperience)

	go func() {
		if err := e.Start(":" + cfg.ServerPort); err != nil && err != http.ErrServerClosed {
			e.Logger.Fatal("shutting down the server")
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := e.Shutdown(ctx); err != nil {
		e.Logger.Fatal(err)
	}
}
