const BASE_URL = 'https://itunes.apple.com/search'

export const searchAlbums = async (artist) => {
  const response = await fetch(
    `${BASE_URL}?term=${encodeURIComponent(artist)}&entity=album&attribute=artistTerm&limit=10`
  )

  const data = await response.json()

  return data.results
}

