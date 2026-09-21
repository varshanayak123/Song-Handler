import React, { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import AlbumGrid from './Components/AlbumGrid'
import { searchAlbums } from './Services/itunesApi'

const App = () => {

const [search, setSearch] = useState('')
const [apiAlbums, setApiAlbums] = useState([])
const [trendingAlbums, setTrendingAlbums] = useState([])
const [specialAlbums, setSpecialAlbums] = useState([])

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
    setSearch(artist)

    if (artist.trim() === '') {
      setApiAlbums([])
      return
    }

    const results = await searchAlbums(artist)

    setApiAlbums(results)
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://i.pinimg.com/736x/f8/e8/17/f8e817b3a5b4c282010d85555a37f554.jpg')" }}
    >

      <Navbar />

      <Hero setSearch={handleSearch} />

      <AlbumGrid
        search={search}
        apiAlbums={apiAlbums}
        specialAlbums={specialAlbums}
        trendingAlbums={trendingAlbums}
      />

    </div>
  )
}

export default App