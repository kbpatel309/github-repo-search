import { useState } from 'react'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div>
      <h1>GitHub Repository Search</h1>
      <form 
        onSubmit={(e) => {
          e.preventDefault()
          console.log('Searching for:', searchTerm)
        }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search repositories"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default App
