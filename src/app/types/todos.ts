// This file defines the structure of a Todo item in a Todo application.
// // It includes three properties: id, text, and completed.
// // The id is a unique identifier for each todo item, represented as a number.
// // The text is a string that describes the todo item.
// // The completed property is a boolean that indicates whether the todo item has been completed or not.
// // This interface can be used throughout the application to ensure type safety when working with todo items. 

export interface Todo{
  id: number
  text: string
  completed: boolean
}


