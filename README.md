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

## Assignment
**GET** /api/assignments/metrics
```json
{
  "data": [
    {
      "_id": "67a9f4875f498ea549da422e",
      "orderId": "67a9f4875f498ea549da4229",
      "partnerId": "67a9de6c5f498ea549da4086",
      "timestamp": "2025-02-10T12:43:51.713Z",
      "status": "success",
      "createdAt": "2025-02-10T12:43:51.715Z",
      "updatedAt": "2025-02-10T12:53:13.403Z",
      "__v": 0
    }
  ]
}

```
**GET** /api/assignments/metrics
```json
{
  "data": [
    {
      "_id": "67a9f9b5986058d1c6047615",
      "date": "2025-02-10",
      "totalAssigned": 7,
      "successRate": 0.16666666666666666,
      "success": 1,
      "failure": 2,
      "failureReasons": [
        {
          "reason": "Not responded",
          "count": 2,
          "_id": "67a9fceb986058d1c604775f"
        }
      ],
      "createdAt": "2025-02-10T13:05:57.605Z",
      "updatedAt": "2025-02-10T15:23:06.322Z",
      "__v": 1
    }
  ]
}


```
## Orders
**POST** /api/orders/assign
```json
//Request body
{
  "customer": "John Doe",
  "area": "Downtown",
  "items": [
    {
      "name": "Pizza",
      "quantity": 2,
      "price": 12.99
    },
    {
      "name": "Burger",
      "quantity": 1,
      "price": 8.99
    }
  ],
  "totalAmount": 34.97
}
```
**PUT** /api/orders/status/:id
```json
//Request body

//Updating an order status to "delivered" | "assigned" | "picked"
{
  "status": "delivered"
}

//Updating an order back to "pending" ie failure
{
  "status": "pending",
  "reason": "Not responded"
}
```
**GET** /api/orders
```json
//Response body
{
  "customer": {
    "name": "Romi Dsuza",
    "phone": "+91 7248007517",
    "address": "Hiranandani Gardens, Bandra, Mumbai"
  },
  "_id": "67a9df4b5f498ea549da40cb",
  "orderNumber": "ORD-1739185995278-3993",
  "area": "Bandra",
  "items": [
    {
      "name": "Laptop Bag",
      "quantity": 2,
      "price": 3000,
      "_id": "67a9df4b5f498ea549da40cc"
    },
    {
      "name": "Wireless Mouse",
      "quantity": 1,
      "price": 1200,
      "_id": "67a9df4b5f498ea549da40cd"
    }
  ],
  "status": "delivered",
  "scheduledFor": "Mon Feb 10 2025 20:00:00 GMT+0530 (India Standard Time)",
  "assignedTo": "67a9de6c5f498ea549da4086",
  "totalAmount": 4200,
  "createdAt": "2025-02-10T11:13:16.039Z",
  "updatedAt": "2025-02-10T11:25:46.555Z",
  "__v": 0
}
```
## Partners

**GET** /api/partners





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




