import React from 'react'
import AlbumCard from './AlbumCard'

const AlbumGrid = ({ search, apiAlbums, specialAlbums, trendingAlbums }) => {
  
  const formattedApiAlbums = apiAlbums.map((album) => ({
    name: album.collectionName,
    artist: album.artistName,
    date: album.releaseDate?.slice(0, 4),
    image: album.artworkUrl100?.replace('100x100', '600x600'),
    albumUrl: album.collectionViewUrl
  }))

  const formattedSpecialAlbums = specialAlbums.map((album) => ({
  name: album.collectionName,
  artist: album.artistName,
  date: album.releaseDate?.slice(0, 4),
  image: album.artworkUrl100?.replace('100x100', '600x600'),
  albumUrl: album.collectionViewUrl
}))

  const formattedTrendingAlbums = trendingAlbums.map((album) => ({
  name: album.collectionName,
  artist: album.artistName,
  date: album.releaseDate?.slice(0, 4),
  image: album.artworkUrl100?.replace('100x100', '600x600'),
  albumUrl: album.collectionViewUrl
}))

  const isSearching = search.trim() !== ''

  return (
    <section className='px-8 py-12'>

      <h2 className='text-3xl font-bold text-white mb-6'>
        🔥 Today's Special
      </h2>

      <div className='flex gap-10 p-5 overflow-x-auto'>

        {isSearching ? (
           formattedApiAlbums.map((album, index) => (
      <div key={`${album.name}-${index}`} className='min-w-[200px]'>
      <AlbumCard album={album} />
      </div>
    ))
    ) : (
    formattedSpecialAlbums.map((album, index) => (
      <div key={`${album.name}-${index}`} className='min-w-[200px]'>
      <AlbumCard album={album} />
      </div>
       ))
   )}

      </div>

      {!isSearching && (
  <>
    <h2 className='text-3xl mt-15 font-bold text-white mb-6'>
      ✨ Trending
    </h2>

    <div className='flex gap-10 p-5 overflow-x-auto'>

      {formattedTrendingAlbums.map((album, index) => (
  <div key={`${album.name}-${index}`} className='min-w-[200px]'>
    <AlbumCard album={album} />
  </div>
      ))}

    </div>
  </>
)}

    </section>
  )
}

export default AlbumGrid