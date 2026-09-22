import React from 'react'


const Navbar = ({ currentView = 'home', setCurrentView }) => {
  return (
   <div className='fixed top-0 left-0 right-0 z-50 flex py-3.5 px-10 justify-between items-center backdrop-blur-md bg-[#211103]/85 border-b border-[#7B0D1E]/40 text-[#F8E5EE] shadow-md'>
      <div 
        className='flex items-center gap-3 cursor-pointer'
        onClick={() => setCurrentView && setCurrentView('home')}
      >
        <img className='h-12 w-12 rounded-full object-cover border border-[#7B0D1E]/60' src="/src/Images/Music-Logo.jpg" alt="" />
        <span className='font-bold text-[#F8E5EE] text-lg tracking-wide'>Mae</span>
      </div>
        <div className='flex gap-8 items-center'>
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
          <div className="h-9 w-9 rounded-full bg-[#3D1308] border border-[#7B0D1E]/80 shadow-inner"></div>

        </div>
    </div>
  )
}

export default Navbar