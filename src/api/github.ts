
// Shape of single repository object returned by GitHub Search API
// Only including some of the fields - real response has more fields
// Live response from: https://api.github.com/search/repositories?q=nextjs&per_page=1
export interface GitHubRepo {
    id: number
    name: string
    full_name: string
    html_url: string
    description: string
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