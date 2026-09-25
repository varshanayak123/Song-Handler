const BASE_URL = 'https://itunes.apple.com/search'

export const searchAlbums = async (searchTerm) => {

  const response = await fetch(
    `${BASE_URL}?term=${encodeURIComponent(searchTerm)}&entity=album&attribute=albumTerm&limit=25`
  )

  const data = await response.json()

  console.log("SEARCH TERM:", searchTerm)
  console.log("API RESULTS:", data.results)

  return data.results
}