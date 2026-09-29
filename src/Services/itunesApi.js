const BASE_URL = 'https://itunes.apple.com/search'

export const searchAlbums = async (searchTerm) => {
  const response = await fetch(
    `${BASE_URL}?term=${encodeURIComponent(searchTerm)}&entity=album&attribute=albumTerm&limit=25`
  )

  if (!response.ok) {
    throw new Error(`iTunes API request failed: ${response.status}`)
  }

  const data = await response.json()

  return data.results || []
}