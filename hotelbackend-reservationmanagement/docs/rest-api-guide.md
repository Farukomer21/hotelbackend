# REST API GUIDE

## hotelbackend-reservationmanagement-service

Handles hotel reservation records including creation, management, lookup by reservation code, package/room/guest mapping, and reservation status changes.

## Architectural Design Credit and Contact Information

The architectural design of this microservice is credited to .
For inquiries, feedback, or further information regarding the architecture, please direct your communication to:

Email:

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this microservice.

## Documentation Scope

Welcome to the official documentation for the ReservationManagement Service's REST API. This document is designed to provide a comprehensive guide to interfacing with our ReservationManagement Service exclusively through RESTful API endpoints.

**Intended Audience**

This documentation is intended for developers and integrators who are looking to interact with the ReservationManagement Service via HTTP requests for purposes such as creating, updating, deleting and querying ReservationManagement objects.

**Overview**

Within these pages, you will find detailed information on how to effectively utilize the REST API, including authentication methods, request and response formats, endpoint descriptions, and examples of common use cases.

Beyond REST
It's important to note that the ReservationManagement Service also supports alternative methods of interaction, such as gRPC and messaging via a Message Broker. These communication methods are beyond the scope of this document. For information regarding these protocols, please refer to their respective documentation.

## Authentication And Authorization

To ensure secure access to the ReservationManagement service's protected endpoints, a project-wide access token is required. This token serves as the primary method for authenticating requests to our service. However, it's important to note that access control varies across different routes:

**Protected API**:
Certain API (routes) require specific authorization levels. Access to these routes is contingent upon the possession of a valid access token that meets the route-specific authorization criteria. Unauthorized requests to these routes will be rejected.

**Public API **:
The service also includes public API (routes) that are accessible without authentication. These public endpoints are designed for open access and do not require an access token.

### Token Locations

When including your access token in a request, ensure it is placed in one of the following specified locations. The service will sequentially search these locations for the token, utilizing the first one it encounters.

| Location             | Token Name / Param Name   |
| -------------------- | ------------------------- |
| Query                | access_token              |
| Authorization Header | Bearer                    |
| Header               | hotelbackend-access-token |
| Cookie               | hotelbackend-access-token |

Please ensure the token is correctly placed in one of these locations, using the appropriate label as indicated. The service prioritizes these locations in the order listed, processing the first token it successfully identifies.

## Api Definitions

This section outlines the API endpoints available within the ReservationManagement service. Each endpoint can receive parameters through various methods, meticulously described in the following definitions. It's important to understand the flexibility in how parameters can be included in requests to effectively interact with the ReservationManagement service.

This service is configured to listen for HTTP requests on port `3000`,
serving both the main API interface and default administrative endpoints.

The following routes are available by default:

- **API Test Interface (API Face):** `/`
- **Swagger Documentation:** `/swagger`
- **Postman Collection Download:** `/getPostmanCollection`
- **Health Checks:** `/health` and `/admin/health`
- **Current Session Info:** `/currentuser`
- **Favicon:** `/favicon.ico`

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://hotelbackend.prw.mindbricks.com/reservationManagement-api`
- **Staging:** `https://hotelbackend-stage.mindbricks.co/reservationManagement-api`
- **Production:** `https://hotelbackend.mindbricks.co/reservationManagement-api`

**Parameter Inclusion Methods:**
Parameters can be incorporated into API requests in several ways, each with its designated location. Understanding these methods is crucial for correctly constructing your requests:

**Query Parameters:** Included directly in the URL's query string.

**Path Parameters:** Embedded within the URL's path.

**Body Parameters:** Sent within the JSON body of the request.

**Session Parameters:** Automatically read from the session object. This method is used for parameters that are intrinsic to the user's session, such as userId. When using an API that involves session parameters, you can omit these from your request. The service will automatically bind them to the API layer, provided that a session is associated with your request.

**Note on Session Parameters:**
Session parameters represent a unique method of parameter inclusion, relying on the context of the user's session. A common example of a session parameter is userId, which the service automatically associates with your request when a session exists. This feature ensures seamless integration of user-specific data without manual input for each request.

