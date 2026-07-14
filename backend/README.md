# APJ Institute Backend

## Setup

1. Copy `.env.example` to `.env` and fill in MySQL and JWT values.
2. Create the database and tables with `sql/schema.sql`.
3. Install dependencies inside `backend/`.
4. Start the server with `npm run dev`.

## APIs

### Admin

- `POST /api/admin/signup`
- `POST /api/admin/login`

### Student

- `POST /api/student/signup`
- `POST /api/student/login`

### Legacy aliases for the existing frontend

- `POST /api/auth/signup`
- `POST /api/auth/login`

## Example Requests

### Admin signup

```bash
curl -X POST http://localhost:5000/api/admin/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"APJ Admin","email":"admin@apj.edu","password":"Secret123!"}'
```

### Student signup

```bash
curl -X POST http://localhost:5000/api/student/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Rahul Kumar","email":"rahul@example.com","phone":"9876543210","course":"BSc Nursing","password":"Secret123!"}'
```

If the frontend does not send `phone` or `course`, the backend stores `""` and `General` by default for compatibility with the existing pages.

### Admin login

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@apj.edu","password":"Secret123!"}'
```

### Student login

```bash
curl -X POST http://localhost:5000/api/student/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rahul@example.com","password":"Secret123!"}'
```
