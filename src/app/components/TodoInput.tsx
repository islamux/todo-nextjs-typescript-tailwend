
'use client' // This is a client component: it uses useState and useEffect, so it must be a client component.
  import { useState } from "react"
interface TodoInputProps{
  onAdd:(text:string)=> void;
}
export default function TodoInput({onAdd}:TodoInputProps){ 

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = ()=> {
    if(inputValue.trim() ){
      onAdd(inputValue.trim())
      setInputValue('')
    }

  }

  // Handle Enter key press to submit the todo item 
  const handleKeyPress = (e: React.KeyboardEvent)=>{
    if(e.key === 'Enter'){
      handleSubmit()
    }
  }

  return (
    <div
    className="flex gap-2 mb-6">
    <input
    value={inputValue}
    onChange={(e)=> setInputValue(e.target.value)}
    onKeyPress={handleKeyPress} 
    className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus-within:outline-none focus:ring-2 focus:border-transparent text-gray-800"
    />
    <button
    onClick={handleSubmit}
    className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"

  > Add todo  
    </button>

    </div>
  )
}
