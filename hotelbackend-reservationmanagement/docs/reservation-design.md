# Service Design Specification - Object Design for reservation

**hotelbackend-reservationmanagement-service** documentation

## Document Overview

This document outlines the object design for the `reservation` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## reservation Data Object

### Object Overview

**Description:** A reservation record for a hotel guest, supports code-based access, guest/room/package assignments, special requests, payment status, lifecycle status, and summary fields.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessPublic — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Redis Entity Caching

This data object is configured for Redis entity caching, which improves data retrieval performance by storing frequently accessed data in Redis.
Each time a new instance is created, updated or deleted, the cache is updated accordingly. Any get requests by id will first check the cache before querying the database.
If you want to use the cache by other select criteria, you can configure any data property as a Redis cluster.

- **Smart Caching is activated:**
  A data object instance will only be cached when it is accessed for the first time.
  TTL (time-to-live) is dynamically calculated based on access frequency, which is useful for large datasets with volatile usage patterns.
  Each data instance has 15 minutes of TTL and in each access, the TTL is extended by 15 minutes.
  If the data is not accessed for 15 minutes, it will be removed from the cache.

- **Cache Criteria:**

```js
{"status": {"$eq": "booked"}}
```

This object is only cached if this criteria is met.

The criteria is checked during all operations, including read operations.
If your criteria is all about the data properties, you can use the `checkCriteriaOnlyInCreateAndUpdates` option to improve performance.

### Composite Indexes

- **unique_reservation_code**: [reservationCode]
  This composite index is defined to optimize query performance for complex queries involving multiple fields.

The index also defines a conflict resolution strategy for duplicate key violations.

When a new record would violate this composite index, the following action will be taken:

**On Duplicate**: `throwError`

An error will be thrown, preventing the insertion of conflicting data.

### Properties Schema

| Property            | Type    | Required | Description                                                                                             |
| ------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `reservationCode`   | String  | Yes      | Unique, non-sequential code used by guests to access and manage their reservation.                      |
| `guestId`           | ID      | Yes      | Reference to the guest making the reservation, links to guestManagement:guest.                          |
| `roomId`            | ID      | Yes      | Reference to the assigned hotel room, links to roomInventory:room.                                      |
| `packageIds`        | ID      | No       | List of assigned package IDs, references packageManagement:package.                                     |
| `checkInDate`       | Date    | Yes      | Reservation check-in date.                                                                              |
| `checkOutDate`      | Date    | Yes      | Reservation check-out date.                                                                             |
| `status`            | Enum    | Yes      | Status of the reservation: booked, canceled, or completed.                                              |
| `specialRequestIds` | ID      | No       | IDs of special requests attached to this reservation, links to specialRequestManagement:specialRequest. |
| `paymentStatus`     | Enum    | Yes      | Payment status: unpaid, partial, paid.                                                                  |
| `totalAmount`       | Double  | Yes      | Total cost for the reservation (derived/calculated externally).                                         |
| `notes`             | Text    | No       | Additional notes by staff or guest for this reservation.                                                |
| `numGuests`         | Integer | Yes      | Number of guests included in this reservation, for pricing and capacity validations.                    |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Array Properties

`packageIds` `specialRequestIds`

Array properties can hold multiple values and are indicated by the `[]` suffix in their type. Avoid using arrays in properties that are used for relations, as they will not work correctly.
Note that using connection objects instead of arrays is recommended for relations, as they provide better performance and flexibility.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **reservationCode**: 'default'
- **guestId**: '00000000-0000-0000-0000-000000000000'
- **roomId**: '00000000-0000-0000-0000-000000000000'
- **checkInDate**: new Date()
- **checkOutDate**: new Date()
- **status**: booked
- **paymentStatus**: unpaid
- **totalAmount**: 0.0
- **numGuests**: 0

### Constant Properties

`reservationCode`

Constant properties are defined to be immutable after creation, meaning they cannot be updated or changed once set. They are typically used for properties that should remain constant throughout the object's lifecycle.
A property is set to be constant if the `Allow Update` option is set to `false`.

### Auto Update Properties

`guestId` `roomId` `packageIds` `checkInDate` `checkOutDate` `status` `specialRequestIds` `paymentStatus` `totalAmount` `notes` `numGuests`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Enum Properties

