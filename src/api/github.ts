
// Shape of single repository object returned by GitHub Search API
// Only including some of the fields - real response has more fields
// Live response from: https://api.github.com/search/repositories?q=nextjs&per_page=1
export interface GitHubRepo {
    id: number
    name: string
    full_name: string
    html_url: string
    description: string | null // string | null because GitHub returns `null` for repos w/no description
    stargazers_count: number
    updated_at: string
    owner: {
        login: string
        avatar_url: string
    }
}


// Top level shape of GitHub Search API response - wraps array of GitHubRepo items plus a total_count
interface SearchReposResponse {
    total_count: number
    items: GitHubRepo[]
}

export type SortOption = 'best-match' | 'stars' | 'updated'

export async function searchRepositories(query:string, sort:SortOption, perPage:number, page:number): Promise<SearchReposResponse> {
    // encodeURIComponent escapes special characters (spaces, &, etc.) in the search term so the URL stays valid.
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`

    let sortParams = ''
    if (sort === 'stars') {
        sortParams = '&sort=stars&order=desc'
    } else if (sort === 'updated') {
        sortParams = '&sort=updated&order=desc'
    }

    const paginationParams = `&per_page=${perPage}&page=${page}`

    const finalURL = `${url}${sortParams}${paginationParams}`

    const response = await fetch(finalURL)

    if(!response.ok) {
        throw new Error(`Github API Error: ${response.status}`)
    }

    
    return response.json()
 }