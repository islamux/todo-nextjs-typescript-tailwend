import TodoApp from './components/TodoApp'

// 
export default function Home(){
  return (
    // Main container with gradient background
    // and padding
    // Using Tailwind CSS for styling
    // Min height to cover full screen
    // Gradient from light blue to light indigo
    // Padding on y-axis for spacing  
    // Rendering the TodoApp component inside the main container
    // This is the main page of the application
    //
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12'>
    <TodoApp/>
    </main>

  )

}
