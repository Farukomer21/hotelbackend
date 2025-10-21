# **HOTELBACKEND** FRONTEND GUIDE FOR AI CODING AGENTS

This document is a rest api guide for the hotelbackend project.
The document is designed for AI agents who will generate frontend code that will consume the project backend.

The project has got 1 auth service, 1 notification service, 1 bff service and business services.
Each service is a separate microservice application and listens the HTTP request from different service urls.

The services may be in preview server, staging server or real production server. So each service have got 3 acess urls.
Frontend application should support all deployemnt servers in the development phase,
and user should be able to select the target api server in the login page.

## Project Introduction

basic CRUD functions

## API Structure

### Object Structure of a Successfull Response

When the service processes requests successfully, it wraps the requested resource(s) within a JSON envelope. This envelope not only contains the data but also includes essential metadata, such as configuration details and pagination information, to enrich the response and provide context to the client.

**Key Characteristics of the Response Envelope:**

- **Data Presentation**: Depending on the nature of the request, the service returns either a single data object or an array of objects encapsulated within the JSON envelope.
  - **Creation and Update API**: These API routes return the unmodified (pure) form of the data object(s), without any associations to other data objects.
  - **Delete API**: Even though the data is removed from the database, the last known state of the data object(s) is returned in its pure form.
  - **Get Requests**: A single data object is returned in JSON format.
  - **Get List Requests**: An array of data objects is provided, reflecting a collection of resources.

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
  "status": "OK",
  "statusCode": 200,
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "products",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": 3,
  "products": [{}, {}, {}],
  "paging": {
    "pageNumber": 1,
    "pageRowCount": 25,
    "totalRowCount": 3,
    "pageCount": 1
  },
  "filters": [],
  "uiPermissions": []
}
```

- **`products`**: In this example, this key contains the actual response content, which may be a single object or an array of objects depending on the operation performed.

### Additional Data

Each api öay have include addtional data other than the main data object according to the business logic of the API. They will be given in each API's response signature.

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

Here’s a **refined and restructured version** of your document — with a clean hierarchy, consistent heading levels, and standardized formatting for professional API documentation.
All repeated behavioral sections were grouped under unified “Behavioral Notes” subsections to reduce redundancy.

## Registration Management

First of all please ensure that register and login pages do have a deployemnt server selection option, so as the frontned coding agent you can arrange the base url path of all services.

Start with a landing page and arranging register, verification and login flow. So at the first step, you need a general knowledge of the application to make a good landing page and the authetication flow.

### How To Register

Using `registeruser` route of auth api, send the required fields to the backend in your registration page.

The registerUser api is described with request and response structure below.

After a successful registration, frontend code should handle the verification needs. The registration response will have a `user` object in the root envelope, this object will have user information with an `id` parameter.

**Email Verification**
In the registration response, you should check the property `emailVerificationNeeded` in the reponse root, and if this property is true you should start the email verification flow.

After login process, if you get an HTTP error status, and if there is an `errCode` property in the response with `EmailVerificationNeeded` value, you should start the email verification flow.

1. Call the email verification `start` route of the backend (described below) with the user email, backend will send a secret code to the given email adresss. **Backend can send the email message if the architect defined a real mail service or smtp server, so during the development time backend will send the secret code also to the frontend. You can get this secret code from the response within the `secretCode` property**.
2. The secret code in the sent email message will be an hexadecimal string , and you should arrange an input page so that the user can paste this code to the frontend application. Please navigate to this input page after you start the verification process. **If the secretCode is sent to the frontend for test purposes, then you should show it as info in the input page, so that user can copy and paste it**.
3. There is a `codeIndex` property in the start response, please show it's value on the input page, so that user can match the index in the message with the one on the screen.
4. When the user submits the code, please complete the email verification using the `complete` route of the backend (described below) with the user email and the secret code.
5. After you get a successful response from email verification, you can navigate to the login page.

## Bucket Management

This application has a bucket service and is used to store user or other objects related files. Bucket service is login agnostic, so when accessing for write or private read, you should insert a bucket token (given by services) to your request authorization header as bearer token.

**User Bucket**
This bucket is used to store public user files for each user.

When a user logs in, or in /currentuser response there is `userBucketToken` to be used when sending user related public files to the bucket service.

To upload

`POST {baseUrl}/bucket/upload`

Request body is form data which includes the bucketId and the file as binary in `files` property.

```js
{
    bucketId: "{userId}-public-user-bucket",
    files: {binary}
}
```

Response status is 200 on succesfull result, eg body:

```json
{
  "success": true,
  "data": [
    {
      "fileId": "9da03f6d-0409-41ad-bb06-225a244ae408",
      "originalName": "test (10).png",
      "mimeType": "image/png",
      "size": 604063,
      "status": "uploaded",
      "bucketName": "f7103b85-fcda-4dec-92c6-c336f71fd3a2-public-user-bucket",
      "isPublic": true,
      "downloadUrl": "https://babilcom.mindbricks.co/bucket/download/9da03f6d-0409-41ad-bb06-225a244ae408"
    }
  ]
}
```

To download a file from the bucket, you should know its fileId, so if youupload an avatar or something else, be sure that the download url or the fileId is stored in backend.

Bucket is mostly used, in object creations where alos demands an addtional file like a product image or user avatar. So after you upload your image to the bucket, insert the returned download url to the related property in the related object creation.

**Application Bucket**

This Hotelbackend application alos has common public bucket which everybody has a read access, but only users who have `superAdmin`, `admin` or `saasAdmin` roles can write (upload) to the bucket.

The common public project bucket id is

`"hotelbackend-public-common-bucket"`

and in certain areas like product image uploads, since the user will already have the admin bucket token, he will be able to upload realted object images.

Please make your UI arrangements as able to upload files to the bucket using these bucket tokens.

**Object Buckets**
Some objects may return also a bucket token, to upload or access related files with object. For example, when you get a project's data in a project management application, if there is a public or private bucket token, this is provided mostly for uploading project related files or downloading them with the token.

These buckets will be used according to the descriptions given along with the object definitions.

## 1. Authentication Routes

### 1.1 `POST /login` — User Login

**Purpose:**
Verifies user credentials and creates an authenticated session with a JWT access token.

**Access Routes:**

- `GET /login`: Returns a minimal HTML login page (for browser-based testing).
- `POST /login`: Authenticates user credentials and returns an access token and session.

#### Request Parameters

| Parameter  | Type   | Required | Source                  |
| ---------- | ------ | -------- | ----------------------- |
| `username` | String | Yes      | `request.body.username` |
| `password` | String | Yes      | `request.body.password` |

#### Behavior

- Authenticates credentials and returns a session object.
- Sets cookie: `projectname-access-token[-tenantCodename]`
- Adds the same token in response headers.
- Accepts either `username` or `email` fields (if both exist, `username` is prioritized).

#### Example

```js
axios.post("/login", {
  username: "user@example.com",
  password: "securePassword",
});
```

#### Success Response

```json
{
  "userId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
  "email": "user@example.com",
  "fullname": "John Doe"
  //...
}
```

#### Error Responses

- `401 Unauthorized`: Invalid credentials
- `403 Forbidden`: Email/mobile verification or 2FA pending
- `400 Bad Request`: Missing parameters

---

### 1.2 `POST /logout` — User Logout

**Purpose:**
Terminates the current session and clears associated authentication tokens.

#### Behavior

- Invalidates session (if exists).
- Clears cookie `projectname-access-token[-tenantCodename]`.
- Returns a confirmation response (always `200 OK`).

#### Example

```js
axios.post(
  "/logout",
  {},
  {
    headers: { Authorization: "Bearer your-jwt-token" },
  },
);
```

#### Notes

- Can be called without a session (idempotent behavior).
- Works for both cookie-based and token-based sessions.

#### Success Response

```json
{ "status": "OK", "message": "User logged out successfully" }
```

---

## 2. Verification Services Overview

All verification routes are grouped under the `/verification-services` base path.
They follow a **two-step verification pattern**: `start` → `complete`.

---

## 3. Email Verification

### 3.1 Trigger Scenarios

- After registration (`emailVerificationRequiredForLogin` = true)
- When updating email address
- When login fails due to unverified email

### 3.2 Flow Summary

1. `/start` → Generate & send code via email.
2. `/complete` → Verify code and mark email as verified.

** PLEASE NOTE **

Email verification is a frontend triiggered process. After user registers, the frontend should start the email verification process and navigate to its code input page.

---

### 3.3 `POST /verification-services/email-verification/start`

**Purpose:**
Starts the email verification by generating and sending a secret code.

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| `email`   | String | Yes      | User’s email address to verify |

**Example Request**

```json
{ "email": "user@example.com" }
```

**Success Response**

```json
{
  "status": "OK",
  "codeIndex": 1,
  // timeStamp : Milliseconds since Jan 1, 1970, 00:00:00.000 GMT
  "timeStamp": 1784578660000,
  "date": "Mon Jul 20 2026 23:17:40 GMT+0300 (GMT+03:00)",
  // expireTime: in seconds
  "expireTime": 86400,
  "verificationType": "byLink",

  // in testMode
  "secretCode": "123456",
  "userId": "user-uuid"
}
```

> ⚠️ In production, `secretCode` is **not** returned — only sent via email.

**Error Responses**

- `400 Bad Request`: Already verified
- `403 Forbidden`: Too many attempts (rate limit)

---

### 3.4 `POST /verification-services/email-verification/complete`

**Purpose:**
Completes the verification using the received code.

| Parameter    | Type   | Required | Description       |
| ------------ | ------ | -------- | ----------------- |
| `email`      | String | Yes      | User’s email      |
| `secretCode` | String | Yes      | Verification code |

**Success Response**

```json
{
  "status": "OK",
  "isVerified": true,
  "email": "user@email.com",
  // in testMode
  "userId": "user-uuid"
}
```

**Error Responses**

- `403 Forbidden`: Code expired or mismatched
- `404 Not Found`: No verification in progress

---

### 3.5 Behavioral Notes

- **Resend Cooldown:** `resendTimeWindow` (e.g. 60s)
- **Expiration:** Codes expire after `expireTimeWindow` (e.g. 1 day)
- **Single Active Session:** One verification per user

---

## 4. Mobile Verification

### 4.1 Trigger Scenarios

- After registration (`mobileVerificationRequiredForLogin` = true)
- When updating phone number
- On login requiring mobile verification

### 4.2 Flow

1. `/start` → Sends verification code via SMS
2. `/complete` → Validates code and confirms number

---

### 4.3 `POST /verification-services/mobile-verification/start`

| Parameter | Type   | Required | Description                          |
| --------- | ------ | -------- | ------------------------------------ |
| `email`   | String | Yes      | User’s email to locate mobile record |

**Success Response**

```json
{
  "status": "OK",
  "codeIndex": 1,
  // timeStamp : Milliseconds since Jan 1, 1970, 00:00:00.000 GMT
  "timeStamp": 1784578660000,
  "date": "Mon Jul 20 2026 23:17:40 GMT+0300 (GMT+03:00)",
  // expireTime: in seconds
  "expireTime": 180,
  "verificationType": "byCode",

  // in testMode
  "secretCode": "123456",
  "userId": "user-uuid"
}
```

> ⚠️ `secretCode` returned only in development.

**Errors**

- `400 Bad Request`: Already verified
- `403 Forbidden`: Rate-limited

---

### 4.4 `POST /verification-services/mobile-verification/complete`

| Parameter    | Type   | Required | Description           |
| ------------ | ------ | -------- | --------------------- |
| `email`      | String | Yes      | Associated email      |
| `secretCode` | String | Yes      | Code received via SMS |

**Success Response**

```json
{
  "status": "OK",
  "isVerified": true,
  "mobile": "+1 333 ...",
  // in testMode
  "userId": "user-uuid"
}
```

---

### 4.5 Behavioral Notes

- **Cooldown:** One code per minute
- **Expiration:** Codes valid for 1 day
- **One Session Per User**

---

## 5. Two-Factor Authentication (2FA)

### 5.1 Email 2FA

**Flow**

1. `/start` → Generates and sends email code
2. `/complete` → Verifies code and updates session

---

#### `POST /verification-services/email-2factor-verification/start`

| Parameter   | Type   | Required | Description      |
| ----------- | ------ | -------- | ---------------- |
| `userId`    | String | Yes      | User ID          |
| `sessionId` | String | Yes      | Current session  |
| `client`    | String | No       | Optional context |
| `reason`    | String | No       | Reason for 2FA   |

**Response**

```json
{
  "status": "OK",
  "sessionId": "user session id UUID",
  "userId": "user-uuid",
  "codeIndex": 1,
  // timeStamp : Milliseconds since Jan 1, 1970, 00:00:00.000 GMT
  "timeStamp": 1784578660000,
  "date": "Mon Jul 20 2026 23:17:40 GMT+0300 (GMT+03:00)",
  // expireTime: in seconds
  "expireTime": 86400,
  "verificationType": "byLink",

  // in testMode
  "secretCode": "123456"
}
```

---

#### `POST /verification-services/email-2factor-verification/complete`

| Parameter    | Type   | Required | Description     |
| ------------ | ------ | -------- | --------------- |
| `userId`     | String | Yes      | User ID         |
| `sessionId`  | String | Yes      | Session ID      |
| `secretCode` | String | Yes      | Code from email |

**Response**

```json
{
  // user session data
  "sessionId": "session-uuid"
  // ...
}
```

---

### 5.2 Mobile 2FA

**Flow**

1. `/start` → Sends SMS code
2. `/complete` → Validates and finalizes session

---

#### `POST /verification-services/mobile-2factor-verification/start`

| Parameter   | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| `userId`    | String | Yes      | User ID     |
| `sessionId` | String | Yes      | Session ID  |
| `client`    | String | No       | Context     |
| `reason`    | String | No       | Reason      |

**Response**

```json
{
  "status": "OK",
  "sessionId": "user session id UUID",
  "userId": "user-uuid",
  "codeIndex": 1,
  // timeStamp : Milliseconds since Jan 1, 1970, 00:00:00.000 GMT
  "timeStamp": 1784578660000,
  "date": "Mon Jul 20 2026 23:17:40 GMT+0300 (GMT+03:00)",
  // expireTime: in seconds
  "expireTime": 86400,
  "verificationType": "byLink",

  // in testMode
  "secretCode": "123456"
}
```

---

#### `POST /verification-services/mobile-2factor-verification/complete`

| Parameter    | Type   | Required | Description  |
| ------------ | ------ | -------- | ------------ |
| `userId`     | String | Yes      | User ID      |
| `sessionId`  | String | Yes      | Session ID   |
| `secretCode` | String | Yes      | Code via SMS |

**Response**

```json
{
  // user session data
  "sessionId": "session-uuid"
  // ...
}
```

---

### 5.3 2FA Behavioral Notes

- One active code per session
- Cooldown: `resendTimeWindow` (e.g., 60s)
- Expiration: `expireTimeWindow` (e.g., 5m)

---

## 6. Password Reset

### 6.1 By Email

**Flow**

1. `/start` → Sends verification code via email
2. `/complete` → Validates and resets password

---

#### `POST /verification-services/password-reset-by-email/start`

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `email`   | String | Yes      | User email  |

**Response**

```json
{
  "status": "OK",
  "codeIndex": 1,
  // timeStamp : Milliseconds since Jan 1, 1970, 00:00:00.000 GMT
  "timeStamp": 1784578660000,
  "date": "Mon Jul 20 2026 23:17:40 GMT+0300 (GMT+03:00)",
  // expireTime: in seconds
  "expireTime": 86400,
  "verificationType": "byLink",

  // in testMode
  "secretCode": "123456",
  "userId": "user-uuid"
}
```

#### `POST /verification-services/password-reset-by-email/complete`

| Parameter    | Type   | Required | Description   |
| ------------ | ------ | -------- | ------------- |
| `email`      | String | Yes      | User email    |
| `secretCode` | String | Yes      | Code received |
| `password`   | String | Yes      | New password  |

**Response**

```json
{
  "status": "OK",
  "isVerified": true,
  "email": "user@email.com",
  // in testMode
  "userId": "user-uuid"
}
```

---

### 6.2 By Mobile

**Flow**

1. `/start` → Sends SMS code
2. `/complete` → Validates and resets password

---

#### `POST /verification-services/password-reset-by-mobile/start`

| Parameter | Type   | Required | Description   |
| --------- | ------ | -------- | ------------- |
| `mobile`  | String | Yes      | Mobile number |

**Response**

```json
{
  "status": "OK",
  "codeIndex": 1,
  // timeStamp : Milliseconds since Jan 1, 1970, 00:00:00.000 GMT
  "timeStamp": 1784578660000,
  "date": "Mon Jul 20 2026 23:17:40 GMT+0300 (GMT+03:00)",
  // expireTime: in seconds
  "expireTime": 86400,
  "verificationType": "byLink",

  // in testMode
  "secretCode": "123456",
  "userId": "user-uuid"
}
```

#### `POST /verification-services/password-reset-by-mobile/complete`

| Parameter    | Type   | Required | Description      |
| ------------ | ------ | -------- | ---------------- |
| `email`      | String | Yes      | Associated email |
| `secretCode` | String | Yes      | Code via SMS     |
| `password`   | String | Yes      | New password     |

**Response**

```json
{
  "status": "OK",
  "isVerified": true,
  "mobile": "+1 444 ....",
  // in testMode
  "userId": "user-uuid"
}
```

---

### 6.3 Behavioral Notes

- Cooldown: 60s resend
- Expiration: 24h
- One session per user
- Works without an active login session

---

## 7. Verification Method Types

### 7.1 `byCode`

User manually enters the 6-digit code in frontend.

### 7.2 `byLink`

Frontend handles a one-click verification via email/SMS link containing code parameters.

## 8) `GET /currentuser` — Current Session

**Purpose**
Return the currently authenticated user’s session.

**Route Type**
`sessionInfo`

**Authentication**
Requires a valid access token (header or cookie).

### Request

_No parameters._

### Example

```js
axios.get("/currentuser", {
  headers: { Authorization: "Bearer <jwt>" },
});
```

### Success (200)

Returns the session object (identity, tenancy, token metadata):

```json
{
  "sessionId": "9cf23fa8-07d4-4e7c-80a6-ec6d6ac96bb9",
  "userId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
  "email": "user@example.com",
  "fullname": "John Doe",
  "roleId": "user",
  "tenantId": "abc123",
  "accessToken": "jwt-token-string",
  "...": "..."
}
```

### Errors

- **401 Unauthorized** — No active session/token

  ```json
  { "status": "ERR", "message": "No login found" }
  ```

**Notes**

- Commonly called by web/mobile clients after login to hydrate session state.
- Includes key identity/tenant fields and a token reference (if applicable).
- Ensure a valid token is supplied to receive a 200 response.

---

## 9) `GET /permissions` — List Effective Permissions

**Purpose**
Return all effective permission grants for the current user.

**Route Type**
`permissionFetch`

**Authentication**
Requires a valid access token.

### Request

_No parameters._

### Example

```js
axios.get("/permissions", {
  headers: { Authorization: "Bearer <jwt>" },
});
```

### Success (200)

Array of permission grants (aligned with `givenPermissions`):

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

**Field meanings (per item):**

- `permissionName`: Granted permission key.
- `roleId`: Present if granted via role.
- `subjectUserId`: Present if granted directly to the user.
- `subjectUserGroupId`: Present if granted via group.
- `objectId`: Present if scoped to a specific object (OBAC).
- `canDo`: `true` if enabled, `false` if restricted.

### Errors

- **401 Unauthorized** — No active session

  ```json
  { "status": "ERR", "message": "No login found" }
  ```

- **500 Internal Server Error** — Unexpected failure

**Notes**

- Available on all Mindbricks-generated services (not only Auth).
- **Auth service:** Reads live `givenPermissions` from DB.
- **Other services:** Typically respond from a cached/projected view (e.g., ElasticSearch) for faster checks.

> **Tip:** Cache permission results client-side/server-side and refresh after login or permission updates.

---

## 10) `GET /permissions/:permissionName` — Check Permission Scope

**Purpose**
Check whether the current user has a specific permission and return any scoped object exceptions/inclusions.

**Route Type**
`permissionScopeCheck`

**Authentication**
Requires a valid access token.

### Path Parameters

| Name             | Type   | Required | Source                          |
| ---------------- | ------ | -------- | ------------------------------- |
| `permissionName` | String | Yes      | `request.params.permissionName` |

### Example

```js
axios.get("/permissions/orders.manage", {
  headers: { Authorization: "Bearer <jwt>" },
});
```

### Success (200)

```json
{
  "canDo": true,
  "exceptions": [
    "a1f2e3d4-xxxx-yyyy-zzzz-object1",
    "b2c3d4e5-xxxx-yyyy-zzzz-object2"
  ]
}
```

**Interpretation**

- If `canDo: true`: permission is generally granted **except** the listed `exceptions` (restrictions).
- If `canDo: false`: permission is generally **not** granted, **only** allowed for the listed `exceptions` (selective overrides).
- `exceptions` contains object IDs (UUID strings) from the relevant domain model.

### Errors

- **401 Unauthorized** — No active session/token.

## Services And Data Object

## Auth Service

Authentication service for the project

### Auth Service Data Objects

**User**
A data object that stores the user information and handles login settings.

### Auth Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://hotelbackend.prw.mindbricks.com/auth-api`
- **Staging:** `https://hotelbackend-stage.mindbricks.co/auth-api`
- **Production:** `https://hotelbackend.mindbricks.co/auth-api`

