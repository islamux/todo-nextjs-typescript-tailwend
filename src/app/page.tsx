import TodoApp from './components/TodoApp'

// 
export default function Home(){
  return (
    // Main container with gradient background and padding
    // Includes the TodoApp component which contains the entire todo application
    // The main element takes up the full height of the screen (min-h-screen)
    // The background is a gradient from blue-50 to indigo-100
    // Padding is applied on the y-axis (top and bottom) with a value of 12
    // This setup provides a visually appealing background for the todo application
    // End of main container
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12'>
    <TodoApp/>
    </main>

  )

}
