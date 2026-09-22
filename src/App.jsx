import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import AlbumGrid from './Components/AlbumGrid'
import Favorites from './Components/Favorites'
import About from './Components/About'
import Profile from './Components/Profile'
import { searchAlbums } from './Services/itunesApi'

const App = () => {

const [currentView, setCurrentView] = useState('home')
const [search, setSearch] = useState('')
const [apiAlbums, setApiAlbums] = useState([])
const [trendingAlbums, setTrendingAlbums] = useState([])
const [specialAlbums, setSpecialAlbums] = useState([])

const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem('favorites')
  return saved ? JSON.parse(saved) : []
})

useEffect(() => {

  const loadSpecialAlbums = async () => {

    const artists = [
      'Jungkook',
      'Billie Eilish',
      'Sabrina Carpenter',
      'Ed Sheeran'
    ]

    const allAlbums = []

    for (const artist of artists) {
      const results = await searchAlbums(artist)

      allAlbums.push(...results.slice(0, 2))
    }

    setSpecialAlbums(allAlbums)
  }

  loadSpecialAlbums()

}, [])

useEffect(() => {

  const loadTrendingAlbums = async () => {

    const artists = [
      'Taylor Swift',
      'The Weeknd',
      'Ariana Grande',
      'Dua Lipa'
    ]

    const allAlbums = []

    for (const artist of artists) {
      const results = await searchAlbums(artist)

      allAlbums.push(...results.slice(0, 3))
    }

    setTrendingAlbums(allAlbums)
  }

  loadTrendingAlbums()

}, [])

  const handleSearch = async (artist) => {
    if (typeof artist !== 'string') return

    setSearch(artist)

    if (artist.trim() === '') {
      setApiAlbums([])
      return
    }

    try {
      const results = await searchAlbums(artist)
      setApiAlbums(results || [])
    } catch (error) {
      console.error('Error fetching albums:', error)
      setApiAlbums([])
    }
  }

  const toggleFavorite = (album) => {
  setFavorites((prev) => {

    const exists = prev.some(
      (fav) => fav.id === album.id
    )

    if (exists) {
      return prev.filter(
        (fav) => fav.id !== album.id
      )
    }

    return [...prev, album]
  })
}

useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}, [favorites])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#211103] via-[#211103] to-[#3D1308] text-[#F8E5EE]">

      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {currentView === 'home' && (
        <>
          <Hero setSearch={handleSearch} />

          <AlbumGrid 
            search={search} 
            apiAlbums={apiAlbums} 
            specialAlbums={specialAlbums} 
            trendingAlbums={trendingAlbums}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </>
      )}

      {currentView === 'favorites' && (
        <Favorites 
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onExploreMusic={() => {
            setCurrentView('home')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      )}

      {currentView === 'about' && (
        <About 
          onExploreMusic={() => {
            setCurrentView('home')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      )}

      {currentView === 'profile' && (
        <Profile favorites={favorites} />
      )}

    </div>
  )
}

export default App
