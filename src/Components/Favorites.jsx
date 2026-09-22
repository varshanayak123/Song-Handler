import React from 'react'
import AlbumCard from './AlbumCard'

const Favorites = ({ favorites = [], toggleFavorite, onExploreMusic }) => {
  return (
    <div className='min-h-[85vh] px-4 py-8 pt-24 sm:px-6 sm:py-10 sm:pt-28 lg:px-8 lg:py-12'>

      <div className='mb-8'>

        <h1 className='flex items-center gap-2 text-3xl font-extrabold text-[#F8E5EE] sm:gap-3 sm:text-4xl'>

          <span className='p-2 rounded-full bg-[#3D1308] border border-[#7B0D1E] shadow-sm flex items-center justify-center'>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-7 h-7 fill-[#9F2042] stroke-[#9F2042]"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>

          </span>

          My Favorites ({favorites.length})

        </h1>

        <p className='text-[#F8E5EE]/70 text-sm mt-1 font-medium'>
          {favorites.length} {favorites.length === 1 ? 'album' : 'albums'} saved
        </p>

      </div>

      {favorites.length > 0 ? (
        <>

          {/* Favorite Albums */}
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-10'>

            {favorites.map((album, index) => (

              <div
                key={`${album.id || album.name}-${index}`}
                className='min-w-0'
              >

                <AlbumCard
                  album={album}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />

              </div>

            ))}

          </div>

          {/* Add More Songs */}
          <div className='mt-10 flex justify-center sm:mt-12'>

            <button
              onClick={onExploreMusic}
              className='w-full rounded-full bg-[#9F2042] px-8 py-3.5 font-bold text-[#F8E5EE] shadow-md transition-colors duration-200 cursor-pointer hover:bg-[#7B0D1E] hover:shadow-lg sm:w-auto'
            >
              Add More Songs
            </button>

          </div>

        </>
      ) : (

        <div className='mx-auto flex max-w-md flex-col items-center justify-center rounded-3xl border border-[#7B0D1E]/60 bg-[#3D1308] px-5 py-12 text-center shadow-lg sm:px-6 sm:py-16'>

          {/* Music Icon */}
          <div className='w-16 h-16 rounded-full bg-[#211103] flex items-center justify-center mb-4 border border-[#7B0D1E] shadow-inner'>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-8 h-8 fill-[#9F2042] stroke-[#9F2042]"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>

          </div>

          <h2 className='text-2xl font-bold text-[#F8E5EE] mb-2'>
            No favorites yet
          </h2>

          <p className='text-[#F8E5EE]/70 text-base mb-6'>
            Start adding your favorite music!
          </p>

          <button
            onClick={onExploreMusic}
            className='px-7 py-3 bg-[#9F2042] text-[#F8E5EE] font-bold rounded-full hover:bg-[#7B0D1E] transition-colors duration-200 shadow-md cursor-pointer hover:shadow-lg'
          >
            Add More Songs
          </button>

        </div>

      )}

    </div>
  )
}

export default Favorites
