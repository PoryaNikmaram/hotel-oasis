# API Documentation

## Overview

The Wild Oasis API provides endpoints for managing cabin bookings, user authentication, and application health monitoring.

## Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication

The API uses session-based authentication via NextAuth.js with Google OAuth.

### Headers

```http
Content-Type: application/json
```

## Endpoints

### Health Check

#### GET /api/health

Check application health status.

**Response**

```json
{
  "status": "ok",
  "timestamp": "2025-01-18T10:00:00.000Z",
  "uptime": 3600,
  "environment": "development",
  "version": "1.0.0",
  "node_version": "v20.0.0",
  "checks": {
    "database": {
      "status": "ok",
      "message": "Database connection healthy"
    },
    "memory": {
      "status": "ok",
      "heapUsed": "45 MB",
      "heapTotal": "67 MB"
    }
  }
}
```

### Authentication

#### POST /api/auth/signin

Initiate Google OAuth signin.

#### POST /api/auth/signout

Sign out current user.

#### GET /api/auth/session

Get current user session.

**Response**

```json
{
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "image": "https://avatar-url.jpg"
  },
  "expires": "2025-02-18T10:00:00.000Z"
}
```

### Cabins

#### GET /api/cabins

Get all cabins with optional filtering.

**Query Parameters**

- `capacity` (optional): Filter by maximum capacity
- `sort` (optional): Sort by `price` or `capacity`
- `order` (optional): `asc` or `desc`

**Response**

```json
{
  "data": [
    {
      "id": "1",
      "name": "Cabin 001",
      "maxCapacity": 4,
      "regularPrice": 250,
      "discount": 0,
      "image": "/cabin-001.jpg",
      "description": "Luxury cabin in the woods"
    }
  ],
  "count": 1
}
```

#### GET /api/cabins/[id]

Get specific cabin details.

**Response**

```json
{
  "data": {
    "id": "1",
    "name": "Cabin 001",
    "maxCapacity": 4,
    "regularPrice": 250,
    "discount": 0,
    "image": "/cabin-001.jpg",
    "description": "Luxury cabin in the woods",
    "amenities": ["WiFi", "Kitchen", "Fireplace"]
  }
}
```

### Bookings

#### GET /api/bookings

Get user's bookings (requires authentication).

**Response**

```json
{
  "data": [
    {
      "id": "booking_123",
      "startDate": "2025-02-01",
      "endDate": "2025-02-05",
      "numNights": 4,
      "numGuests": 2,
      "totalPrice": 1000,
      "status": "confirmed",
      "cabin": {
        "id": "1",
        "name": "Cabin 001",
        "image": "/cabin-001.jpg"
      }
    }
  ]
}
```

#### POST /api/bookings

Create new booking (requires authentication).

**Request Body**

```json
{
  "cabinId": "1",
  "startDate": "2025-02-01",
  "endDate": "2025-02-05",
  "numGuests": 2,
  "observations": "Anniversary celebration"
}
```

**Response**

```json
{
  "data": {
    "id": "booking_123",
    "startDate": "2025-02-01",
    "endDate": "2025-02-05",
    "numNights": 4,
    "numGuests": 2,
    "totalPrice": 1000,
    "status": "confirmed"
  }
}
```

#### PATCH /api/bookings/[id]

Update booking (requires authentication).

**Request Body**

```json
{
  "numGuests": 3,
  "observations": "Updated observations"
}
```

#### DELETE /api/bookings/[id]

Cancel booking (requires authentication).

**Response**

```json
{
  "message": "Booking cancelled successfully"
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

### HTTP Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
- `503` - Service Unavailable

## Rate Limiting

- **Rate Limit**: 100 requests per minute per IP
- **Headers**:
  - `X-RateLimit-Limit`: Request limit
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset timestamp

## WebSocket Events (Future)

Real-time features for booking updates:

```javascript
// Connect to WebSocket
const ws = new WebSocket('wss://your-domain.com/api/ws');

// Listen for booking updates
ws.on('booking:updated', data => {
  console.log('Booking updated:', data);
});
```

## SDK Example (JavaScript)

```javascript
class WildOasisAPI {
  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
  }

  async getCabins(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${this.baseURL}/cabins?${params}`);
    return response.json();
  }

  async createBooking(bookingData) {
    const response = await fetch(`${this.baseURL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });
    return response.json();
  }
}

// Usage
const api = new WildOasisAPI();
const cabins = await api.getCabins({ capacity: 4 });
```
