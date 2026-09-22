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

          <div className='mb-6'>
            <h2 className='text-3xl font-extrabold text-[#F8E5EE]'>
              Search Results
            </h2>

            <div className='mt-2 h-1 w-12 rounded-full bg-[#9F2042]'></div>
          </div>

          {formattedApiAlbums.length > 0 ? (
            <div className='flex flex-wrap gap-10 p-5'>
              {formattedApiAlbums.map((album, index) => (
                <div
                  key={`${album.name}-${index}`}
                   className='w-[200px] min-w-[200px]'
                >
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

      {/* Today's Special */}

      <div className='mb-6'>
        <h2 className='text-3xl font-extrabold text-[#F8E5EE]'>
          Today's Special
        </h2>

        <div className='mt-2 h-1 w-12 rounded-full bg-[#9F2042]'></div>
      </div>

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

      {/* Trending */}

      <div className='mt-14 mb-6'>
        <h2 className='text-3xl font-extrabold text-[#F8E5EE]'>
          Trending
        </h2>

        <div className='mt-2 h-1 w-12 rounded-full bg-[#9F2042]'></div>
      </div>

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