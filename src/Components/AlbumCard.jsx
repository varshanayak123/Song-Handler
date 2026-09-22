import React from 'react'

const AlbumCard = ({ album, favorites, toggleFavorite }) => {

  const isFavorite = favorites.some(
    (fav) => fav.id === album.id
  )

  return (
    <div className='h-[300px] overflow-hidden rounded-xl border border-[#7B0D1E]/40 bg-[#3D1308] shadow-lg transition-all duration-300 hover:border-[#9F2042] sm:h-[320px] lg:h-[340px] lg:hover:scale-105'>

      <div className='relative'>

        <img
          src={album.image}
          alt='Album'
          className='h-32 w-full object-cover sm:h-40 lg:h-45'
        />

        <button
          onClick={() => toggleFavorite(album)}
          className='absolute top-2.5 right-2.5 p-2 rounded-full bg-[#211103]/80 backdrop-blur-sm border border-[#7B0D1E]/40 hover:border-[#9F2042] shadow-md hover:scale-110 transition-all duration-200 cursor-pointer'
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-5 h-5 transition-colors duration-200 ${
              isFavorite
                ? 'fill-[#9F2042] stroke-[#9F2042]'
                : 'fill-transparent stroke-[#F8E5EE] hover:stroke-[#9F2042]'
            }`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

      </div>

      <div className='p-3 sm:p-4'>

        <h2 className='truncate text-sm font-bold text-[#F8E5EE] sm:text-lg'>
          {album.name}
        </h2>

        <p className='mt-1 truncate text-xs font-medium text-[#F8E5EE]/75 sm:text-sm'>
          {album.artist}
        </p>

        <p className='mt-1 text-xs text-[#F8E5EE]/60 sm:text-sm'>
          {album.date}
        </p>

        <button
          onClick={() => window.open(album.albumUrl, '_blank')}
          className='mt-3 w-full rounded-lg bg-[#9F2042] py-2 text-xs font-bold text-[#F8E5EE] shadow-sm transition-colors duration-200 cursor-pointer hover:bg-[#7B0D1E] sm:mt-4 sm:text-sm'
        >
          🎧 Open Album
        </button>

      </div>

    </div>
  )
}

export default AlbumCard
