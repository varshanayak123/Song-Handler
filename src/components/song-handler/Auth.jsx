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