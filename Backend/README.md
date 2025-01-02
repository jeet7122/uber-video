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

# Captain Routes

This section explains the captain routes and their functionality.

## Route: `POST /captains/register`

This route registers a new captain. It performs the following steps:

1. **Validate Input**: It validates the input fields such as email, first name, password, and vehicle type.
2. **Register Captain**: It calls the `registerCaptain` method from the captain controller to register the captain.

### Example HTTP Request

#### Request
```http
POST /captains/register HTTP/1.1
Host: example.com
Content-Type: application/json

{
    "email": "captain@example.com",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "password": "password123",
    "vehicle": {
        "vehicleType": "sedan",
        "licensePlate": "ABC123"
    }
}
```

#### Response (Success)
```json
{
    "message": "Captain registered successfully",
    "captain": {
        "_id": "captain_id",
        "email": "captain@example.com",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "vehicle": {
            "vehicleType": "sedan",
            "licensePlate": "ABC123"
        }
    }
}
```

#### Response (Validation Error)
```json
{
    "errors": [
        {
            "msg": "Invalid email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "First name must be at least 3 characters long",
            "param": "fullname.firstname",
            "location": "body"
        },
        {
            "msg": "Password must be at least 6 characters long",
            "param": "password",
            "location": "body"
        },
        {
            "msg": "Invalid vehicle type",
            "param": "vehicle.vehicleType",
            "location": "body"
        }
    ]
}
```

This route ensures that the input data is validated before registering a new captain.
