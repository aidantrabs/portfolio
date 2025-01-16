package storage

import (
	"context"
	"database/sql"
	"portfolio/internal/storage/db"

	_ "github.com/lib/pq"
)

func NewStore(dataSourceName string) (*Store, error) {
	conn, err := sql.Open("postgres", dataSourceName)
	if err != nil {
		return nil, err
	}

	if err := conn.Ping(); err != nil {
		return nil, err
	}

	return &Store{
		Queries: db.New(conn),
		db:      conn,
	}, nil
}

// begin a transaction and return a store that will use it
func (s *Store) WithTx(ctx context.Context, fn func(*Store) error) error {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	q := db.New(tx)
	qtx := &Store{
		Queries: q,
		db:      s.db,
	}

	err = fn(qtx)
	if err != nil {
		if rbErr := tx.Rollback(); rbErr != nil {
			return rbErr
		}
		return err
	}

	return tx.Commit()
}

func (s *Store) Close() error {
	return s.db.Close()
}
