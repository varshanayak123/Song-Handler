import { useState } from 'react'
import AlbumCard from './AlbumCard'

const SectionHeader = ({ title, isExpanded, onToggle }) => (
  <div className='mb-4 flex items-center justify-between gap-4 sm:mb-5'>
    <div className='min-w-0'>
      <h2 className='truncate text-2xl font-extrabold text-[#F8E5EE] sm:text-3xl'>{title}</h2>
      <div className='mt-2 h-1 w-12 rounded-full bg-[#9F2042]'></div>
    </div>
    <button type='button' onClick={onToggle} className='flex shrink-0 items-center gap-1 border-0 bg-transparent p-0 text-xs font-semibold text-[#F8E5EE]/70 transition-colors duration-200 hover:text-[#F8E5EE] cursor-pointer sm:text-sm' aria-label={isExpanded ? `Return to ${title} carousel` : `See all ${title} albums`}>
      {isExpanded ? 'Back' : 'See all'}
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-3.5 w-3.5' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        {isExpanded ? <path d='m15 18-6-6 6-6' /> : <path d='m9 18 6-6-6-6' />}
      </svg>
    </button>
  </div>
)

const AlbumSection = ({ title, albums, expanded, onToggle, favorites, toggleFavorite, className = '' }) => (
  <div className={className}>
    <SectionHeader title={title} isExpanded={expanded} onToggle={onToggle} />
    {expanded ? (
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
        {albums.map((album, index) => <div key={`${album.name}-${index}`} className='min-w-0'><AlbumCard album={album} favorites={favorites} toggleFavorite={toggleFavorite} /></div>)}
      </div>
    ) : (
      <div className='flex gap-3 overflow-x-auto px-1 pb-3 pt-1 sm:gap-4 sm:px-2 lg:gap-5'>
        {albums.map((album, index) => <div key={`${album.name}-${index}`} className='w-[125px] shrink-0 sm:w-[140px] lg:w-[150px]'><AlbumCard album={album} favorites={favorites} toggleFavorite={toggleFavorite} /></div>)}
      </div>
    )}
  </div>
)

const AlbumGrid = ({ search, apiAlbums = [], specialAlbums = [], trendingAlbums = [], favorites = [], toggleFavorite }) => {
  const [expandedSection, setExpandedSection] = useState(null)
  const formatAlbums = (albums) => albums.map((album) => ({
    id: album.collectionId || album.id || `${album.collectionName}-${album.artistName}`,
    name: album.collectionName,
    artist: album.artistName,
    date: album.releaseDate?.slice(0, 4),
    image: album.artworkUrl100?.replace('100x100', '600x600'),
    albumUrl: album.collectionViewUrl
  }))
  const formattedApiAlbums = formatAlbums(apiAlbums)
  const formattedSpecialAlbums = formatAlbums(specialAlbums)
  const formattedTrendingAlbums = formatAlbums(trendingAlbums)
  const isSearching = typeof search === 'string' && search.trim() !== ''

  return (
    <section className='px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12'>
      {isSearching && (
        <div className='mb-10 sm:mb-12'>
          <div className='mb-6'>
            <h2 className='text-2xl font-extrabold text-[#F8E5EE] sm:text-3xl'>Search Results</h2>
            <div className='mt-2 h-1 w-12 rounded-full bg-[#9F2042]'></div>
          </div>
          {formattedApiAlbums.length > 0 ? (
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 lg:gap-8 xl:grid-cols-6'>
              {formattedApiAlbums.map((album, index) => <div key={`${album.name}-${index}`} className='min-w-0'><AlbumCard album={album} favorites={favorites} toggleFavorite={toggleFavorite} /></div>)}
            </div>
          ) : <p className='px-1 text-lg text-[#F8E5EE]/70 sm:px-5'>No albums found.</p>}
        </div>
      )}

      <AlbumSection title="Today's Special" albums={formattedSpecialAlbums} expanded={expandedSection === 'special'} onToggle={() => setExpandedSection(expandedSection === 'special' ? null : 'special')} favorites={favorites} toggleFavorite={toggleFavorite} />
      <AlbumSection title='Trending' albums={formattedTrendingAlbums} expanded={expandedSection === 'trending'} onToggle={() => setExpandedSection(expandedSection === 'trending' ? null : 'trending')} favorites={favorites} toggleFavorite={toggleFavorite} className='mt-10 sm:mt-14' />
    </section>
  )
}

export default AlbumGrid
