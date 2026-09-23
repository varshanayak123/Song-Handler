import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import AlbumGrid from './Components/AlbumGrid'
import Favorites from './Components/Favorites'
import About from './Components/About'
import Profile from './Components/Profile'
import { searchAlbums } from './Services/itunesApi'
import Auth from './Components/Auth'

const App = () => {

  const [user, setUser] = useState(null)
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
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
  })

    const {
    data: { subscription },
} = supabase.auth.onAuthStateChange((event, session) => {
     setUser(session?.user ?? null)

  if (event === 'SIGNED_IN') {
    setCurrentView('home')
  }
})

  return () => {
      subscription.unsubscribe()
  }
  }, [])

  // Today's Special
  useEffect(() => {

    const loadSpecialAlbums = async () => {

      const artists = [
        'Jungkook',
        'Billie Eilish',
        'Sabrina Carpenter',
        'Ed Sheeran',
        'Ariana Grande',
        'Dua Lipa',
        'Taylor Swift',
        'The Weeknd'
      ]

      const shuffledArtists = [...artists].sort(
        () => Math.random() - 0.5
      )

      const selectedArtists = shuffledArtists.slice(0, 4)

      const allAlbums = []

      for (const artist of selectedArtists) {

        const results = await searchAlbums(artist)

        const shuffledAlbums = [...results].sort(
          () => Math.random() - 0.5
        )

        allAlbums.push(...shuffledAlbums.slice(0, 2))
      }

      setSpecialAlbums(allAlbums)
    }

    loadSpecialAlbums()

  }, [])


  // Trending
  useEffect(() => {

    const loadTrendingAlbums = async () => {

      const artists = [
        'Taylor Swift',
        'The Weeknd',
        'Ariana Grande',
        'Dua Lipa',
        'Jungkook',
        'Billie Eilish',
        'Sabrina Carpenter',
        'Ed Sheeran'
      ]

      const shuffledArtists = [...artists].sort(
        () => Math.random() - 0.5
      )

      const selectedArtists = shuffledArtists.slice(0, 4)

      const allAlbums = []

      for (const artist of selectedArtists) {

        const results = await searchAlbums(artist)

        const shuffledAlbums = [...results].sort(
          () => Math.random() - 0.5
        )

        allAlbums.push(...shuffledAlbums.slice(0, 3))
      }

      setTrendingAlbums(allAlbums)
    }

    loadTrendingAlbums()

  }, [])


  // Search
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


  // Favorites
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


  // Save favorites to localStorage
  useEffect(() => {

    localStorage.setItem(
      'favorites',
      JSON.stringify(favorites)
    )

  }, [favorites])


  return (

    <div className="app-shell min-h-screen overflow-x-clip text-[#F8E5EE]">

      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
      />


      {/* HOME */}

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


      {/* FAVORITES */}

      {currentView === 'favorites' && (

        <Favorites
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onExploreMusic={() => {

            setCurrentView('home')

            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })

          }}
        />

      )}


      {/* ABOUT */}

      {currentView === 'about' && (

        <About
          onExploreMusic={() => {

            setCurrentView('home')

            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })

          }}
        />

      )}


      {/* PROFILE */}

      {currentView === 'profile' && (

        <Profile
          favorites={favorites}
        />

      )}

      {currentView === 'auth' && (
         <Auth />
      )}

    </div>

  )
}

export default App
