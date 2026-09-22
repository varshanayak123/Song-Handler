import React, { useEffect, useState } from 'react'

const Hero = ({ setSearch }) => {

  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const handleSearch = (value) => {
    const query = typeof value === 'string' ? value : input
    setInput(query)
    setSearch(query)
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

      <h1 className='font-serif text-5xl font-extrabold text-[#F8E5EE] tracking-tight drop-shadow-sm'>
        Find Your Favorite Music
      </h1>

      <p className='mt-4 text-[#F8E5EE]/75 text-lg font-medium'>
        Search for your favorite artists and discover their albums
      </p>

      <div className='mt-8 flex justify-center'>

        <div className='relative w-full max-w-xl'>

          {/* Search Bar */}
          <div className='flex w-full bg-[#3D1308]/90 rounded-full shadow-lg overflow-hidden border border-[#7B0D1E]/75 focus-within:border-[#9F2042] focus-within:ring-2 focus-within:ring-[#9F2042]/30 transition-all duration-200'>

            <span className='flex items-center pl-5 text-[#F8E5EE]/75' aria-hidden='true'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
            </span>

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
              className='flex-1 px-4 py-4 outline-none text-[#F8E5EE] placeholder:text-[#F8E5EE]/40 bg-transparent'
            />

            <button
              onClick={() => handleSearch(input)}
              className='px-7 py-4 bg-[#9F2042] text-[#F8E5EE] font-bold border-none hover:bg-[#7B0D1E] transition-colors duration-200 cursor-pointer shadow-sm'
            >
              Search
            </button>

          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className='absolute top-full left-0 right-0 mt-2 bg-[#3D1308] rounded-2xl shadow-xl text-left overflow-hidden z-50 border border-[#7B0D1E]'>

              {suggestions.map((artist) => (
                <div
                  key={artist.artistId}
                  onClick={() => handleSearch(artist.artistName)}
                  className='px-5 py-3.5 cursor-pointer hover:bg-[#7B0D1E] text-[#F8E5EE] font-medium transition-colors duration-150 border-b border-[#7B0D1E]/40 last:border-b-0'
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
