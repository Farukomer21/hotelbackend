# Service Design Specification - Object Design for package\_

**hotelbackend-packagemanagement-service** documentation

## Document Overview

This document outlines the object design for the `package_` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## package\_ Data Object

### Object Overview

**Description:** A value-added hotel package/service that can be assigned to a reservation. Includes package name, description, pricing, validity dates, and activation status.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessProtected — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Properties Schema

| Property        | Type   | Required | Description                                                                                                |
| --------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| `name`          | String | Yes      | Display name of the package (e.g., &#39;Breakfast&#39;, &#39;Airport Transfer&#39;, &#39;Spa Access&#39;). |
| `description`   | Text   | No       | Longer, optional description of the package, features, or details.                                         |
| `price`         | Double | Yes      | The price of the package in the base currency. Must be &gt;= 0.                                            |
| `availableFrom` | Date   | Yes      | Date from which the package is offered/bookable.                                                           |
| `availableTo`   | Date   | Yes      | Date until which the package is offered/bookable (inclusive).                                              |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **name**: 'default'
- **price**: 0.0
- **availableFrom**: new Date()
- **availableTo**: new Date()

### Auto Update Properties

`name` `description` `price` `availableFrom` `availableTo`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Elastic Search Indexing

`name` `description` `price` `availableFrom` `availableTo`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Database Indexing

`name` `price` `availableFrom` `availableTo`

Properties that are indexed in the database will be optimized for query performance, allowing for faster data retrieval.
Make a property indexed in the database if you want to use it frequently in query filters or sorting.

### Filter Properties

`name` `price` `availableFrom` `availableTo`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as API parameters in the listing API's that have "Auto Params" enabled.

- **name**: String has a filter named `name`

- **price**: Double has a filter named `price`

- **availableFrom**: Date has a filter named `availableFrom`

- **availableTo**: Date has a filter named `availableTo`