By adhering to the specified parameter inclusion methods, you can effectively utilize the ReservationManagement service's API endpoints. For detailed information on each endpoint, including required parameters and their accepted locations, refer to the individual API definitions below.

### Common Parameters

The `ReservationManagement` service's business API support several common parameters designed to modify and enhance the behavior of API requests. These parameters are not individually listed in the API route definitions to avoid repetition. Instead, refer to this section to understand how to leverage these common behaviors across different routes. Note that all common parameters should be included in the query part of the URL.

### Supported Common Parameters:

- **getJoins (BOOLEAN)**: Controls whether to retrieve associated objects along with the main object. By default, `getJoins` is assumed to be `true`. Set it to `false` if you prefer to receive only the main fields of an object, excluding its associations.

- **excludeCQRS (BOOLEAN)**: Applicable only when `getJoins` is `true`. By default, `excludeCQRS` is set to `false`. Enabling this parameter (`true`) omits non-local associations, which are typically more resource-intensive as they require querying external services like ElasticSearch for additional information. Use this to optimize response times and resource usage.

- **requestId (String)**: Identifies a request to enable tracking through the service's log chain. A random hex string of 32 characters is assigned by default. If you wish to use a custom `requestId`, simply include it in your query parameters.

- **caching (BOOLEAN)**: Determines the use of caching for query API. By default, caching is enabled (`true`). To ensure the freshest data directly from the database, set this parameter to `false`, bypassing the cache.

- **cacheTTL (Integer)**: Specifies the Time-To-Live (TTL) for query caching, in seconds. This is particularly useful for adjusting the default caching duration (5 minutes) for `get list` queries. Setting a custom `cacheTTL` allows you to fine-tune the cache lifespan to meet your needs.

- **pageNumber (Integer)**: For paginated `get list` API's, this parameter selects which page of results to retrieve. The default is `1`, indicating the first page. To disable pagination and retrieve all results, set `pageNumber` to `0`.

- **pageRowCount (Integer)**: In conjunction with paginated API's, this parameter defines the number of records per page. The default value is `25`. Adjusting `pageRowCount` allows you to control the volume of data returned in a single request.

By utilizing these common parameters, you can tailor the behavior of API requests to suit your specific requirements, ensuring optimal performance and usability of the `ReservationManagement` service.

### Error Response

If a request encounters an issue, whether due to a logical fault or a technical problem, the service responds with a standardized JSON error structure. The HTTP status code within this response indicates the nature of the error, utilizing commonly recognized codes for clarity:

- **400 Bad Request**: The request was improperly formatted or contained invalid parameters, preventing the server from processing it.
- **401 Unauthorized**: The request lacked valid authentication credentials or the credentials provided do not grant access to the requested resource.
- **404 Not Found**: The requested resource was not found on the server.
- **500 Internal Server Error**: The server encountered an unexpected condition that prevented it from fulfilling the request.

Each error response is structured to provide meaningful insight into the problem, assisting in diagnosing and resolving issues efficiently.

```js
{
  "result": "ERR",
  "status": 400,
  "message": "errMsg_organizationIdisNotAValidID",
  "errCode": 400,
  "date": "2024-03-19T12:13:54.124Z",
  "detail": "String"
}
```

### Object Structure of a Successfull Response

When the `ReservationManagement` service processes requests successfully, it wraps the requested resource(s) within a JSON envelope. This envelope not only contains the data but also includes essential metadata, such as configuration details and pagination information, to enrich the response and provide context to the client.

**Key Characteristics of the Response Envelope:**

- **Data Presentation**: Depending on the nature of the request, the service returns either a single data object or an array of objects encapsulated within the JSON envelope.
  - **Creation and Update API**: These API routes return the unmodified (pure) form of the data object(s), without any associations to other data objects.
  - **Delete API**: Even though the data is removed from the database, the last known state of the data object(s) is returned in its pure form.
  - **Get Requests**: A single data object is returned in JSON format.
  - **Get List Requests**: An array of data objects is provided, reflecting a collection of resources.

