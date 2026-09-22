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
    <div className='px-5 pb-12 pt-28 text-center'>
      <div className='mx-auto max-w-4xl rounded-[32px] border border-[#F8E5EE]/10 bg-[#211103]/80 px-6 py-9 shadow-2xl backdrop-blur-xl sm:px-10 sm:py-10'>

        <h1 className='font-serif text-4xl font-extrabold tracking-tight text-[#F8E5EE] drop-shadow-sm sm:text-5xl lg:text-6xl'>
          Find Your Favorite Music
        </h1>

        <p className='mt-5 text-base font-medium text-[#F8E5EE]/70 sm:text-lg'>
          Discover albums, artists and music you'll love.
        </p>

        <div className='mt-7 flex justify-center'>

          <div className='relative w-full max-w-xl'>

            {/* Search Bar */}
            <div className='flex min-h-15 w-full rounded-full border border-[#F8E5EE]/15 bg-[#3D1308]/55 p-1.5 shadow-lg transition-all duration-200 focus-within:border-[#9F2042] focus-within:ring-2 focus-within:ring-[#9F2042]/30'>

              <span className='flex items-center pl-4 text-[#F8E5EE]/70' aria-hidden='true'>
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
                className='flex-1 bg-transparent px-4 py-3 outline-none text-[#F8E5EE] placeholder:text-[#F8E5EE]/40'
              />

              <button
                onClick={() => handleSearch(input)}
                className='rounded-full bg-[#9F2042] px-7 py-3 text-[#F8E5EE] font-bold transition-colors duration-200 cursor-pointer shadow-sm hover:bg-[#7B0D1E]'
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
    </div>
  )
}

export default Hero
