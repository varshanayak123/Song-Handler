import React from 'react'

const About = ({ onExploreMusic }) => {
  return (
    <div className='pt-28 px-8 py-12 min-h-[85vh] max-w-6xl mx-auto'>
      
      {/* Header Section */}
      <div className='text-center mb-16'>
        <h1 className='text-5xl font-extrabold text-[#F8E5EE] mb-4 tracking-tight'>
          About Song-Handler
        </h1>
        <p className='text-[#F8E5EE]/75 text-lg max-w-2xl mx-auto font-medium'>
          Song-Handler is your all-in-one music discovery hub designed to help you effortlessly search, explore, and bookmark your favorite artists, albums, and tracks.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-16'>

        {/* Discover Music */}
        <div className='bg-[#3D1308] border border-[#7B0D1E]/50 rounded-2xl p-8 hover:border-[#9F2042] transition-all duration-300 shadow-md'>
          <div className='mb-4 flex h-9 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-[#9F2042]" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18V5l11-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="17" cy="16" r="3" />
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-[#F8E5EE] mb-3'>
            Discover Music
          </h2>
          <p className='text-[#F8E5EE]/70 leading-relaxed'>
            Dive into handpicked selections of top trending albums and today's special spotlights from globally celebrated artists like Taylor Swift, The Weeknd, Billie Eilish, and Jungkook.
          </p>
        </div>

        {/* Search Albums */}
        <div className='bg-[#3D1308] border border-[#7B0D1E]/50 rounded-2xl p-8 hover:border-[#9F2042] transition-all duration-300 shadow-md'>
          <div className='mb-4 flex h-9 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-[#9F2042]" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-[#F8E5EE] mb-3'>
            Search Albums
          </h2>
          <p className='text-[#F8E5EE]/70 leading-relaxed'>
            Quickly look up any artist to explore their discography. Our live search provides instant suggestions and high-resolution album art powered by the iTunes Apple Music API.
          </p>
        </div>

        {/* Save Favorites */}
        <div className='bg-[#3D1308] border border-[#7B0D1E]/50 rounded-2xl p-8 hover:border-[#9F2042] transition-all duration-300 shadow-md'>
          <div className='text-4xl mb-4'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-9 h-9 fill-[#9F2042] stroke-[#9F2042]"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-[#F8E5EE] mb-3'>
            Save Favorites
          </h2>
          <p className='text-[#F8E5EE]/70 leading-relaxed'>
            Curate your own personal music library. With a single click on the heart icon, keep your favorite albums saved safely in your private collection across browser sessions.
          </p>
        </div>

        {/* Explore & Enjoy */}
        <div className='bg-[#3D1308] border border-[#7B0D1E]/50 rounded-2xl p-8 hover:border-[#9F2042] transition-all duration-300 shadow-md'>
          <div className='mb-4 flex h-9 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-[#9F2042]" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5" />
              <circle cx="12" cy="12" r="2.25" />
              <path d="M12 3.5v3M20.5 12h-3M12 20.5v-3M3.5 12h3" />
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-[#F8E5EE] mb-3'>
            Explore & Enjoy
          </h2>
          <p className='text-[#F8E5EE]/70 leading-relaxed'>
            Listen to samples or open albums directly in Apple Music with one click. Discover new tunes, view release dates, and enjoy high-fidelity music streaming.
          </p>
        </div>

      </div>

      {/* Call to Action */}
      <div className='text-center py-8'>
        <button
          onClick={onExploreMusic}
          className='px-9 py-4 bg-[#9F2042] text-[#F8E5EE] font-bold rounded-full hover:bg-[#7B0D1E] transition-colors duration-200 shadow-xl cursor-pointer text-lg'
        >
          Explore Music Now
        </button>
      </div>

    </div>
  )
}

export default About
