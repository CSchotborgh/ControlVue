# API Documentation - EDGERACK Cooling Unit Control System

This document provides comprehensive API documentation for the EDGERACK Cooling Unit Control System backend services.

## 🌐 Base URL

- **Development**: `http://localhost:5000`
- **Production**: `https://your-domain.com`

All API endpoints are prefixed with `/api`

## 🔐 Authentication

The system uses session-based authentication with HTTP-only cookies.

### Authentication Flow

1. **Login**: POST credentials to `/api/auth/login`
2. **Session**: Server sets HTTP-only session cookie
3. **Protected Routes**: Include session cookie in requests
4. **Logout**: POST to `/api/auth/logout` to clear session

## 📡 API Endpoints

### Authentication Endpoints

#### POST `/api/auth/login`

Authenticate user and create session.

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "username": "admin",
    "role": "administrator"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

#### POST `/api/auth/logout`

End user session and clear cookies.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### GET `/api/auth/me`

Get current authenticated user information.

**Response (Authenticated):**
```json
{
  "user": {
    "id": "user_id",
    "username": "admin",
    "role": "administrator",
    "lastLogin": "2025-08-06T17:30:00Z"
  }
}
```

**Response (Unauthenticated):**
```json
{
  "error": "Not authenticated"
}
```

### Cooling Unit Data Endpoints

#### GET `/api/cooling-unit/data`

Retrieve current cooling unit operational data.

**Response:**
```json
{
  "machineState": true,
  "selfCheckState": true,
  "cabinetTemperature": 68.5,
  "cabinetHumidity": 45.2,
  "airInletTemperature": 72.1,
  "airOutletTemperature": 65.8,
  "condenserInletTemperature": 85.4,
  "condenserOutletTemperature": 78.9,
  "evaporatorInletTemperature": 55.2,
  "evaporatorOutletTemperature": 48.7,
  "compressorState": "ON",
  "fanSpeed": 75,
  "alarmState": false,
  "powerConsumption": 2.4,
  "operatingHours": 15420,
  "lastMaintenanceDate": "2024-12-15T10:30:00Z",
  "timestamp": "2025-08-06T17:30:00Z"
}
```

**Headers:**
- `Cache-Control: public, max-age=2` (2-second cache)
- `ETag: "data-hash"` (for efficient caching)

#### GET `/api/cooling-unit/history`

Retrieve historical cooling unit data.

**Query Parameters:**
- `startDate` (ISO 8601): Start date for data range
- `endDate` (ISO 8601): End date for data range
- `interval` (string): Data interval (`1m`, `5m`, `1h`, `1d`)
- `limit` (number): Maximum records to return (default: 1000)

**Example Request:**
```
GET /api/cooling-unit/history?startDate=2025-08-06T00:00:00Z&endDate=2025-08-06T23:59:59Z&interval=5m
```

**Response:**
```json
{
  "data": [
    {
      "timestamp": "2025-08-06T17:30:00Z",
      "cabinetTemperature": 68.5,
      "cabinetHumidity": 45.2,
      "powerConsumption": 2.4,
      "compressorState": "ON",
      "alarmState": false
    }
  ],
  "metadata": {
    "totalRecords": 288,
    "interval": "5m",
    "startDate": "2025-08-06T00:00:00Z",
    "endDate": "2025-08-06T23:59:59Z"
  }
}
```

#### GET `/api/cooling-unit/alerts`

Retrieve active alerts and alarm conditions.

**Response:**
```json
{
  "activeAlerts": [
    {
      "id": "alert_001",
      "type": "temperature_high",
      "severity": "warning",
      "message": "Cabinet temperature approaching upper limit",
      "value": 75.2,
      "threshold": 80.0,
      "timestamp": "2025-08-06T17:25:00Z",
      "acknowledged": false
    }
  ],
  "systemStatus": {
    "overallHealth": "good",
    "criticalAlerts": 0,
    "warningAlerts": 1,
    "infoAlerts": 2
  }
}
```

### System Configuration Endpoints

#### GET `/api/config/system`

Retrieve system configuration settings.

**Response:**
```json
{
  "general": {
    "temperatureUnit": "Fahrenheit",
    "timeZone": "America/Los_Angeles",
    "ntpEnabled": true,
    "ntpServer": "pool.ntp.org"
  },
  "network": {
    "interfaces": [
      {
        "name": "Primary",
        "type": "ethernet",
        "ipAddress": "192.168.222.184",
        "subnetMask": "255.255.255.0",
        "gateway": "192.168.222.1",
        "macAddress": "F8:DC:7A:97:51:FA",
        "status": "connected"
      },
      {
        "name": "Secondary",
        "type": "ethernet",
        "ipAddress": "10.0.1.100",
        "subnetMask": "255.255.255.0",
        "gateway": "10.0.1.1",
        "macAddress": "F8:DC:7A:97:51:FB",
        "status": "disconnected"
      }
    ]
  },
  "administration": {
    "eventLogCount": 1430,
    "maxLogEntries": 10000,
    "autoBackupEnabled": true,
    "backupInterval": "daily"
  }
}
```

#### PUT `/api/config/system`

Update system configuration settings.

**Request Body:**
```json
{
  "general": {
    "temperatureUnit": "Celsius",
    "timeZone": "UTC"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Configuration updated successfully",
  "updatedFields": ["general.temperatureUnit", "general.timeZone"]
}
```

### System Upgrade Endpoints

#### GET `/api/upgrade/packages`

List available software packages and upgrade information.

