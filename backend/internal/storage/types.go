package storage

import (
	"database/sql"
	"portfolio/internal/storage/db"
)

type Store struct {
	*db.Queries
	db *sql.DB
}
