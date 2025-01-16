FROM golang:1.23-alpine AS builder

WORKDIR /app

RUN apk add --no-cache gcc musl-dev make

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN make build

FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache ca-certificates

COPY --from=builder /app/bin/server .
COPY --from=builder /app/migrations ./migrations

COPY --from=builder /go/bin/goose /usr/local/bin/goose

EXPOSE 8080

CMD ["./server"]