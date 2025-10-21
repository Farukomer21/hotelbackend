# Service Design Specification - Object Design for personnel

**hotelbackend-personnelmanagement-service** documentation

## Document Overview

This document outlines the object design for the `personnel` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## personnel Data Object

### Object Overview

**Description:** Hotel staff/personnel record for HR and internal operations; includes contact, job, department, status, and HR notes.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessProtected — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Properties Schema

| Property        | Type   | Required | Description                                                                                  |
| --------------- | ------ | -------- | -------------------------------------------------------------------------------------------- |
| `fullName`      | String | Yes      | Full legal name of the staff/personnel.                                                      |
| `jobTitle`      | String | Yes      | Role or job position of staff (e.g., Front Desk, Housekeeping).                              |
| `contactNumber` | String | Yes      | Primary contact phone number for staff (preferably with country code).                       |
| `email`         | String | No       | Work or personal email address (optional for notification or recovery).                      |
| `hireDate`      | Date   | Yes      | Date staff member was hired or joined the hotel.                                             |
| `department`    | String | No       | Department or functional area (e.g., Housekeeping, Kitchen, Front Desk, Security).           |
| `status`        | Enum   | Yes      | Employment status; active = working; inactive = on leave/retired; terminated = former staff. |
| `notes`         | Text   | No       | Notes for internal HR/staff management (free form).                                          |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **fullName**: 'default'
- **jobTitle**: 'default'
- **contactNumber**: 'default'
- **hireDate**: new Date()
- **status**: active

### Auto Update Properties

`fullName` `jobTitle` `contactNumber` `email` `hireDate` `department` `status` `notes`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Enum Properties

Enum properties are defined with a set of allowed values, ensuring that only valid options can be assigned to them.
The enum options value will be stored as strings in the database,
but when a data object is created an addtional property with the same name plus an idx suffix will be created, which will hold the index of the selected enum option.
You can use the index property to sort by the enum value or when your enum options represent a sequence of values.

- **status**: [active, inactive, terminated]

### Elastic Search Indexing

`fullName` `jobTitle` `contactNumber` `email` `hireDate` `department` `status` `notes`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.
