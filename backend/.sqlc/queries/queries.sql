-- name: GetUser :one
SELECT * FROM users
WHERE id = $1 LIMIT 1;

-- name: GetUserByUsername :one
SELECT * FROM users
WHERE username = $1 LIMIT 1;

-- name: CreateUser :one
INSERT INTO users (
    username, password_hash, email
) VALUES (
    $1, $2, $3
)
RETURNING *;

-- name: ListProjects :many
SELECT * FROM projects
ORDER BY created_at DESC;

-- name: GetProject :one
SELECT * FROM projects
WHERE id = $1 LIMIT 1;

-- name: CreateProject :one
INSERT INTO projects (
    title, slug, description, technologies,
    image_url, project_url, github_url, featured
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
)
RETURNING *;

-- name: UpdateProject :one
UPDATE projects
SET title = $2,
    description = $3,
    technologies = $4,
    image_url = $5,
    project_url = $6,
    github_url = $7,
    featured = $8,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $1
RETURNING *;

-- name: DeleteProject :exec
DELETE FROM projects WHERE id = $1;

-- name: GetAbout :one
SELECT * FROM about
WHERE id = 1 LIMIT 1;

-- name: UpsertAbout :one
INSERT INTO about (
    id, bio, skills, resume_url, social_links
) VALUES (
    1, $1, $2, $3, $4
)
ON CONFLICT (id) DO UPDATE
SET bio = EXCLUDED.bio,
    skills = EXCLUDED.skills,
    resume_url = EXCLUDED.resume_url,
    social_links = EXCLUDED.social_links,
    updated_at = CURRENT_TIMESTAMP
RETURNING *;

-- name: ListExperience :many
SELECT * FROM experience
ORDER BY start_date DESC;

-- name: CreateExperience :one
INSERT INTO experience (
    company, position, location, start_date,
    end_date, current, description, technologies,
    company_url
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9
)
RETURNING *;

-- name: UpdateExperience :one
UPDATE experience
SET company = $2,
    position = $3,
    location = $4,
    start_date = $5,
    end_date = $6,
    current = $7,
    description = $8,
    technologies = $9,
    company_url = $10,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $1
RETURNING *;

-- name: DeleteExperience :exec
DELETE FROM experience WHERE id = $1;