import React, { useEffect, useState } from 'react'

const Hero = ({ setSearch }) => {

  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const handleSearch = (value = input) => {
  setInput(value)
  setSearch(value)
  setSuggestions([])
}
  useEffect(() => {

    const getSuggestions = async () => {

      if (input.trim() === '') {
        setSuggestions([])
        return
      }

      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(input)}&entity=musicArtist&limit=5`
      )

      const data = await response.json()

      setSuggestions(data.results)
    }

    getSuggestions()

  }, [input])

  return (
    <div className='pt-24 py-20 px-5 text-center'>

      <h1 className='text-5xl font-bold text-white'>
        Find Your Favorite Music
      </h1>

      <p className='mt-4 text-gray-600 text-lg'>
        Search for your favorite artists and discover their albums
      </p>

      <div className='mt-8 flex justify-center'>

        <div className='relative w-full max-w-xl'>

          {/* Search Bar */}
          <div className='flex w-full bg-white rounded-full shadow-md overflow-hidden border border-gray-200'>

            <input
              type='text'
              placeholder='Search for an artist...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              className='flex-1 px-6 py-4 outline-none text-gray-700'
            />

            <button
              onClick={handleSearch}
              className='px-7 py-4 bg-red-800 text-white font-semibold border-none hover:bg-red-700 transition'
            >
              Search
            </button>

          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className='absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-md text-left overflow-hidden z-50'>

              {suggestions.map((artist) => (
                <div
                  key={artist.artistId}
                  onClick={() => handleSearch(artist.artistName)}
                  
                  className='px-5 py-3 cursor-pointer hover:bg-gray-100 text-gray-700'
                >
                  {artist.artistName}
                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default Hero