- **Data Structure and Joins**: The complexity of the data structure in the response can vary based on the API's architectural design and the join options specified in the request. The architecture might inherently limit join operations, or they might be dynamically controlled through query parameters.
  - **Pure Data Forms**: In some cases, the response mirrors the exact structure found in the primary data table, without extensions.
  - **Extended Data Forms**: Alternatively, responses might include data extended through joins with tables within the same service or aggregated from external sources, such as ElasticSearch indices related to other services.
  - **Join Varieties**: The extensions might involve one-to-one joins, resulting in single object associations, or one-to-many joins, leading to an array of objects. In certain instances, the data might even feature nested inclusions from other data objects.

**Design Considerations**: The structure of a API's response data is meticulously crafted during the service's architectural planning. This design ensures that responses adequately reflect the intended data relationships and service logic, providing clients with rich and meaningful information.

**Brief Data**: Certain API's return a condensed version of the object data, intentionally selecting only specific fields deemed useful for that request. In such instances, the API documentation will detail the properties included in the response, guiding developers on what to expect.

### API Response Structure

The API utilizes a standardized JSON envelope to encapsulate responses. This envelope is designed to consistently deliver both the requested data and essential metadata, ensuring that clients can efficiently interpret and utilize the response.

**HTTP Status Codes:**

- **200 OK**: This status code is returned for successful GET, LIST, UPDATE, or DELETE operations, indicating that the request has been processed successfully.
- **201 Created**: This status code is specific to CREATE operations, signifying that the requested resource has been successfully created.

**Success Response Format:**

For successful operations, the response includes a `"status": "OK"` property, signaling the successful execution of the request. The structure of a successful response is outlined below:

```json
{
  "status":"OK",
  "statusCode": 200,
  "elapsedMs":126,
  "ssoTime":120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName":"products",
  "method":"GET",
  "action":"list",
  "appVersion":"Version",
  "rowCount":3
  "products":[{},{},{}],
  "paging": {
    "pageNumber":1,
    "pageRowCount":25,
    "totalRowCount":3,
    "pageCount":1
  },
  "filters": [],
  "uiPermissions": []
}
```

- **`products`**: In this example, this key contains the actual response content, which may be a single object or an array of objects depending on the operation performed.

**Handling Errors:**

For details on handling error scenarios and understanding the structure of error responses, please refer to the "Error Response" section provided earlier in this documentation. It outlines how error conditions are communicated, including the use of HTTP status codes and standardized JSON structures for error messages.

## Resources

ReservationManagement service provides the following resources which are stored in its own database as a data object. Note that a resource for an api access is a data object for the service.

### Reservation resource

_Resource Definition_ : A reservation record for a hotel guest, supports code-based access, guest/room/package assignments, special requests, payment status, lifecycle status, and summary fields.
_Reservation Resource Properties_
| Name | Type | Required | Default | Definition |
| ---- | ---- | -------- | ------- | ---------- |
| **reservationCode** | String | | | _Unique, non-sequential code used by guests to access and manage their reservation._ |
| **guestId** | ID | | | _Reference to the guest making the reservation, links to guestManagement:guest._ |
| **roomId** | ID | | | _Reference to the assigned hotel room, links to roomInventory:room._ |
| **packageIds** | ID | | | _List of assigned package IDs, references packageManagement:package._ |
| **checkInDate** | Date | | | _Reservation check-in date._ |
| **checkOutDate** | Date | | | _Reservation check-out date._ |
| **status** | Enum | | | _Status of the reservation: booked, canceled, or completed._ |
| **specialRequestIds** | ID | | | _IDs of special requests attached to this reservation, links to specialRequestManagement:specialRequest._ |
| **paymentStatus** | Enum | | | _Payment status: unpaid, partial, paid._ |
| **totalAmount** | Double | | | _Total cost for the reservation (derived/calculated externally)._ |
| **notes** | Text | | | _Additional notes by staff or guest for this reservation._ |
| **numGuests** | Integer | | | _Number of guests included in this reservation, for pricing and capacity validations._ |

#### Enum Properties

Enum properties are represented as Small Integer values (0-255) in the database. The values are mapped to their corresponding names in the application layer.

##### status Enum Property

_Enum Options_
| Name | Value | Index |
| ---- | ----- | ----- |
| **booked** | `"booked""` | 0 |
| **canceled** | `"canceled""` | 1 |
| **completed** | `"completed""` | 2 |

##### paymentStatus Enum Property

