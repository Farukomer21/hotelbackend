# Service Design Specification - Object Design for guest

**hotelbackend-guestmanagement-service** documentation

## Document Overview

This document outlines the object design for the `guest` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## guest Data Object

### Object Overview

**Description:** Represents a hotel guest (individual or group lead). Used for reservations and management—records contact and identification info. Supports free-form notes for staff.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessProtected — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Properties Schema

| Property               | Type   | Required | Description                                                                                        |
| ---------------------- | ------ | -------- | -------------------------------------------------------------------------------------------------- |
| `fullName`             | String | Yes      | Full legal name of the guest (individual or group lead). Required for reservations.                |
| `contactNumber`        | String | Yes      | Primary contact phone number for the guest (with country code if possible).                        |
| `email`                | String | No       | Email address for the guest (optional but recommended for reservations and confirmations).         |
| `address`              | Text   | No       | Physical/mailing address of the guest (optional, for compliance or contact reasons).               |
| `identificationType`   | String | No       | Type of ID provided by the guest (e.g., passport, ID card, driver’s license).                      |
| `identificationNumber` | String | No       | The identification number/code for the selected identificationType (for compliance/audit).         |
| `notes`                | Text   | No       | Additional staff notes about the guest. For info relevant to hotel staff only. Not shown to guest. |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **fullName**: 'default'
- **contactNumber**: 'default'

### Auto Update Properties

`fullName` `contactNumber` `email` `address` `identificationType` `identificationNumber` `notes`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Elastic Search Indexing

`fullName` `contactNumber` `email` `address` `identificationType` `identificationNumber` `notes`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Filter Properties

`fullName` `contactNumber` `email` `identificationType` `identificationNumber`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as API parameters in the listing API's that have "Auto Params" enabled.

- **fullName**: String has a filter named `fullName`

- **contactNumber**: String has a filter named `contactNumber`

- **email**: String has a filter named `email`

- **identificationType**: String has a filter named `identificationType`

- **identificationNumber**: String has a filter named `identificationNumber`
