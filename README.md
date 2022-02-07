# React Design Patterns

This is a simple to-do-list component that applies 4 different react architecture patterns. The patterns aim to decouple and apply the single-responsibility-principle.

## How To Start
1.  `npm i`
2.  `npm run dev`

## Overview of Patterns

What a pattern gives us
- Separation of concerns
  - Increases DRY code
  - Easier to debug 
- Decoupling
  - Ability to switch technologies easier
  - Refactoring/lifting features becomes easier
- Testability
  - Increase ability to mock 
  - Smaller units of code to test
- Collaboration
  - Frontend Engineers and Designers
  - Frontend and Backend Engineers

Pattern complexity (high to low)
1. Clean Architecture
2. MVVM
3. VVM
4. Helper Functions

Pattern coupling (high to low)
1. VVM
2. Helper Functions
3. MVVM
4. Clean Architecture
### Clean Architecture by Uncle Bob

Description 

- Entities - pure business logic 
  - No frameworks/annotations
- Use Cases - a business action
  - Utility libraries are welcome here
  - Unaware of who triggers action, how to display UI, or specific data store
  - Implements the Entities
- Controllers/Adapters - Interface from Drivers to Use Cases
  - N number of data providers
  - Implements the Use Cases and provides data stores
- FrameWorks/Drivers - External frameworks and services
  - Pass services and data stores to the Controllers/Adapters
  - Uses the interface provided by the Controllers/Adapters for user events


[Resource](https://www.freecodecamp.org/news/a-quick-introduction-to-clean-architecture-990c014448d2/)
### MVVM (Model - View - View Model)

Description

- View
  - Only concerns itself with presentation
  - Implements actions from View Model
- View Model
  - Coordinates interaction between View and Model
  - Data conversion  (View specific) from the Model 
  - Many to One relationship to model 
- Model
  - Data access and Services
  - Represents the validation/shared business logic
  - 
[Resource](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/enterprise-application-patterns/mvvm)

### VVM (View - View Model)

Description

- Model View
  - Combines the Model and View Model from MVVM
  - Handles all business logic
  - Performs data access (Local and External)
  - Transforms data
  - Manages validation
- View
  - Still just the presentation layer
  - Consumes actions/functions from Model View

### Helper File + View

Description

- Helper File
  - Pure functions 
  - Implemented in the React view
- View
  - Handles state (local and external)
  - Determines presentation
