# Service Design Specification - Object Design for feedback

**hotelbackend-feedbackmanagement-service** documentation

## Document Overview

This document outlines the object design for the `feedback` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## feedback Data Object

### Object Overview

**Description:** Feedback submitted by guests for a hotel stay or service, linked to a reservation. Contains rating, comments, staff response, category, and submission timestamp.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessProtected — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Properties Schema

| Property        | Type    | Required | Description                                                                                                                                                    |
| --------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reservationId` | ID      | Yes      | Reference to the reservation for which this feedback is submitted. Foreign key to reservationManagement:reservation.                                           |
| `rating`        | Integer | Yes      | Feedback rating from 1 (worst) to 5 (best). Required.                                                                                                          |
| `comment`       | Text    | Yes      | Guest&#39;s free-form comment, experience note, or suggestion. Required for meaningful feedback.                                                               |
| `submittedAt`   | Date    | No       | Date/time the feedback was submitted. Auto-set to now on create if not provided.                                                                               |
| `response`      | Text    | No       | Optional staff comment or follow-up in response to feedback. Editable only by staff via updateFeedback.                                                        |
| `category`      | String  | Yes      | Feedback category or topic for staff analysis/filtering (e.g., housekeeping, room, service). Required. If not selected by guest, default to &#39;general&#39;. |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **reservationId**: '00000000-0000-0000-0000-000000000000'
- **rating**: 0
- **comment**: 'text'
- **category**: general

### Constant Properties

`reservationId` `submittedAt`

Constant properties are defined to be immutable after creation, meaning they cannot be updated or changed once set. They are typically used for properties that should remain constant throughout the object's lifecycle.
A property is set to be constant if the `Allow Update` option is set to `false`.

### Auto Update Properties

`rating` `comment` `response` `category`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Elastic Search Indexing

`reservationId` `rating` `comment` `submittedAt` `response` `category`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Database Indexing

`reservationId`

Properties that are indexed in the database will be optimized for query performance, allowing for faster data retrieval.
Make a property indexed in the database if you want to use it frequently in query filters or sorting.

### Relation Properties

`reservationId`

Mindbricks supports relations between data objects, allowing you to define how objects are linked together.
You can define relations in the data object properties, which will be used to create foreign key constraints in the database.
For complex joins operations, Mindbricks supportsa BFF pattern, where you can view dynamic and static views based on Elastic Search Indexes.
Use db level relations for simple one-to-one or one-to-many relationships, and use BFF views for complex joins that require multiple data objects to be joined together.

- **reservationId**: ID
  Relation to `reservation`.id

The target object is a parent object, meaning that the relation is a one-to-many relationship from target to this object.

On Delete: Set Null
Required: Yes

### Formula Properties

`submittedAt`

Formula properties are used to define calculated fields that derive their values from other properties or external data.
These properties are automatically calculated based on the defined formula and can be used for dynamic data retrieval.

- **submittedAt**: Date
  - Formula: `this.submittedAt ?? new Date()`
  - Calculate After Instance: No

### Filter Properties

`reservationId` `rating` `submittedAt` `category`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as API parameters in the listing API's that have "Auto Params" enabled.

- **reservationId**: ID has a filter named `reservationId`

- **rating**: Integer has a filter named `rating`

- **submittedAt**: Date has a filter named `submittedAt`

- **category**: String has a filter named `category`
