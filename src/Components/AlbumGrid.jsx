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
    <section className='px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12'>

      {isSearching && (
        <div className='mb-10 sm:mb-12'>

          <div className='mb-6'>
            <h2 className='text-2xl font-extrabold text-[#F8E5EE] sm:text-3xl'>
              Search Results
            </h2>

            <div className='mt-2 h-1 w-12 rounded-full bg-[#9F2042]'></div>
          </div>

          {formattedApiAlbums.length > 0 ? (
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 lg:gap-8 xl:grid-cols-6'>
              {formattedApiAlbums.map((album, index) => (
                <div
                  key={`${album.name}-${index}`}
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
          ) : (
            <p className='px-1 text-lg text-[#F8E5EE]/70 sm:px-5'>
              No albums found.
            </p>
          )}

        </div>
      )}

      {/* Today's Special */}

      <div className='mb-6'>
        <h2 className='text-2xl font-extrabold text-[#F8E5EE] sm:text-3xl'>
          Today's Special
        </h2>

        <div className='mt-2 h-1 w-12 rounded-full bg-[#9F2042]'></div>
      </div>

      <div className='flex gap-4 overflow-x-auto px-1 pb-3 pt-2 sm:gap-6 sm:px-3 lg:gap-10 lg:p-5'>

        {formattedSpecialAlbums.map((album, index) => (
          <div key={`${album.name}-${index}`} className='min-w-[160px] sm:min-w-[180px] lg:min-w-[200px]'>

            <AlbumCard
              album={album}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />

          </div>
        ))}

      </div>

      {/* Trending */}

      <div className='mb-6 mt-10 sm:mt-14'>
        <h2 className='text-2xl font-extrabold text-[#F8E5EE] sm:text-3xl'>
          Trending
        </h2>

        <div className='mt-2 h-1 w-12 rounded-full bg-[#9F2042]'></div>
      </div>

      <div className='flex gap-4 overflow-x-auto px-1 pb-3 pt-2 sm:gap-6 sm:px-3 lg:gap-10 lg:p-5'>

        {formattedTrendingAlbums.map((album, index) => (
          <div key={`${album.name}-${index}`} className='min-w-[160px] sm:min-w-[180px] lg:min-w-[200px]'>

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