_Enum Options_
| Name | Value | Index |
| ---- | ----- | ----- |
| **unpaid** | `"unpaid""` | 0 |
| **partial** | `"partial""` | 1 |
| **paid** | `"paid""` | 2 |

## Business Api

### Create Reservation API

_API Definition_ : Creates a reservation, generates a unique code, checks integrity of guest, room, dates, and links required entities. Returns the reservation including the reservation code.

_API Crud Type_ : create

_Default access route_ : _POST_ `/v1/reservations`

#### Parameters

The createReservation api has got 12 parameters

| Parameter         | Type    | Required | Population                      |
| ----------------- | ------- | -------- | ------------------------------- |
| reservationCode   | String  | true     | request.body?.reservationCode   |
| guestId           | ID      | true     | request.body?.guestId           |
| roomId            | ID      | true     | request.body?.roomId            |
| packageIds        | ID      | false    | request.body?.packageIds        |
| checkInDate       | Date    | true     | request.body?.checkInDate       |
| checkOutDate      | Date    | true     | request.body?.checkOutDate      |
| status            | Enum    | true     | request.body?.status            |
| specialRequestIds | ID      | false    | request.body?.specialRequestIds |
| paymentStatus     | Enum    | true     | request.body?.paymentStatus     |
| totalAmount       | Double  | true     | request.body?.totalAmount       |
| notes             | Text    | false    | request.body?.notes             |
| numGuests         | Integer | true     | request.body?.numGuests         |

To access the api you can use the **REST** controller with the path **POST /v1/reservations**

