# Service Design Specification - Object Design for roomPrice

**hotelbackend-roompricing-service** documentation

## Document Overview

This document outlines the object design for the `roomPrice` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## roomPrice Data Object

### Object Overview

**Description:** Represents a price entry for a hotel room, including validity period and history/audit reason. Linked to a roomInventory:room. Used to track price changes over time for reporting, billing, and audit.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessProtected — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Composite Indexes

- **room_validfrom_idx**: [roomId, validFrom]
  This composite index is defined to optimize query performance for complex queries involving multiple fields.

The index also defines a conflict resolution strategy for duplicate key violations.

When a new record would violate this composite index, the following action will be taken:

**On Duplicate**: `throwError`

An error will be thrown, preventing the insertion of conflicting data.

### Properties Schema

| Property    | Type   | Required | Description                                                                                                                                             |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `roomId`    | ID     | Yes      | Foreign key to roomInventory:room. Identifies which room this price applies to.                                                                         |
| `price`     | Double | Yes      | Room price in base hotel currency. Must be &gt;= 0.                                                                                                     |
| `validFrom` | Date   | Yes      | Start date/time for this price entry. Inclusive. Required for all entries.                                                                              |
| `validTo`   | Date   | Yes      | End date/time for this price entry. Inclusive. Required for all entries.                                                                                |
| `reason`    | String | No       | (Optional) Free-text reason describing why the price was set or modified (e.g., &#39;seasonal adjustment&#39;, &#39;promo&#39;, &#39;rate update&#39;). |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **roomId**: '00000000-0000-0000-0000-000000000000'
- **price**: 0.0
- **validFrom**: new Date()
- **validTo**: new Date()

### Constant Properties

`roomId`

Constant properties are defined to be immutable after creation, meaning they cannot be updated or changed once set. They are typically used for properties that should remain constant throughout the object's lifecycle.
A property is set to be constant if the `Allow Update` option is set to `false`.

### Auto Update Properties

`roomId` `price` `validFrom` `validTo` `reason`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Elastic Search Indexing

`roomId` `price` `validFrom` `validTo` `reason`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Database Indexing

`roomId` `validFrom`

Properties that are indexed in the database will be optimized for query performance, allowing for faster data retrieval.
Make a property indexed in the database if you want to use it frequently in query filters or sorting.

### Cache Select Properties

`roomId`

Cache select properties are used to collect data from Redis entity cache with a different key than the data object id.
This allows you to cache data that is not directly related to the data object id, but a frequently used filter.

### Relation Properties

`roomId`

Mindbricks supports relations between data objects, allowing you to define how objects are linked together.
You can define relations in the data object properties, which will be used to create foreign key constraints in the database.
For complex joins operations, Mindbricks supportsa BFF pattern, where you can view dynamic and static views based on Elastic Search Indexes.
Use db level relations for simple one-to-one or one-to-many relationships, and use BFF views for complex joins that require multiple data objects to be joined together.

- **roomId**: ID
  Relation to `room`.id

The target object is a parent object, meaning that the relation is a one-to-many relationship from target to this object.

On Delete: Set Null
Required: Yes

### Filter Properties

`roomId` `validFrom` `validTo`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as API parameters in the listing API's that have "Auto Params" enabled.

- **roomId**: ID has a filter named `roomId`

- **validFrom**: Date has a filter named `validFrom`

- **validTo**: Date has a filter named `validTo`
