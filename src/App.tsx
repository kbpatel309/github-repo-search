import { useState } from 'react'
import './App.css'
import { searchRepositories } from './api/github'
import { useQuery } from '@tanstack/react-query'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [submittedTerm, setSubmittedTerm] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['repos', submittedTerm],
    queryFn: () => searchRepositories(submittedTerm),
    enabled: submittedTerm != '',
  })

  return (
    <div>
      <h1>GitHub Repository Search</h1>
      <form 
        onSubmit={(e) => {
          e.preventDefault()
          setSubmittedTerm(searchTerm)
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

      {isLoading && <p>isLoading...</p>}
      
      {error && <p>{error.message}</p>}

      {data && (
        <ul>
          {data.items.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      )}

    </div>
  )
}

export default App
