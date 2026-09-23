import { useState } from 'react'

const Navbar = ({ currentView = 'home', setCurrentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
   <div className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-[#7B0D1E]/40 bg-[#211103]/85 px-4 py-3 text-[#F8E5EE] shadow-md backdrop-blur-md sm:grid sm:grid-cols-[1fr_auto_1fr] sm:px-6 lg:px-10'>
      <div 
        className='flex items-center gap-3 cursor-pointer justify-self-start'
        onClick={() => {
          if (setCurrentView) setCurrentView('home')
          setIsMobileMenuOpen(false)
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="h-12 w-12 shrink-0"
          aria-hidden="true"
        >
          <circle cx="24" cy="24" r="21" fill="#211103" stroke="#7B0D1E" strokeWidth="1.5" />
          <path d="M30.5 10.5v18.25a6.25 6.25 0 1 1-3-5.33V15l-10 2.6v15.15a6.25 6.25 0 1 1-3-5.33V15.25Z" fill="#9F2042" />
          <path d="M19 12.5c1.45-1.45 3.1-2.18 5-2.18 4.1 0 7.43 3.25 7.43 7.27 0 1.67-.7 3.33-2.1 4.96" fill="none" stroke="#F8E5EE" strokeLinecap="round" strokeWidth="1.25" opacity=".85" />
        </svg>
        <span className='font-serif font-bold text-[#F8E5EE] text-xl tracking-[0.18em]'>MAE</span>
      </div>
        <nav className='hidden items-center justify-self-center gap-8 sm:flex' aria-label="Main navigation">
            <button 
              onClick={() => {
                if (setCurrentView) setCurrentView('home')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className={`text-lg font-bold hover:text-[#9F2042] transition-colors duration-200 cursor-pointer bg-transparent border-none ${
                currentView === 'home' ? 'text-[#9F2042]' : 'text-[#F8E5EE]'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => {
                if (setCurrentView) setCurrentView('about')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className={`text-lg font-bold hover:text-[#9F2042] transition-colors duration-200 cursor-pointer bg-transparent border-none ${
                currentView === 'about' ? 'text-[#9F2042]' : 'text-[#F8E5EE]'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => {
                if (setCurrentView) setCurrentView('favorites')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className={`text-lg font-bold hover:text-[#9F2042] transition-colors duration-200 cursor-pointer bg-transparent border-none ${
                currentView === 'favorites' ? 'text-[#9F2042]' : 'text-[#F8E5EE]'
              }`}
            >
              Favorite
            </button>
        </nav>

        <div className='flex items-center justify-self-end gap-2 sm:gap-3'>
          <button
            type="button"
            onClick={() => {
                 if (setCurrentView) setCurrentView('auth')
                window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className='hidden rounded-full bg-[#9F2042] px-5 py-2 text-sm font-bold text-[#F8E5EE] shadow-sm transition-colors duration-200 hover:bg-[#7B0D1E] cursor-pointer sm:inline-flex'
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              if (setCurrentView) setCurrentView('profile')
              setIsMobileMenuOpen(false)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className={`h-9 w-9 rounded-full bg-[#3D1308] border shadow-inner flex items-center justify-center transition-colors duration-200 cursor-pointer hover:border-[#9F2042] focus:outline-none focus:ring-2 focus:ring-[#9F2042]/70 ${
              currentView === 'profile' ? 'border-[#9F2042]' : 'border-[#7B0D1E]/80'
            }`}
            aria-label="Open profile"
            aria-current={currentView === 'profile' ? 'page' : undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-none stroke-[#F8E5EE]"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="3.25" />
              <path d="M5.5 20c.65-3.3 3.1-5.25 6.5-5.25s5.85 1.95 6.5 5.25" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            className='flex h-9 w-9 items-center justify-center rounded-full border border-[#7B0D1E]/80 bg-[#3D1308] text-[#F8E5EE] transition-colors duration-200 hover:border-[#9F2042] cursor-pointer sm:hidden'
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            )}
          </button>

        </div>

        {isMobileMenuOpen && (
          <nav id="mobile-navigation" className='absolute left-4 right-4 top-full mt-2 rounded-2xl border border-[#7B0D1E]/70 bg-[#211103]/95 p-3 shadow-xl backdrop-blur-md sm:hidden' aria-label="Mobile navigation">
            <button onClick={() => { if (setCurrentView) setCurrentView('home'); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className={`block w-full rounded-xl px-4 py-3 text-left font-bold transition-colors cursor-pointer ${currentView === 'home' ? 'bg-[#3D1308] text-[#9F2042]' : 'text-[#F8E5EE] hover:bg-[#3D1308] hover:text-[#9F2042]'}`}>Home</button>
            <button onClick={() => { if (setCurrentView) setCurrentView('about'); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className={`block w-full rounded-xl px-4 py-3 text-left font-bold transition-colors cursor-pointer ${currentView === 'about' ? 'bg-[#3D1308] text-[#9F2042]' : 'text-[#F8E5EE] hover:bg-[#3D1308] hover:text-[#9F2042]'}`}>About</button>
            <button onClick={() => { if (setCurrentView) setCurrentView('favorites'); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className={`block w-full rounded-xl px-4 py-3 text-left font-bold transition-colors cursor-pointer ${currentView === 'favorites' ? 'bg-[#3D1308] text-[#9F2042]' : 'text-[#F8E5EE] hover:bg-[#3D1308] hover:text-[#9F2042]'}`}>Favorite</button>
            <button type="button" onClick={() => setIsMobileMenuOpen(false)} className='mt-2 w-full rounded-full bg-[#9F2042] px-4 py-3 font-bold text-[#F8E5EE] transition-colors hover:bg-[#7B0D1E] cursor-pointer'>Sign In</button>
          </nav>
        )}
    </div>
  )
}

export default Navbar
