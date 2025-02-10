# Pilot Parcel API

## Overview
Pilot Parcel API provides endpoints to manage assignments, orders, partners, and regions. This documentation outlines the API structure and available endpoints.

## API Structure
```
api/
  ├── assignments/
  │   ├── metrics/
  │   │   ├── route.ts
  │   ├── run/
  │   │   ├── route.ts
  │   ├── route.ts
  │
  ├── orders/
  │   ├── assign/
  │   │   ├── route.ts
  │   ├── status/[id]/
  │   │   ├── route.ts
  │   ├── route.ts
  │
  ├── partners/
  │   ├── [id]/
  │   │   ├── route.ts
  │   ├── route.ts
  │
  ├── region/
  │   ├── [id]/
  │   │   ├── route.ts
  │   ├── list/
  │   │   ├── route.ts
  │   ├── route.ts
```

## API Endpoints

### Assignments
- **GET /api/assignments/metrics** - Retrieve assignment metrics.
- **POST /api/assignments/run** - Execute an assignment.
- **GET /api/assignments** - Retrieve lastest assignments.

### Orders
- **POST /api/orders/assign** - Assign an order.
- **PUT /api/orders/status/:id** - Update the status of the order ( pending | assigned | picked | delivered )
- **GET /api/orders** - Retrieve all orders list.

### Partners
- **GET /api/partners** - Retrieve a list of partners.
- **POST /api/partners** - Create a new partner.
- **PUT /api/partners/:id** - Update the partner info.
- **DELETE /api/partners/:id** - Delete user.

### Region
- **GET /api/region** - Retrieve a list of available regions ( less data ).
- **POST /api/region** - Add a new region.
- **GET /api/region/:id** - Retrieves the best shift time for delivery partner (start time - end time).
- **GET /api/region/list** - Retrieve a list of available regions ( complete data ).


## Request & Response Formats
Example request and response formats for key endpoints:
```json
// Example request for creating an order
POST /api/orders/assign
{
  "orderId": "12345",
  "partnerId": "67890"
}

// Example response
{
  "success": true,
  "message": "Order assigned successfully"
}
```

## Error Handling
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Authentication failed
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Unexpected server error

## Installation & Setup
To set up the project locally:
```sh
git clone https://github.com/yashrajsd/pilot-parcel.git
cd pilot-parcel
npm install
npm run dev
```




