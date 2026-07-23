import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div>
      <h1>GitHub Repository Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default App
