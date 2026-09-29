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
  const [favorites, setFavorites] = useState([])

  // ---------------- AUTH ----------------
  useEffect(() => {
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setUser(session?.user ?? null)
    }

    getInitialSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)

      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        setCurrentView('home')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // ---------------- FAVORITES ----------------
  // Favorites are stored separately for each logged-in user.
  useEffect(() => {
    if (!user) {
      setFavorites([])
      return
    }

    const favoritesKey = `favorites_${user.id}`
    const saved = localStorage.getItem(favoritesKey)

    try {
      setFavorites(saved ? JSON.parse(saved) : [])
    } catch {
      setFavorites([])
    }
  }, [user])

  useEffect(() => {
    if (!user) return

    const favoritesKey = `favorites_${user.id}`

    localStorage.setItem(
      favoritesKey,
      JSON.stringify(favorites)
    )
  }, [favorites, user])

  // ---------------- TODAY'S SPECIAL ----------------
  useEffect(() => {
    let isMounted = true

    const loadSpecialAlbums = async () => {
      const artists = [
        'Jungkook',
        'Billie Eilish',
        'Sabrina Carpenter',
        'Ed Sheeran',
        'Ariana Grande',
        'Dua Lipa',
        'Taylor Swift',
        'The Weeknd',
      ]

      const shuffledArtists = [...artists].sort(
        () => Math.random() - 0.5
      )

      // Use all artists so we get more cards for horizontal scrolling
      const selectedArtists = shuffledArtists

      const results = await Promise.allSettled(
        selectedArtists.map((artist) => searchAlbums(artist))
      )

      const allAlbums = []

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          const albums = [...result.value].sort(
            () => Math.random() - 0.5
          )

          // Get up to 3 albums from each artist
          allAlbums.push(...albums.slice(0, 3))
        }
      })

      if (isMounted) {
        setSpecialAlbums(allAlbums)
      }
    }

    loadSpecialAlbums()

    return () => {
      isMounted = false
    }
  }, [])

  // ---------------- TRENDING ----------------
  useEffect(() => {
    let isMounted = true

    const loadTrendingAlbums = async () => {
      const artists = [
        'Taylor Swift',
        'The Weeknd',
        'Ariana Grande',
        'Dua Lipa',
        'Jungkook',
        'Billie Eilish',
        'Sabrina Carpenter',
        'Ed Sheeran',
      ]

      const shuffledArtists = [...artists].sort(
        () => Math.random() - 0.5
      )

      const selectedArtists = shuffledArtists.slice(0, 4)

      const results = await Promise.allSettled(
        selectedArtists.map((artist) => searchAlbums(artist))
      )

      const allAlbums = []

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          const albums = [...result.value].sort(
            () => Math.random() - 0.5
          )

          allAlbums.push(...albums.slice(0, 3))
        }
      })

      if (isMounted) {
        setTrendingAlbums(allAlbums)
      }
    }

    loadTrendingAlbums()

    return () => {
      isMounted = false
    }
  }, [])

  // ---------------- SEARCH ----------------
  const handleSearch = async (artist) => {
    if (typeof artist !== 'string') return

    const trimmedArtist = artist.trim()

    setSearch(artist)

    if (!trimmedArtist) {
      setApiAlbums([])
      return
    }

    try {
      const results = await searchAlbums(trimmedArtist)
      setApiAlbums(results)
    } catch {
      setApiAlbums([])
    }
  }

  // ---------------- FAVORITE TOGGLE ----------------
  const toggleFavorite = (album) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (favorite) => favorite.id === album.id
      )

      if (exists) {
        return prev.filter(
          (favorite) => favorite.id !== album.id
        )
      }

      return [...prev, album]
    })
  }

  // ---------------- HOME ----------------
  const goHome = () => {
    setCurrentView('home')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="app-shell min-h-screen overflow-x-clip text-[#F8E5EE]">

      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
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
          onExploreMusic={goHome}
        />
      )}

      {/* ABOUT */}
      {currentView === 'about' && (
        <About
          onExploreMusic={goHome}
        />
      )}

      {/* PROFILE */}
      {currentView === 'profile' && (
        <Profile
          favorites={favorites}
        />
      )}

      {/* AUTH */}
      {currentView === 'auth' && <Auth />}

    </div>
  )
}

export default App