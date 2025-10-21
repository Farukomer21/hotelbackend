# Service Design Specification - Object Design for reservationPackage

**hotelbackend-reservationpackagemapping-service** documentation

## Document Overview

This document outlines the object design for the `reservationPackage` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## reservationPackage Data Object

### Object Overview

**Description:** Join table between a reservation and a package. Each row represents a single package mapped to a reservation (1:M from reservation to reservationPackage, 1:M from package to reservationPackage). Enables assignment, lookup, and unassignment of packages per reservation. Use composite index for uniqueness (one package per reservation).

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessProtected — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Composite Indexes

- **reservation_package_unique**: [reservationId, packageId]
  This composite index is defined to optimize query performance for complex queries involving multiple fields.

The index also defines a conflict resolution strategy for duplicate key violations.

When a new record would violate this composite index, the following action will be taken:

**On Duplicate**: `throwError`

An error will be thrown, preventing the insertion of conflicting data.

### Properties Schema

| Property        | Type | Required | Description                                                                                                    |
| --------------- | ---- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `reservationId` | ID   | Yes      | Reference to the reservation this package is assigned to. Foreign key to reservationManagement:reservation.id. |
| `packageId`     | ID   | Yes      | Reference to the package being assigned. Foreign key to packageManagement:package.id.                          |
| `assignedAt`    | Date | Yes      | Timestamp of when the package was assigned to the reservation.                                                 |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **reservationId**: '00000000-0000-0000-0000-000000000000'
- **packageId**: '00000000-0000-0000-0000-000000000000'
- **assignedAt**: new Date()

### Constant Properties

`reservationId` `packageId` `assignedAt`

Constant properties are defined to be immutable after creation, meaning they cannot be updated or changed once set. They are typically used for properties that should remain constant throughout the object's lifecycle.
A property is set to be constant if the `Allow Update` option is set to `false`.

### Elastic Search Indexing

`reservationId` `packageId` `assignedAt`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Database Indexing

`reservationId` `packageId`

Properties that are indexed in the database will be optimized for query performance, allowing for faster data retrieval.
Make a property indexed in the database if you want to use it frequently in query filters or sorting.

### Cache Select Properties

`reservationId` `packageId`

Cache select properties are used to collect data from Redis entity cache with a different key than the data object id.
This allows you to cache data that is not directly related to the data object id, but a frequently used filter.

### Relation Properties

`reservationId` `packageId`

Mindbricks supports relations between data objects, allowing you to define how objects are linked together.
You can define relations in the data object properties, which will be used to create foreign key constraints in the database.
For complex joins operations, Mindbricks supportsa BFF pattern, where you can view dynamic and static views based on Elastic Search Indexes.
Use db level relations for simple one-to-one or one-to-many relationships, and use BFF views for complex joins that require multiple data objects to be joined together.

- **reservationId**: ID
  Relation to `reservation`.id

The target object is a parent object, meaning that the relation is a one-to-many relationship from target to this object.

On Delete: Set Null
Required: Yes

- **packageId**: ID
  Relation to `package_`.id

The target object is a sibling object, meaning that the relation is a many-to-one or one-to-one relationship from this object to the target.

On Delete: Set Null
Required: Yes

### Formula Properties

`assignedAt`

Formula properties are used to define calculated fields that derive their values from other properties or external data.
These properties are automatically calculated based on the defined formula and can be used for dynamic data retrieval.

- **assignedAt**: Date
  - Formula: `new Date()`
  - Calculate After Instance: No

### Filter Properties

`reservationId` `packageId`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as API parameters in the listing API's that have "Auto Params" enabled.

- **reservationId**: ID has a filter named `reservationId`

- **packageId**: ID has a filter named `packageId`
