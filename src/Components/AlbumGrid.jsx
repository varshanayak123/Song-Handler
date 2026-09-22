import React from 'react'
import AlbumCard from './AlbumCard'

const AlbumGrid = ({ 
  search, 
  apiAlbums = [], 
  specialAlbums = [], 
  trendingAlbums = [],
  favorites = [],
  toggleFavorite
}) => {

  const formattedApiAlbums = apiAlbums.map((album) => ({
    id: album.collectionId || album.id || `${album.collectionName}-${album.artistName}`,
    name: album.collectionName,
    artist: album.artistName,
    date: album.releaseDate?.slice(0, 4),
    image: album.artworkUrl100?.replace('100x100', '600x600'),
    albumUrl: album.collectionViewUrl
  }))

  const formattedSpecialAlbums = specialAlbums.map((album) => ({
    id: album.collectionId || album.id || `${album.collectionName}-${album.artistName}`,
    name: album.collectionName,
    artist: album.artistName,
    date: album.releaseDate?.slice(0, 4),
    image: album.artworkUrl100?.replace('100x100', '600x600'),
    albumUrl: album.collectionViewUrl
  }))

  const formattedTrendingAlbums = trendingAlbums.map((album) => ({
    id: album.collectionId || album.id || `${album.collectionName}-${album.artistName}`,
    name: album.collectionName,
    artist: album.artistName,
    date: album.releaseDate?.slice(0, 4),
    image: album.artworkUrl100?.replace('100x100', '600x600'),
    albumUrl: album.collectionViewUrl
  }))

  const isSearching = typeof search === 'string' && search.trim() !== ''

  return (
    <section className='px-8 py-12'>

      {isSearching && (
        <div className='mb-12'>
          <h2 className='text-3xl font-extrabold text-[#F8E5EE] mb-6 flex items-center gap-2'>
            <span className='text-[#9F2042]'>🔍</span> Search Results
          </h2>

          {formattedApiAlbums.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-5'>
              {formattedApiAlbums.map((album, index) => (
                <div key={`${album.name}-${index}`}>
                  <AlbumCard
                    album={album}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className='text-[#F8E5EE]/70 px-5 text-lg'>
              No albums found.
            </p>
          )}
        </div>
      )}

      <h2 className='text-3xl font-extrabold text-[#F8E5EE] mb-6 flex items-center gap-2'>
        <span className='text-[#9F2042]'>🔥</span> Today's Special
      </h2>

      <div className='flex gap-10 p-5 overflow-x-auto'>
        {formattedSpecialAlbums.map((album, index) => (
          <div key={`${album.name}-${index}`} className='min-w-[200px]'>
            <AlbumCard
              album={album}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          </div>
        ))}
      </div>

      <h2 className='text-3xl mt-14 font-extrabold text-[#F8E5EE] mb-6 flex items-center gap-2'>
        <span className='text-[#9F2042]'>✨</span> Trending
      </h2>

      <div className='flex gap-10 p-5 overflow-x-auto'>
        {formattedTrendingAlbums.map((album, index) => (
          <div key={`${album.name}-${index}`} className='min-w-[200px]'>
            <AlbumCard
              album={album}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          </div>
        ))}
      </div>

    </section>
  )
}

export default AlbumGrid