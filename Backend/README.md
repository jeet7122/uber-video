# Backend Middleware - Authentication

This document explains the end-to-end HTTP response for the authentication middleware and what it does.

## Middleware Function: `authUser`

This middleware function checks if the user is authenticated. It performs the following steps:

1. **Check for Token**: It checks if the token is present in the request header or in the cookies.
2. **Unauthorized Response**: If the token is not present, it returns a 401 status code with a message "Unauthorized".
3. **Check Blacklist**: It checks if the token is blacklisted by querying the database.
4. **Unauthorized Response**: If the token is blacklisted, it returns a 401 status code with a message "Unauthorized".
5. **Verify Token**: It verifies the token using `jwt.verify` method.
6. **Fetch User**: It fetches the user from the database using the user ID from the decoded token.
7. **Attach User**: It attaches the user to the request object.
8. **Next Middleware**: It calls the next middleware function.

### Example HTTP Response

#### Request
```http
GET /protected-route HTTP/1.1
Host: example.com
Authorization: Bearer <token>
```

#### Response (Unauthorized - No Token)
```json
{
    "message": "Unauthorized"
}
```

#### Response (Unauthorized - Blacklisted Token)
```json
{
    "message": "Unauthorized"
}
```

#### Response (Authorized)
If the token is valid and not blacklisted, the request proceeds to the next middleware or route handler.

```json
{
    "user": {
        "_id": "user_id",
        "name": "User Name",
        "email": "user@example.com",
        // ...other user fields...
    }
}
```

This middleware ensures that only authenticated users can access protected routes by verifying the presence and validity of the token.