#### `Get User` API

This api is used by admin roles or the users themselves to get the user profile information.

The `getUser` API REST controller can be triggered via the following route:

`/v1/users/:userId`

**Rest Request Parameters**

The `getUser` api has got 1 request parameter

| Parameter | Type | Required | Population             |
| --------- | ---- | -------- | ---------------------- |
| userId    | ID   | true     | request.params?.userId |

**userId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/users/:userId**

```js
axios({
  method: "GET",
  url: `/v1/users/${userId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "user",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update User` API

This route is used by users to update their profiles.

The `updateUser` API REST controller can be triggered via the following route:

`/v1/users/:userId`

**Rest Request Parameters**

The `updateUser` api has got 3 request parameters

| Parameter | Type   | Required | Population             |
| --------- | ------ | -------- | ---------------------- |
| userId    | ID     | true     | request.params?.userId |
| fullname  | String | false    | request.body?.fullname |
| avatar    | String | false    | request.body?.avatar   |

**userId** : This id paremeter is used to select the required data object that will be updated
**fullname** : A string value to represent the fullname of the user
**avatar** : The avatar url of the user. A random avatar will be generated if not provided

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/users/:userId**

```js
axios({
  method: "PATCH",
  url: `/v1/users/${userId}`,
  data: {
    fullname: "String",
    avatar: "String",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "user",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Register User` API

This api is used by public users to register themselves

The `registerUser` API REST controller can be triggered via the following route:

`/v1/registeruser`

**Rest Request Parameters**

The `registerUser` api has got 4 request parameters

| Parameter | Type   | Required | Population             |
| --------- | ------ | -------- | ---------------------- |
| avatar    | String | false    | request.body?.avatar   |
| password  | String | true     | request.body?.password |
| fullname  | String | true     | request.body?.fullname |
| email     | String | true     | request.body?.email    |

**avatar** : The avatar url of the user. If not sent, a default random one will be generated.
**password** : The password defined by the the user that is being registered.
**fullname** : The fullname defined by the the user that is being registered.
**email** : The email defined by the the user that is being registered.

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/registeruser**

```js
axios({
  method: "POST",
  url: "/v1/registeruser",
  data: {
    avatar: "String",
    password: "String",
    fullname: "String",
    email: "String",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "user",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete User` API

This api is used by users to delete their profiles.

The `deleteUser` API REST controller can be triggered via the following route:

`/v1/users/:userId`

**Rest Request Parameters**

The `deleteUser` api has got 1 request parameter

| Parameter | Type | Required | Population             |
| --------- | ---- | -------- | ---------------------- |
| userId    | ID   | true     | request.params?.userId |

**userId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/users/:userId**

```js
axios({
  method: "DELETE",
  url: `/v1/users/${userId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "user",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Users` API

The `listUsers` API REST controller can be triggered via the following route:

`/v1/users`

**Rest Request Parameters**
The `listUsers` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/users**

```js
axios({
  method: "GET",
  url: "/v1/users",
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "users",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "users": [
    {
      "id": "ID",
      "_owner": "ID",
      "email": "String",
      "password": "String",
      "fullname": "String",
      "avatar": "String",
      "roleId": "String",
      "emailVerified": "Boolean",
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

#### `Update Userrole` API

This route is used by admin roles to update the user role.The default role is user when a user is registered. A user's role can be updated by superAdmin or admin

The `updateUserRole` API REST controller can be triggered via the following route:

`/v1/userrole/:userId`

**Rest Request Parameters**

The `updateUserRole` api has got 2 request parameters

| Parameter | Type   | Required | Population             |
| --------- | ------ | -------- | ---------------------- |
| userId    | ID     | true     | request.params?.userId |
| roleId    | String | true     | request.body?.roleId   |

**userId** : This id paremeter is used to select the required data object that will be updated
**roleId** : The new roleId of the user to be updated

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/userrole/:userId**

```js
axios({
  method: "PATCH",
  url: `/v1/userrole/${userId}`,
  data: {
    roleId: "String",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "user",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Userpassword` API

This route is used to to force the password update by old password.

The `updateUserPassword` API REST controller can be triggered via the following route:

`/v1/userpassword/:userId`

**Rest Request Parameters**

The `updateUserPassword` api has got 3 request parameters

| Parameter   | Type   | Required | Population                |
| ----------- | ------ | -------- | ------------------------- |
| userId      | ID     | true     | request.params?.userId    |
| oldPassword | String | true     | request.body?.oldPassword |
| newPassword | String | true     | request.body?.newPassword |

**userId** : This id paremeter is used to select the required data object that will be updated
**oldPassword** : The old password of the user that will be overridden bu the new one. Send for double check.
**newPassword** : The new password of the user to be updated

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/userpassword/:userId**

```js
axios({
  method: "PATCH",
  url: `/v1/userpassword/${userId}`,
  data: {
    oldPassword: "String",
    newPassword: "String",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "user",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Briefuser` API

This route is used by public to get simple user profile information.

The `getBriefUser` API REST controller can be triggered via the following route:

`/v1/briefuser/:userId`

**Rest Request Parameters**

The `getBriefUser` api has got 1 request parameter

| Parameter | Type | Required | Population             |
| --------- | ---- | -------- | ---------------------- |
| userId    | ID   | true     | request.params?.userId |

**userId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/briefuser/:userId**

```js
axios({
  method: "GET",
  url: `/v1/briefuser/${userId}`,
  data: {},
  params: {},
});
```

**REST Response**

This route's response is constrained to a select list of properties, and therefore does not encompass all attributes of the resource.

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
  "dataName": "user",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "fullname": "String",
    "avatar": "String",
    "isActive": true
  }
}
```
