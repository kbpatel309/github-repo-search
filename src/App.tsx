import { useState } from 'react'
import './App.css'
import { searchRepositories, type SortOption } from './api/github'
import { useQuery } from '@tanstack/react-query'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [submittedTerm, setSubmittedTerm] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('best-match')
  const [perPage, setPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, error } = useQuery({
    queryKey: ['repos', submittedTerm, sortBy, perPage, currentPage],
    queryFn: () => searchRepositories(submittedTerm, sortBy, perPage, currentPage),
    enabled: submittedTerm != '',
  })

  const totalPages = Math.ceil((data?.total_count ?? 0) / perPage)

  return (
    <div>
      <h1>GitHub Repository Search</h1>
      <form 
        onSubmit={(e) => {
          e.preventDefault()
          setSubmittedTerm(searchTerm)
          setCurrentPage(1)
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

      <select 
        value={sortBy} 
        onChange={(e) => {
          setSortBy(e.target.value as SortOption)
          setCurrentPage(1)
      }}>
        <option value="best-match">Best match</option>
        <option value="stars">Stars</option>
        <option value="updated">Most updated</option>
      </select>

      <select
        value={perPage}
        onChange={(e) => {
          setPerPage(Number(e.target.value))
          setCurrentPage(1)
          }}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>

      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      
      <span>Page {currentPage} of {totalPages}</span>
      
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={!data || currentPage >= totalPages}
      >
        Next
      </button>

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