```js
axios({
  method: "POST",
  url: "/v1/reservations",
  data: {
    reservationCode: "String",
    guestId: "ID",
    roomId: "ID",
    packageIds: "ID",
    checkInDate: "Date",
    checkOutDate: "Date",
    status: "Enum",
    specialRequestIds: "ID",
    paymentStatus: "Enum",
    totalAmount: "Double",
    notes: "Text",
    numGuests: "Integer",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`reservation`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "201",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "reservation",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "reservation": {
    "id": "ID",
    "_owner": "ID",
    "reservationCode": "String",
    "guestId": "ID",
    "roomId": "ID",
    "packageIds": "ID",
    "checkInDate": "Date",
    "checkOutDate": "Date",
    "status": "Enum",
    "status_": "String",
    "specialRequestIds": "ID",
    "paymentStatus": "Enum",
    "paymentStatus_": "String",
    "totalAmount": "Double",
    "notes": "Text",
    "numGuests": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Create Reservation](businessApi/createReservation).

### Get Reservation API

_API Definition_ : Returns reservation by its unique ID (for staff/internal use).

_API Crud Type_ : get

_Default access route_ : _GET_ `/v1/reservations/:reservationId`

#### Parameters

The getReservationById api has got 1 parameter

| Parameter     | Type | Required | Population                    |
| ------------- | ---- | -------- | ----------------------------- |
| reservationId | ID   | true     | request.params?.reservationId |

To access the api you can use the **REST** controller with the path **GET /v1/reservations/:reservationId**

```js
axios({
  method: "GET",
  url: `/v1/reservations/${reservationId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`reservation`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "reservation",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "reservation": {
    "id": "ID",
    "_owner": "ID",
    "reservationCode": "String",
    "guestId": "ID",
    "roomId": "ID",
    "packageIds": "ID",
    "checkInDate": "Date",
    "checkOutDate": "Date",
    "status": "Enum",
    "status_": "String",
    "specialRequestIds": "ID",
    "paymentStatus": "Enum",
    "paymentStatus_": "String",
    "totalAmount": "Double",
    "notes": "Text",
    "numGuests": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Get Reservation](businessApi/getReservationById).

### Get Reservationbycode API

_API Definition_ : Lookup reservation details using its code (guest or chatbot access).

_API Crud Type_ : get

_Default access route_ : _GET_ `/v1/reservationbycode/:reservationId`

#### Parameters

The getReservationByCode api has got 1 parameter

| Parameter     | Type | Required | Population                    |
| ------------- | ---- | -------- | ----------------------------- |
| reservationId | ID   | true     | request.params?.reservationId |

To access the api you can use the **REST** controller with the path **GET /v1/reservationbycode/:reservationId**

```js
axios({
  method: "GET",
  url: `/v1/reservationbycode/${reservationId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`reservation`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "reservation",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "reservation": {
    "id": "ID",
    "_owner": "ID",
    "reservationCode": "String",
    "guestId": "ID",
    "roomId": "ID",
    "packageIds": "ID",
    "checkInDate": "Date",
    "checkOutDate": "Date",
    "status": "Enum",
    "status_": "String",
    "specialRequestIds": "ID",
    "paymentStatus": "Enum",
    "paymentStatus_": "String",
    "totalAmount": "Double",
    "notes": "Text",
    "numGuests": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Get Reservationbycode](businessApi/getReservationByCode).

### Update Reservation API

_API Definition_ : Updates a reservation (by ID); staff use case. Allows updating all modifiable fields except reservationCode.

_API Crud Type_ : update

_Default access route_ : _PATCH_ `/v1/reservations/:reservationId`

#### Parameters

The updateReservation api has got 12 parameters

| Parameter         | Type    | Required | Population                      |
| ----------------- | ------- | -------- | ------------------------------- |
| reservationId     | ID      | true     | request.params?.reservationId   |
| guestId           | ID      | false    | request.body?.guestId           |
| roomId            | ID      | false    | request.body?.roomId            |
| packageIds        | ID      | false    | request.body?.packageIds        |
| checkInDate       | Date    | false    | request.body?.checkInDate       |
| checkOutDate      | Date    | false    | request.body?.checkOutDate      |
| status            | Enum    | false    | request.body?.status            |
| specialRequestIds | ID      | false    | request.body?.specialRequestIds |
| paymentStatus     | Enum    | false    | request.body?.paymentStatus     |
| totalAmount       | Double  | false    | request.body?.totalAmount       |
| notes             | Text    | false    | request.body?.notes             |
| numGuests         | Integer | false    | request.body?.numGuests         |

To access the api you can use the **REST** controller with the path **PATCH /v1/reservations/:reservationId**

```js
axios({
  method: "PATCH",
  url: `/v1/reservations/${reservationId}`,
  data: {
    guestId: "ID",
    roomId: "ID",
    packageIds: "ID",
    checkInDate: "Date",
    checkOutDate: "Date",
    status: "Enum",
    specialRequestIds: "ID",
    paymentStatus: "Enum",
    totalAmount: "Double",
    notes: "Text",
    numGuests: "Integer",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`reservation`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "reservation",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "reservation": {
    "id": "ID",
    "_owner": "ID",
    "reservationCode": "String",
    "guestId": "ID",
    "roomId": "ID",
    "packageIds": "ID",
    "checkInDate": "Date",
    "checkOutDate": "Date",
    "status": "Enum",
    "status_": "String",
    "specialRequestIds": "ID",
    "paymentStatus": "Enum",
    "paymentStatus_": "String",
    "totalAmount": "Double",
    "notes": "Text",
    "numGuests": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Update Reservation](businessApi/updateReservation).

### Cancel Reservationbycode API

_API Definition_ : Guest cancels their reservation via the reservation code (sets status to canceled).

_API Crud Type_ : update

_Default access route_ : _PATCH_ `/v1/cancelreservationbycode/:reservationId`

#### Parameters

The cancelReservationByCode api has got 12 parameters

| Parameter         | Type    | Required | Population                      |
| ----------------- | ------- | -------- | ------------------------------- |
| reservationId     | ID      | true     | request.params?.reservationId   |
| guestId           | ID      | false    | request.body?.guestId           |
| roomId            | ID      | false    | request.body?.roomId            |
| packageIds        | ID      | false    | request.body?.packageIds        |
| checkInDate       | Date    | false    | request.body?.checkInDate       |
| checkOutDate      | Date    | false    | request.body?.checkOutDate      |
| status            | Enum    | false    | request.body?.status            |
| specialRequestIds | ID      | false    | request.body?.specialRequestIds |
| paymentStatus     | Enum    | false    | request.body?.paymentStatus     |
| totalAmount       | Double  | false    | request.body?.totalAmount       |
| notes             | Text    | false    | request.body?.notes             |
| numGuests         | Integer | false    | request.body?.numGuests         |

To access the api you can use the **REST** controller with the path **PATCH /v1/cancelreservationbycode/:reservationId**

```js
axios({
  method: "PATCH",
  url: `/v1/cancelreservationbycode/${reservationId}`,
  data: {
    guestId: "ID",
    roomId: "ID",
    packageIds: "ID",
    checkInDate: "Date",
    checkOutDate: "Date",
    status: "Enum",
    specialRequestIds: "ID",
    paymentStatus: "Enum",
    totalAmount: "Double",
    notes: "Text",
    numGuests: "Integer",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`reservation`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "reservation",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "reservation": {
    "id": "ID",
    "_owner": "ID",
    "reservationCode": "String",
    "guestId": "ID",
    "roomId": "ID",
    "packageIds": "ID",
    "checkInDate": "Date",
    "checkOutDate": "Date",
    "status": "Enum",
    "status_": "String",
    "specialRequestIds": "ID",
    "paymentStatus": "Enum",
    "paymentStatus_": "String",
    "totalAmount": "Double",
    "notes": "Text",
    "numGuests": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Cancel Reservationbycode](businessApi/cancelReservationByCode).

### Delete Reservation API

_API Definition_ : Staff operation to hard/soft delete a reservation by ID (staff use only).

_API Crud Type_ : delete

_Default access route_ : _DELETE_ `/v1/reservations/:reservationId`

#### Parameters

The deleteReservation api has got 1 parameter

| Parameter     | Type | Required | Population                    |
| ------------- | ---- | -------- | ----------------------------- |
| reservationId | ID   | true     | request.params?.reservationId |

To access the api you can use the **REST** controller with the path **DELETE /v1/reservations/:reservationId**

```js
axios({
  method: "DELETE",
  url: `/v1/reservations/${reservationId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`reservation`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "reservation",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "reservation": {
    "id": "ID",
    "_owner": "ID",
    "reservationCode": "String",
    "guestId": "ID",
    "roomId": "ID",
    "packageIds": "ID",
    "checkInDate": "Date",
    "checkOutDate": "Date",
    "status": "Enum",
    "status_": "String",
    "specialRequestIds": "ID",
    "paymentStatus": "Enum",
    "paymentStatus_": "String",
    "totalAmount": "Double",
    "notes": "Text",
    "numGuests": "Integer",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Delete Reservation](businessApi/deleteReservation).

### List Reservations API

_API Definition_ : Staff API to list/search reservations (by status, guest, date, etc).

_API Crud Type_ : list

_Default access route_ : _GET_ `/v1/reservations`

The listReservations api has got no parameters.

To access the api you can use the **REST** controller with the path **GET /v1/reservations**

```js
axios({
  method: "GET",
  url: "/v1/reservations",
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`reservations`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "reservations",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "reservations": [
    {
      "id": "ID",
      "_owner": "ID",
      "reservationCode": "String",
      "guestId": "ID",
      "roomId": "ID",
      "packageIds": "ID",
      "checkInDate": "Date",
      "checkOutDate": "Date",
      "status": "Enum",
      "status_": "String",
      "specialRequestIds": "ID",
      "paymentStatus": "Enum",
      "paymentStatus_": "String",
      "totalAmount": "Double",
      "notes": "Text",
      "numGuests": "Integer",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For List Reservations](businessApi/listReservations).

### Authentication Specific Routes

### Common Routes

### Route: currentuser

_Route Definition_: Retrieves the currently authenticated user's session information.

_Route Type_: sessionInfo

_Access Route_: `GET /currentuser`

#### Parameters

This route does **not** require any request parameters.

#### Behavior

- Returns the authenticated session object associated with the current access token.
- If no valid session exists, responds with a 401 Unauthorized.

```js
// Sample GET /currentuser call
axios.get("/currentuser", {
  headers: {
    Authorization: "Bearer your-jwt-token",
  },
});
```

**Success Response**
Returns the session object, including user-related data and token information.

```
{
  "sessionId": "9cf23fa8-07d4-4e7c-80a6-ec6d6ac96bb9",
  "userId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
  "email": "user@example.com",
  "fullname": "John Doe",
  "roleId": "user",
  "tenantId": "abc123",
  "accessToken": "jwt-token-string",
  ...
}
```

**Error Response**
**401 Unauthorized:** No active session found.

```
{
  "status": "ERR",
  "message": "No login found"
}
```

**Notes**

- This route is typically used by frontend or mobile applications to fetch the current session state after login.
- The returned session includes key user identity fields, tenant information (if applicable), and the access token for further authenticated requests.
- Always ensure a valid access token is provided in the request to retrieve the session.

### Route: permissions

`*Route Definition*`: Retrieves all effective permission records assigned to the currently authenticated user.

`*Route Type*`: permissionFetch

_Access Route_: `GET /permissions`

#### Parameters

This route does **not** require any request parameters.

#### Behavior

- Fetches all active permission records (`givenPermissions` entries) associated with the current user session.
- Returns a full array of permission objects.
- Requires a valid session (`access token`) to be available.

```js
// Sample GET /permissions call
axios.get("/permissions", {
  headers: {
    Authorization: "Bearer your-jwt-token",
  },
});
```

**Success Response**

Returns an array of permission objects.

```json
[
  {
    "id": "perm1",
    "permissionName": "adminPanel.access",
    "roleId": "admin",
    "subjectUserId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
    "subjectUserGroupId": null,
    "objectId": null,
    "canDo": true,
    "tenantCodename": "store123"
  },
  {
    "id": "perm2",
    "permissionName": "orders.manage",
    "roleId": null,
    "subjectUserId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
    "subjectUserGroupId": null,
    "objectId": null,
    "canDo": true,
    "tenantCodename": "store123"
  }
]
```

Each object reflects a single permission grant, aligned with the givenPermissions model:

- `**permissionName**`: The permission the user has.
- `**roleId**`: If the permission was granted through a role. -` **subjectUserId**`: If directly granted to the user.
- `**subjectUserGroupId**`: If granted through a group.
- `**objectId**`: If tied to a specific object (OBAC).
- `**canDo**`: True or false flag to represent if permission is active or restricted.

**Error Responses**

- **401 Unauthorized**: No active session found.

```json
{
  "status": "ERR",
  "message": "No login found"
}
```

- **500 Internal Server Error**: Unexpected error fetching permissions.

**Notes**

- The /permissions route is available across all backend services generated by Mindbricks, not just the auth service.
- Auth service: Fetches permissions freshly from the live database (givenPermissions table).
- Other services: Typically use a cached or projected view of permissions stored in a common ElasticSearch store, optimized for faster authorization checks.

> **Tip**:
> Applications can cache permission results client-side or server-side, but should occasionally refresh by calling this endpoint, especially after login or permission-changing operations.

### Route: permissions/:permissionName

_Route Definition_: Checks whether the current user has access to a specific permission, and provides a list of scoped object exceptions or inclusions.

_Route Type_: permissionScopeCheck

_Access Route_: `GET /permissions/:permissionName`

#### Parameters

| Parameter      | Type   | Required | Population                      |
| -------------- | ------ | -------- | ------------------------------- |
| permissionName | String | Yes      | `request.params.permissionName` |

#### Behavior

- Evaluates whether the current user **has access** to the given `permissionName`.
- Returns a structured object indicating:
  - Whether the permission is generally granted (`canDo`)
  - Which object IDs are explicitly included or excluded from access (`exceptions`)
- Requires a valid session (`access token`).

```js
// Sample GET /permissions/orders.manage
axios.get("/permissions/orders.manage", {
  headers: {
    Authorization: "Bearer your-jwt-token",
  },
});
```

**Success Response**

```json
{
  "canDo": true,
  "exceptions": [
    "a1f2e3d4-xxxx-yyyy-zzzz-object1",
    "b2c3d4e5-xxxx-yyyy-zzzz-object2"
  ]
}
```

- If `canDo` is `true`, the user generally has the permission, but not for the objects listed in `exceptions` (i.e., restrictions).
- If `canDo` is `false`, the user does not have the permission by default — but only for the objects in `exceptions`, they do have permission (i.e., selective overrides).
- The exceptions array contains valid **UUID strings**, each corresponding to an object ID (typically from the data model targeted by the permission).

## Copyright

All sources, documents and other digital materials are copyright of .

## About Us

For more information please visit our website: .

.
.
