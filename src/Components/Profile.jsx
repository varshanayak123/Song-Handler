import { useEffect, useState } from 'react'

const defaultProfile = {
  name: 'Varsha',
  course: 'BSc Computer Science',
  bio: 'Music lover & album explorer'
}

const Profile = ({ favorites = [] }) => {
  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem('profile')
      return savedProfile ? { ...defaultProfile, ...JSON.parse(savedProfile) } : defaultProfile
    } catch {
      return defaultProfile
    }
  })
  const [draft, setDraft] = useState(profile)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile))
  }, [profile])

  const handleSave = (event) => {
    event.preventDefault()
    setProfile({
      name: draft.name.trim() || defaultProfile.name,
      course: draft.course.trim() || defaultProfile.course,
      bio: draft.bio.trim() || defaultProfile.bio
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setDraft(profile)
    setIsEditing(false)
  }

  const inputClassName = 'w-full rounded-xl border border-[#7B0D1E]/70 bg-[#211103] px-4 py-3 text-[#F8E5EE] outline-none transition-colors placeholder:text-[#F8E5EE]/35 focus:border-[#9F2042] focus:ring-2 focus:ring-[#9F2042]/25'

  return (
    <main className="min-h-[85vh] px-6 py-12 pt-28 sm:px-8">
      <section className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-[#7B0D1E]/60 bg-[#3D1308] shadow-lg">
        <div className="border-b border-[#7B0D1E]/50 bg-[#211103]/45 px-6 py-7 sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9F2042]">Your profile</p>
          <h1 className="mt-2 text-3xl font-extrabold text-[#F8E5EE] sm:text-4xl">Music, saved your way.</h1>
        </div>

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#9F2042] bg-[#211103] shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-10 w-10 fill-none stroke-[#F8E5EE]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="8" r="3.25" />
                  <path d="M5.5 20c.65-3.3 3.1-5.25 6.5-5.25s5.85 1.95 6.5 5.25" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#F8E5EE]">{profile.name}</h2>
                <p className="mt-1 font-medium text-[#F8E5EE]/70">{profile.course}</p>
              </div>
            </div>

            {!isEditing && (
              <button type="button" onClick={() => { setDraft(profile); setIsEditing(true) }} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#9F2042] px-5 py-2.5 font-bold text-[#F8E5EE] transition-colors hover:bg-[#7B0D1E] cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" /></svg>
                Edit Profile
              </button>
            )}
          </div>

          {!isEditing ? (
            <>
              <p className="mt-8 border-l-2 border-[#9F2042] pl-4 text-lg leading-relaxed text-[#F8E5EE]/85">{profile.bio}</p>
              <div className="mt-8 rounded-2xl border border-[#7B0D1E]/60 bg-[#211103]/55 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3D1308]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-[#9F2042] stroke-[#9F2042]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                  </span>
                  <div><p className="text-2xl font-extrabold text-[#F8E5EE]">{favorites.length}</p><p className="text-sm font-medium text-[#F8E5EE]/65">Favorite {favorites.length === 1 ? 'album' : 'albums'}</p></div>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleSave} className="mt-8 space-y-5">
              <label className="block text-sm font-bold text-[#F8E5EE]"><span className="mb-2 block">Name</span><input className={inputClassName} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></label>
              <label className="block text-sm font-bold text-[#F8E5EE]"><span className="mb-2 block">Course</span><input className={inputClassName} value={draft.course} onChange={(event) => setDraft({ ...draft, course: event.target.value })} /></label>
              <label className="block text-sm font-bold text-[#F8E5EE]"><span className="mb-2 block">Bio</span><textarea className={`${inputClassName} min-h-28 resize-y`} value={draft.bio} onChange={(event) => setDraft({ ...draft, bio: event.target.value })} /></label>
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={handleCancel} className="rounded-full border border-[#7B0D1E] px-6 py-3 font-bold text-[#F8E5EE] transition-colors hover:bg-[#211103] cursor-pointer">Cancel</button>
                <button type="submit" className="rounded-full bg-[#9F2042] px-6 py-3 font-bold text-[#F8E5EE] shadow-md transition-colors hover:bg-[#7B0D1E] cursor-pointer">Save Changes</button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

export default Profile