Enum properties are defined with a set of allowed values, ensuring that only valid options can be assigned to them.
The enum options value will be stored as strings in the database,
but when a data object is created an addtional property with the same name plus an idx suffix will be created, which will hold the index of the selected enum option.
You can use the index property to sort by the enum value or when your enum options represent a sequence of values.

- **status**: [booked, canceled, completed]

- **paymentStatus**: [unpaid, partial, paid]

### Elastic Search Indexing

`reservationCode` `guestId` `roomId` `packageIds` `checkInDate` `checkOutDate` `status` `specialRequestIds` `paymentStatus` `totalAmount` `notes` `numGuests`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Database Indexing

`reservationCode` `guestId` `roomId` `checkInDate` `checkOutDate` `status` `paymentStatus` `totalAmount`

Properties that are indexed in the database will be optimized for query performance, allowing for faster data retrieval.
Make a property indexed in the database if you want to use it frequently in query filters or sorting.

### Unique Properties

`reservationCode`

Unique properties are enforced to have distinct values across all instances of the data object, preventing duplicate entries.
Note that a unique property is automatically indexed in the database so you will not need to set the `Indexed in DB` option.

### Redis Cluster Properties

`reservationCode`

Cluster properties are used to group related data in Redis, and used to invalidate the query cache more precisely.
If no cluster property is set, the data object query cache will be invalidated for all instances of the data object when any instance is created, updated or deleted.
For example, if you have a `userId` property that is used to cluster a task data query in Redis,
when a new task is created, the query caches which have different userId filters will be reserved, and only the queries that have the same userId filter or have no filter at all will be invalidated.

### Cache Select Properties

`reservationCode`

Cache select properties are used to collect data from Redis entity cache with a different key than the data object id.
This allows you to cache data that is not directly related to the data object id, but a frequently used filter.

### Secondary Key Properties

`reservationCode`

Secondary key properties are used to create an additional indexed identifiers for the data object, allowing for alternative access patterns.
Different than normal indexed properties, secondary keys will act as primary keys and Mindbricks will provide automatic secondary key db utility functions to access the data object by the secondary key.

### Relation Properties

`guestId` `roomId` `packageIds` `specialRequestIds`

Mindbricks supports relations between data objects, allowing you to define how objects are linked together.
You can define relations in the data object properties, which will be used to create foreign key constraints in the database.
For complex joins operations, Mindbricks supportsa BFF pattern, where you can view dynamic and static views based on Elastic Search Indexes.
Use db level relations for simple one-to-one or one-to-many relationships, and use BFF views for complex joins that require multiple data objects to be joined together.

- **guestId**: ID
  Relation to `guest`.id

The target object is a sibling object, meaning that the relation is a many-to-one or one-to-one relationship from this object to the target.

On Delete: Set Null
Required: Yes

- **roomId**: ID
  Relation to `room`.id

The target object is a sibling object, meaning that the relation is a many-to-one or one-to-one relationship from this object to the target.

On Delete: Set Null
Required: Yes

- **packageIds**: ID
  Relation to `package_`.id

The target object is a sibling object, meaning that the relation is a many-to-one or one-to-one relationship from this object to the target.

On Delete: Set Null
Required: No

- **specialRequestIds**: ID
  Relation to `specialRequest`.id

The target object is a sibling object, meaning that the relation is a many-to-one or one-to-one relationship from this object to the target.

On Delete: Set Null
Required: No

### Filter Properties

`reservationCode` `guestId` `roomId` `checkInDate` `checkOutDate` `status` `paymentStatus` `totalAmount` `numGuests`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as API parameters in the listing API's that have "Auto Params" enabled.

- **reservationCode**: String has a filter named `reservationCode`

- **guestId**: ID has a filter named `guestId`

- **roomId**: ID has a filter named `roomId`

- **checkInDate**: Date has a filter named `checkInDate`

- **checkOutDate**: Date has a filter named `checkOutDate`

- **status**: Enum has a filter named `status`

- **paymentStatus**: Enum has a filter named `paymentStatus`

- **totalAmount**: Double has a filter named `totalAmount`

- **numGuests**: Integer has a filter named `numGuests`
