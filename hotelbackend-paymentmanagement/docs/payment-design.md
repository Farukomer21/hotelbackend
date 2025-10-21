# Service Design Specification - Object Design for payment

**hotelbackend-paymentmanagement-service** documentation

## Document Overview

This document outlines the object design for the `payment` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## payment Data Object

### Object Overview

**Description:** Represents a payment made for a reservation. Includes reference to reservation, amount, currency, payment method, paid date, status, and reference code for audit or external payment linkages. Multiple payments per reservation are allowed (split or partial payments).

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessPublic — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Properties Schema

| Property        | Type   | Required | Description                                                                                                                        |
| --------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `reservationId` | ID     | Yes      | Reference to reservation (reservationManagement:reservation). Required for linking payment to booking.                             |
| `amount`        | Double | Yes      | Amount paid (or attempted) for this payment, in the currency specified. Required.                                                  |
| `currency`      | String | Yes      | ISO code for currency (e.g., &#39;USD&#39;, &#39;EUR&#39;). Required.                                                              |
| `paymentMethod` | Enum   | Yes      | Payment method used for this payment (cash, card, transfer, or other). Required. Used for reporting and audit.                     |
| `paidAt`        | Date   | No       | Timestamp when payment was received. Null if payment not completed. Set to now() if not specified on &#39;status=paid&#39;.        |
| `status`        | Enum   | Yes      | Status of the payment: pending (recorded, not yet paid), paid (confirmed), failed, partiallyPaid. Required for workflow and audit. |
| `reference`     | String | No       | Free text or code used to reference this payment externally (e.g., bank transfer ref, POS slip, staff note). Optional.             |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **reservationId**: '00000000-0000-0000-0000-000000000000'
- **amount**: 0.0
- **currency**: 'default'
- **paymentMethod**: "cash"
- **status**: "pending"

### Constant Properties

`reservationId`

Constant properties are defined to be immutable after creation, meaning they cannot be updated or changed once set. They are typically used for properties that should remain constant throughout the object's lifecycle.
A property is set to be constant if the `Allow Update` option is set to `false`.

### Auto Update Properties

`amount` `currency` `paymentMethod` `paidAt` `status` `reference`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Enum Properties

Enum properties are defined with a set of allowed values, ensuring that only valid options can be assigned to them.
The enum options value will be stored as strings in the database,
but when a data object is created an addtional property with the same name plus an idx suffix will be created, which will hold the index of the selected enum option.
You can use the index property to sort by the enum value or when your enum options represent a sequence of values.

- **paymentMethod**: [cash, card, transfer, other]

- **status**: [pending, paid, failed, partiallyPaid]

### Elastic Search Indexing

`reservationId` `amount` `currency` `paymentMethod` `paidAt` `status` `reference`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Database Indexing

`reservationId`

Properties that are indexed in the database will be optimized for query performance, allowing for faster data retrieval.
Make a property indexed in the database if you want to use it frequently in query filters or sorting.

### Secondary Key Properties

`reservationId`

Secondary key properties are used to create an additional indexed identifiers for the data object, allowing for alternative access patterns.
Different than normal indexed properties, secondary keys will act as primary keys and Mindbricks will provide automatic secondary key db utility functions to access the data object by the secondary key.

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

### Filter Properties

`reservationId` `paymentMethod` `paidAt` `status`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as API parameters in the listing API's that have "Auto Params" enabled.

- **reservationId**: ID has a filter named `reservationId`

- **paymentMethod**: Enum has a filter named `paymentMethod`

- **paidAt**: Date has a filter named `paidAt`

- **status**: Enum has a filter named `status`
