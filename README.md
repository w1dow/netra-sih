Sure. For the authentication system, we need to do this:

### Backend

1. **MySQL setup**

   * Create `netra` database.
   * Create `employees` table.
   * Store passwords as **bcrypt hashes**, never plain text.

2. **Database connection**

   ```text
   backend/db/connection.js
   ```

3. **Authentication controller**

   ```text
   backend/controllers/authController.js
   ```

   * Receive email/password.
   * Find employee in MySQL.
   * Verify password.
   * Generate JWT.
   * Return JWT + user information.

4. **JWT middleware**

   ```text
   backend/middleware/authMiddleware.js
   ```

   * Check `Authorization: Bearer <token>`.
   * Verify JWT.
   * Reject expired/invalid tokens.

5. **Auth routes**

   ```text
   backend/routes/auth.js
   ```

   * `POST /api/auth/login`
   * `GET /api/auth/verify`

6. **Environment configuration**

   ```text
   backend/.env
   ```

   * MySQL credentials
   * JWT secret
   * Port

---

### Frontend

7. **Login**

   * Send email/password to `/api/auth/login`.
   * Receive JWT.
   * Store JWT and user information.

8. **AuthContext**

   * Maintain global state:

   ```text
   user
   token
   isAuthenticated
   loading
   ```

9. **ProtectedRoute**

   * Pages like `/profile`, `/bids`, `/compliance`, etc. require authentication.
   * If not authenticated → `/login`.

10. **Login redirect**

* If already authenticated and someone manually visits `/login`:

```text
/login → /profile
```

11. **Token verification**

* On page refresh, frontend checks the stored JWT with:

```text
GET /api/auth/verify
```

* Valid → stay logged in.
* Invalid/expired → clear storage → `/login`.

### Final flow

```text
                    ┌──────────────┐
                    │    /login    │
                    └──────┬───────┘
                           │
                    Already logged in?
                       /          \
                     YES           NO
                      ↓             ↓
                  /profile      Login form
                                   ↓
                              POST /login
                                   ↓
                                MySQL
                                   ↓
                              Verify bcrypt
                                   ↓
                              Generate JWT
                                   ↓
                              Store token
                                   ↓
                               /profile


Protected page
      ↓
JWT exists?
   NO → /login
   YES
      ↓
Backend verifies JWT
   ↓
VALID → Allow
INVALID → /login
```

We already have the basic backend files started. **Next logical step is to finish MySQL setup, then build `AuthContext + ProtectedRoute` on the frontend.**
