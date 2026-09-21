import React from 'react'

const AlbumCard = ({ album }) => {
  return (
    <div className='bg-black rounded-xl overflow-hidden shadow-lg h-[340px] hover:scale-105 transition-transform duration-300'>

      <img
        src={album.image}
        alt='Album'
        className='w-full h-45 object-cover'
      />

      <div className='p-4'>

        <h2 className='text-white text-lg font-bold truncate'>
          {album.name}
        </h2>

        <p className='text-gray-400 text-sm mt-1 truncate'>
          {album.artist}
        </p>

        <p className='text-gray-500 text-sm mt-1'>
          {album.date}
        </p>

        <button
          onClick={() => window.open(album.albumUrl, '_blank')}
          className='mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition'
        >
          🎧 Open Album
        </button>

      </div>

    </div>
  )
}

export default AlbumCard