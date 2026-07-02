# Exalore ERP

A simple ERP (Enterprise Resource Planning) system built as an interview task. It covers inventory management, sales tracking, and user authentication with JWT-based security.

## Tech Stack

React, Tailwind, axios+react-query, Django, DRF, Simple JWT, PostgreSQL, Docker

## Where Tokens Are Stored (Frontend)

Tokens are stored in the browser's **`localStorage`**:

| Key             | Value                 |
| --------------- | --------------------- |
| `access_token`  | The JWT access token  |
| `refresh_token` | The JWT refresh token |

This is handled in `frontend/src/api/axios.js`:

- On **login**, the access and refresh tokens are saved to `localStorage`.
- On **each request**, the Axios request interceptor reads `access_token` from `localStorage` and attaches it as a `Bearer` token in the `Authorization` header.
- On **401 responses**, the Axios response interceptor automatically attempts to refresh the token using the stored `refresh_token`. If refresh succeeds, the new tokens are saved back to `localStorage` and the original request is retried. If refresh fails, the user is logged out and redirected to `/authentication`.
- On **logout**, both `access_token` and `refresh_token` are removed from `localStorage`.

### Login Supports Email or Username

A custom authentication backend (`backend/account/backend.py`) allows users to log in with either their **username** or **email**.

## Authentication & Token Storage (Backend)

The app uses **JWT (JSON Web Tokens)** via `djangorestframework-simplejwt`.

### Token Lifetimes (configured in `backend/config/settings.py`)

- **Access Token** → 30 minutes
- **Refresh Token** → 1 day
- Refresh tokens are **rotated** on each use and old tokens are **blacklisted**.

### Default Permission Class

`IsAuthenticated` is set **globally** in `backend/config/settings.py` under `REST_FRAMEWORK` settings, so there is no need to add `permission_classes = [IsAuthenticated]` on every view:

```python
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
}
```

All API views are **authenticated by default**. Views that need to be public (like register and login) explicitly override this with `permission_classes = [AllowAny]`.

### Custom Authentication Backend

A custom authentication backend `EmailOrUsernameBackend` is defined in `backend/account/backend.py`. It extends Django's `ModelBackend` and allows users to log in using **either their username or email address**.

Both backends are registered in `backend/config/settings.py`:

```python
AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "account.backend.EmailOrUsernameBackend",
]
```

Django tries each backend in order — if the default `ModelBackend` doesn't match, it falls back to `EmailOrUsernameBackend`, which looks up the user by `username` **or** `email`.