**Response:**
```json
{
  "currentVersion": {
    "software": "EDGERACK Control v2.4.1",
    "firmware": "v1.8.3",
    "buildDate": "2025-01-15T10:30:00Z"
  },
  "availableUpdates": [
    {
      "type": "software",
      "version": "v2.4.2",
      "size": "15.2 MB",
      "releaseDate": "2025-02-01T12:00:00Z",
      "description": "Security updates and performance improvements"
    }
  ]
}
```

#### POST `/api/upgrade/upload`

Upload software package for upgrade.

**Request:** Multipart form data with file
- `file`: Software package file (.pkg, .tar.gz)
- `type`: Package type (`software`, `firmware`)

**Response:**
```json
{
  "success": true,
  "uploadId": "upload_123456",
  "filename": "edgerack-v2.4.2.pkg",
  "size": 15728640,
  "checksum": "sha256:a1b2c3d4...",
  "status": "uploaded"
}
```

#### POST `/api/upgrade/install`

Install uploaded software package.

**Request Body:**
```json
{
  "uploadId": "upload_123456",
  "scheduleTime": "2025-08-07T02:00:00Z",
  "autoRestart": true
}
```

**Response:**
```json
{
  "success": true,
  "upgradeId": "upgrade_789012",
  "estimatedDuration": 300,
  "status": "scheduled"
}
```

#### GET `/api/upgrade/history`

Retrieve system upgrade history.

**Response:**
```json
{
  "upgrades": [
    {
      "id": "upgrade_789012",
      "timestamp": "2025-08-06T02:00:00Z",
      "version": "v2.4.1",
      "type": "software",
      "duration": 285,
      "status": "completed",
      "hash": "a1b2c3d4e5f6...",
      "operator": "admin"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10
  }
}
```

### User Management Endpoints

#### GET `/api/users`

List system users (Admin only).

**Response:**
```json
{
  "users": [
    {
      "id": "user_001",
      "username": "admin",
      "role": "administrator",
      "lastLogin": "2025-08-06T17:30:00Z",
      "status": "active"
    },
    {
      "id": "user_002",
      "username": "operator",
      "role": "operator",
      "lastLogin": "2025-08-05T14:20:00Z",
      "status": "active"
    }
  ]
}
```

#### POST `/api/users`

Create new user (Admin only).

**Request Body:**
```json
{
  "username": "newuser",
  "password": "securePassword123",
  "role": "operator",
  "fullName": "New User"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_003",
    "username": "newuser",
    "role": "operator",
    "createdAt": "2025-08-06T17:30:00Z"
  }
}
```

### System Health Endpoints

#### GET `/api/health`

System health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-08-06T17:30:00Z",
  "uptime": 86400,
  "version": "v2.4.1",
  "services": {
    "database": "connected",
    "coolingUnit": "operational",
    "network": "connected"
  },
  "memory": {
    "used": 134217728,
    "total": 536870912,
    "percentage": 25
  }
}
```

## 📊 WebSocket Endpoints

### Real-time Data Stream

#### Connection: `/ws`

Connect to WebSocket for real-time data updates.

**Authentication:** Include session cookie in WebSocket handshake

**Message Types:**

**Subscribe to cooling data:**
```json
{
  "type": "subscribe",
  "topic": "cooling-data"
}
```

**Real-time data push:**
```json
{
  "type": "data",
  "topic": "cooling-data",
  "timestamp": "2025-08-06T17:30:00Z",
  "data": {
    "cabinetTemperature": 68.5,
    "cabinetHumidity": 45.2,
    "alarmState": false
  }
}
```

**System alerts:**
```json
{
  "type": "alert",
  "severity": "warning",
  "message": "Temperature approaching threshold",
  "timestamp": "2025-08-06T17:30:00Z"
}
```

## 🔒 Security

### Rate Limiting

- **Authentication endpoints**: 5 requests per minute
- **Data endpoints**: 60 requests per minute
- **Configuration endpoints**: 10 requests per minute

### CORS Policy

```javascript
{
  "origin": ["https://yourdomain.com"],
  "credentials": true,
  "methods": ["GET", "POST", "PUT", "DELETE"]
}
```

### Headers

**Required Headers:**
- `Content-Type: application/json` (for POST/PUT requests)
- `Authorization: Bearer <token>` (if using token auth)

**Security Headers:**
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

## 📈 Response Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `429` | Too Many Requests |
| `500` | Internal Server Error |
| `503` | Service Unavailable |

## 📝 Error Responses

**Standard Error Format:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "username",
      "reason": "Required field missing"
    }
  },
  "timestamp": "2025-08-06T17:30:00Z",
  "path": "/api/auth/login"
}
```

**Common Error Codes:**
- `VALIDATION_ERROR`: Invalid input data
- `AUTHENTICATION_ERROR`: Invalid credentials
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `RATE_LIMITED`: Too many requests
- `SERVICE_UNAVAILABLE`: System maintenance

## 🧪 Testing

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}' \
  -c cookies.txt
```

**Get cooling data:**
```bash
curl -X GET http://localhost:5000/api/cooling-unit/data \
  -b cookies.txt
```

### Using Postman

1. Import the API collection (if provided)
2. Set base URL to `http://localhost:5000`
3. Configure authentication (session cookies)
4. Test endpoints systematically

## 📚 SDKs and Libraries

### JavaScript/TypeScript Client

```typescript
class EdgerackAPI {
  private baseURL: string;
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  async login(username: string, password: string) {
    const response = await fetch(`${this.baseURL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });
    return response.json();
  }
  
  async getCoolingData() {
    const response = await fetch(`${this.baseURL}/api/cooling-unit/data`, {
      credentials: 'include'
    });
    return response.json();
  }
}
```

---

**This API documentation is maintained alongside the codebase and updated with each release.**