# GraphQL API

## Mutations

### `createTaskAsync`

Creates a new task in the application.

**Description:**

The `createTaskAsync` Creates a new task with the provided title, description, limitDate and finished.

**Arguments:**

- `taskData`: (TaskInput): Is a input type of the task.

input TaskInput {
"""title of a task is a field of type ( string )."""
title: String!

"""description of a task is a field of type ( string )."""
description: String!

"""limitDate of a task is a field of type ( string ) => dd/MM/yyyy."""
limitDate: String!

"""finished of a task is a field of type ( boolean )."""
finished: Boolean
}

**Response:**

Returns a boolean that indicates that if it was executed correctly.

**Usage Example:**

```graphql
mutation {
  createTaskAsync(
    taskData: {
      title: "Nuevo 2"
      description: "Descripción nueva 2"
      limitDate: "06/07/2024"
    }
  )
}
```

### `updateTaskAsync`

Updates an existing task in the application.

**Description:**

The `updateTaskAsync` Updates the provided attributes of the task.

**Arguments:**

- `ID`: (ID => String): The unique identifier of the task.
- `taskData`: (TaskPartialUpdateInput): Is a input type of the task.

input TaskPartialUpdateInput {
"""title of a task is a field of type ( string )."""
title: String

"""description of a task is a field of type ( string )."""
description: String

"""limitDate of a task is a field of type ( string ) => dd/MM/yyyy."""
limitDate: String

"""finished of a task is a field of type ( boolean )."""
finished: Boolean
}

**Response:**

Returns a boolean that indicates that if it was executed correctly.

**Usage Example:**

```graphql
mutation {
  updateTaskAsync(
    id: "ExFP1db41ItuwcOAJKqt"
    taskData: { title: "nuevesito 1.0", finished: true }
  )
}
```

### `removeTaskAsync`

Remove an existing task in the application.

**Description:**

The `removeTaskAsync` Remove a task by the provided ID.

**Arguments:**

- `ID`: (ID => String): The unique identifier of the task.

**Response:**

Returns a boolean that indicates that if it was executed correctly.

**Usage Example:**

```graphql
mutation {
  removeTaskAsync(id: "n4vv7iaADFGsjFiYkM6o")
}
```

## Queries

### `getAllTasksAsync`

Gets all tasks in the application.

**Description:**

The `getAllTasksAsync` Gets all tasks.

**Response:**

Returns an array of tasks.

**Usage Example:**

```graphql
query {
  getAllTasksAsync {
    id
    title
    description
    limitDate
    finished
  }
}
```

### `getTaskByIdAsync`

Gets a task by ID in the application.

**Description:**

The `getTaskByIdAsync` Gets a task by the provided ID.

**Arguments:**

- `id`: (ID => String): The unique identifier of the task.

**Response:**

Return a task

**Usage Example:**

```graphql
query {
  getTaskByIdAsync(id: "ExFP1db41ItuwcOAJKqt") {
    id
    title
    description
    limitDate
    finished
  }
}
```

### `getTasksByStatusAsync`

Get all tasks by status in the application.

**Description:**

The `getTasksByStatusAsync` Get all tasks that match the status.

**Arguments:**

- `finished`: (Boolean): The status of the task.

**Response:**

Returns an array of tasks that match the status

**Usage Example:**

```graphql
query {
  getTasksByStatusAsync(finished: true) {
    id
    title
    description
    finished
    limitDate
  }
}
```
