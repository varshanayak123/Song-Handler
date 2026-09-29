import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setMessage('')

    if (isSignUp) {
      const trimmedName = name.trim()

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            full_name: trimmedName,
          },
        },
      })

      if (error) {
        setMessage(error.message)
      } else {
        // Remember the name until the user verifies
        // their email and logs in for the first time.
        localStorage.setItem('pendingProfileName', trimmedName)

        setMessage(
          'Account created! Check your email to verify your account.'
        )
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

  const handleOAuthLogin = async (provider) => {
    setMessage('')

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    })

    if (error) {
      setMessage(error.message)
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

          {/* Name - only for Sign Up */}
          {isSignUp && (
            <div>
              <label className='mb-2 block text-sm font-medium text-[#F8E5EE]'>
                Name
              </label>

              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter your name'
                required
                className='w-full rounded-xl border border-[#7B0D1E]/60 bg-[#211103] px-4 py-3 text-[#F8E5EE] outline-none placeholder:text-[#F8E5EE]/40 focus:border-[#9F2042]'
              />
            </div>
          )}

          {/* Email */}
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

          {/* Password */}
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

          {/* Submit */}
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

        {/* OAuth Buttons */}
        <div className='mt-6'>

          <div className='flex items-center gap-3'>
            <div className='h-px flex-1 bg-[#F8E5EE]/20'></div>

            <span className='text-xs text-[#F8E5EE]/50'>
              OR
            </span>

            <div className='h-px flex-1 bg-[#F8E5EE]/20'></div>
          </div>

          <div className='mt-5 space-y-3'>

            {/* Google */}
            <button
              type='button'
              onClick={() => handleOAuthLogin('google')}
              className='flex w-full items-center justify-center gap-3 rounded-xl border border-[#F8E5EE]/20 bg-[#211103] py-3 font-medium text-[#F8E5EE] transition-colors hover:bg-[#2d1809]'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M21.805 12.23c0-.79-.065-1.55-.205-2.28H12v4.315h5.5a4.7 4.7 0 0 1-2.04 3.085v2.565h3.3c1.93-1.775 3.045-4.39 3.045-7.685Z'
                  fill='#4285F4'
                />

                <path
                  d='M12 22c2.76 0 5.075-.915 6.76-2.485l-3.3-2.565c-.915.615-2.08.98-3.46.98-2.66 0-4.91-1.795-5.715-4.205H2.875v2.65A10.21 10.21 0 0 0 12 22Z'
                  fill='#34A853'
                />

                <path
                  d='M6.285 13.725A6.14 6.14 0 0 1 5.965 12c0-.6.11-1.185.32-1.725v-2.65H2.875A10.02 10.02 0 0 0 1.8 12c0 1.615.39 3.14 1.075 4.375l3.41-2.65Z'
                  fill='#FBBC05'
                />

                <path
                  d='M12 6.07c1.5 0 2.845.515 3.905 1.525l2.93-2.93C17.07 3.05 14.76 2 12 2a10.21 10.21 0 0 0-9.125 5.625l3.41 2.65C7.09 7.865 9.34 6.07 12 6.07Z'
                  fill='#EA4335'
                />
              </svg>

              Continue with Google
            </button>

            {/* GitHub */}
            <button
              type='button'
              onClick={() => handleOAuthLogin('github')}
              className='flex w-full items-center justify-center gap-3 rounded-xl border border-[#F8E5EE]/20 bg-[#211103] py-3 font-medium text-[#F8E5EE] transition-colors hover:bg-[#2d1809]'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.84 9.49.5.09.68-.215.68-.477 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.09-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.56 9.56 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.91-1.294 2.748-1.025 2.748-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .265.18.572.688.475A10.003 10.003 0 0 0 22 12c0-5.523-4.477-10-10-10Z' />
              </svg>

              Continue with GitHub
            </button>

          </div>
        </div>

        {/* Message */}
        {message && (
          <p className='mt-4 text-center text-sm text-[#F8E5EE]/80'>
            {message}
          </p>
        )}

        {/* Toggle */}
        <div className='mt-6 text-center'>
          <button
            type='button'
            onClick={() => {
              setIsSignUp(!isSignUp)
              setMessage('')
              setName('')
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