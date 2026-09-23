const AlbumCard = ({ album, favorites, toggleFavorite }) => {
  const isFavorite = favorites.some((fav) => fav.id === album.id)

  return (
    <div className='group mx-auto w-full max-w-[150px] overflow-hidden rounded-lg border border-[#7B0D1E]/40 bg-[#3D1308] shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-[#9F2042]/80 hover:shadow-lg'>
      <div className='relative'>
        <img src={album.image} alt={album.name} className='aspect-square w-full object-cover' />
        <button onClick={() => toggleFavorite(album)} className='absolute right-2 top-2 rounded-full border border-[#7B0D1E]/40 bg-[#211103]/80 p-1.5 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-[#9F2042] cursor-pointer' aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className={`h-4 w-4 transition-colors duration-200 ${isFavorite ? 'fill-[#9F2042] stroke-[#9F2042]' : 'fill-transparent stroke-[#F8E5EE] hover:stroke-[#9F2042]'}`} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
          </svg>
        </button>
      </div>
      <div className='p-2.5 sm:p-3'>
        <h2 className='truncate text-sm font-bold text-[#F8E5EE]'>{album.name}</h2>
        <p className='mt-0.5 truncate text-xs font-medium text-[#F8E5EE]/75'>{album.artist}</p>
        <p className='mt-0.5 text-xs text-[#F8E5EE]/60'>{album.date}</p>
        <button onClick={() => window.open(album.albumUrl, '_blank')} className='mt-2 w-full rounded-md bg-[#9F2042] py-1.5 text-xs font-bold text-[#F8E5EE] shadow-sm transition-colors duration-200 cursor-pointer hover:bg-[#7B0D1E]'>
          Open Album
        </button>
      </div>
    </div>
  )
}

export default AlbumCard
