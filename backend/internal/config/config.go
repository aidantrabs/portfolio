package config

import (
	"os"

	env "github.com/joho/godotenv"
)

type Config struct {
	DBPath    string
	Port      string
	JWTSecret string
	AdminUser string
	AdminPass string
}

func LoadConfig() (*Config, error) {
	env.Load()

	config := &Config{
		DBPath:    getEnv("DB_PATH", "data.db"),
		Port:      getEnv("PORT", "8080"),
		JWTSecret: getEnv("JWT_SECRET", ""),
		AdminUser: getEnv("ADMIN_USER", "admin"),
		AdminPass: getEnv("ADMIN_PASS", "admin"),
	}

	return config, nil
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
