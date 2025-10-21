# Service Design Specification - Object Design for room

**hotelbackend-roominventory-service** documentation

## Document Overview

This document outlines the object design for the `room` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## room Data Object

### Object Overview

**Description:** Represents a hotel room and its specifications for assignment to reservations. Includes type, amenities, floor, status, occupancy, and description.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessPublic — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Composite Indexes

- **uniqueRoomNumber**: [roomNumber]
  This composite index is defined to optimize query performance for complex queries involving multiple fields.

The index also defines a conflict resolution strategy for duplicate key violations.

When a new record would violate this composite index, the following action will be taken:

**On Duplicate**: `throwError`

An error will be thrown, preventing the insertion of conflicting data.

### Properties Schema

| Property         | Type    | Required | Description                                                                                                               |
| ---------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `roomNumber`     | String  | Yes      | The unique identifier for the room within the hotel (e.g., &#39;101&#39;, &#39;A04&#39;).                                 |
| `type`           | Enum    | Yes      | Type or category of the room (e.g., single, double, suite, deluxe, family, accessible, other).                            |
| `amenities`      | String  | No       | List of amenities and facilities available in this room (e.g., &#39;wifi&#39;, &#39;mini-bar&#39;, &#39;tv&#39;).         |
| `floor`          | Integer | Yes      | The floor on which the room is located.                                                                                   |
| `description`    | Text    | No       | Freeform description for the room (location, view, remarks for staff) for reference in chatbots and tools.                |
| `occupancyLimit` | Integer | Yes      | Maximum number of guests allowed in this room.                                                                            |
| `status`         | Enum    | Yes      | Operational status of the room: available (can assign), occupied (assigned to reservation), maintenance, or outOfService. |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Array Properties

`amenities`

Array properties can hold multiple values and are indicated by the `[]` suffix in their type. Avoid using arrays in properties that are used for relations, as they will not work correctly.
Note that using connection objects instead of arrays is recommended for relations, as they provide better performance and flexibility.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **roomNumber**: 'default'
- **type**: "single"
- **floor**: 0
- **occupancyLimit**: 0
- **status**: "available"

### Auto Update Properties

`roomNumber` `type` `amenities` `floor` `description` `occupancyLimit` `status`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Enum Properties

Enum properties are defined with a set of allowed values, ensuring that only valid options can be assigned to them.
The enum options value will be stored as strings in the database,
but when a data object is created an addtional property with the same name plus an idx suffix will be created, which will hold the index of the selected enum option.
You can use the index property to sort by the enum value or when your enum options represent a sequence of values.

- **type**: [single, double, suite, family, deluxe, accessible, other]

- **status**: [available, occupied, maintenance, outOfService]

### Elastic Search Indexing

`roomNumber` `type` `amenities` `floor` `description` `occupancyLimit` `status`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Database Indexing

`roomNumber` `type` `floor` `occupancyLimit` `status`

Properties that are indexed in the database will be optimized for query performance, allowing for faster data retrieval.
Make a property indexed in the database if you want to use it frequently in query filters or sorting.

### Unique Properties

`roomNumber`

Unique properties are enforced to have distinct values across all instances of the data object, preventing duplicate entries.
Note that a unique property is automatically indexed in the database so you will not need to set the `Indexed in DB` option.

### Filter Properties

`roomNumber` `type` `floor` `occupancyLimit` `status`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as API parameters in the listing API's that have "Auto Params" enabled.

- **roomNumber**: String has a filter named `roomNumber`

- **type**: Enum has a filter named `type`

- **floor**: Integer has a filter named `floor`

- **occupancyLimit**: Integer has a filter named `occupancyLimit`

- **status**: Enum has a filter named `status`
