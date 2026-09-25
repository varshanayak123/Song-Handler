import { useState } from 'react'
import { supabase } from '../../lib/song-handler/supabaseClient'

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setMessage('')

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      })

      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Account created! Check your email to verify your account.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Signed in successfully!')
      }
    }

    setLoading(false)
  }

  const handleOAuthSignIn = async (provider) => {
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4 pt-24 pb-10'>
      <div className='w-full max-w-md rounded-3xl border border-[#7B0D1E]/50 bg-[#3D1308] p-6 shadow-2xl sm:p-8'>

        <h1 className='text-3xl font-extrabold text-[#F8E5EE]'>
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h1>

        <p className='mt-2 text-sm text-[#F8E5EE]/70'>
          {isSignUp
            ? 'Create your Song-Handler account.'
            : 'Sign in to continue to Song-Handler.'}
        </p>

        <form onSubmit={handleSubmit} className='mt-6 space-y-4'>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#F8E5EE]'>
              Email
            </label>

            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              required
              className='w-full rounded-xl border border-[#7B0D1E]/60 bg-[#211103] px-4 py-3 text-[#F8E5EE] outline-none placeholder:text-[#F8E5EE]/40 focus:border-[#9F2042]'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#F8E5EE]'>
              Password
            </label>

            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              required
              minLength={6}
              className='w-full rounded-xl border border-[#7B0D1E]/60 bg-[#211103] px-4 py-3 text-[#F8E5EE] outline-none placeholder:text-[#F8E5EE]/40 focus:border-[#9F2042]'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-xl bg-[#9F2042] py-3 font-bold text-[#F8E5EE] transition-colors hover:bg-[#7B0D1E] disabled:cursor-not-allowed disabled:opacity-60'
          >
            {loading
              ? 'Please wait...'
              : isSignUp
                ? 'Create Account'
                : 'Sign In'}
          </button>

        </form>

        <div className='mt-6 flex items-center gap-3'>
          <span className='h-px flex-1 bg-[#7B0D1E]/60' />
          <span className='text-xs font-medium uppercase tracking-widest text-[#F8E5EE]/50'>
            or continue with
          </span>
          <span className='h-px flex-1 bg-[#7B0D1E]/60' />
        </div>

        <div className='mt-4 space-y-3'>
          <button
            type='button'
            onClick={() => handleOAuthSignIn('google')}
            disabled={loading}
            className='flex w-full items-center justify-center gap-3 rounded-xl border border-[#7B0D1E]/60 bg-[#211103] py-3 font-bold text-[#F8E5EE] transition-colors hover:border-[#9F2042] hover:bg-[#3D1308] disabled:cursor-not-allowed disabled:opacity-60'
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-5 w-5' aria-hidden='true'>
              <path fill='#4285F4' d='M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z'/>
              <path fill='#34A853' d='M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24Z'/>
              <path fill='#FBBC05' d='M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09Z'/>
              <path fill='#EA4335' d='M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z'/>
            </svg>
            Continue with Google
          </button>

          <button
            type='button'
            onClick={() => handleOAuthSignIn('github')}
            disabled={loading}
            className='flex w-full items-center justify-center gap-3 rounded-xl border border-[#7B0D1E]/60 bg-[#211103] py-3 font-bold text-[#F8E5EE] transition-colors hover:border-[#9F2042] hover:bg-[#3D1308] disabled:cursor-not-allowed disabled:opacity-60'
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-5 w-5 fill-[#F8E5EE]' aria-hidden='true'>
              <path d='M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z'/>
            </svg>
            Continue with GitHub
          </button>
        </div>

        {message && (
          <p className='mt-4 text-center text-sm text-[#F8E5EE]/80'>
            {message}
          </p>
        )}

        <div className='mt-6 text-center'>
          <button
            type='button'
            onClick={() => {
              setIsSignUp(!isSignUp)
              setMessage('')
            }}
            className='text-sm font-medium text-[#F8E5EE]/70 hover:text-[#9F2042]'
          >
            {isSignUp
              ? 'Already have an account? Sign In'
              : "Don't have an account? Sign Up"}
          </button>
        </div>

      </div>
    </div>
  )
}

export default Auth