'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import CardWrapper from '@/components/auth/card-wrapper'
import { FormSuccess } from '@/components/auth/form-success'
import { FormError } from '@/components/auth/form-error'
import { newVerification } from '@/app/action/new-verification'

const VerifyEmailForm = () => {
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const onSubmit = useCallback(() => {
    if (success || error) {
      return
    }

    if (!token) {
      setError('No token provided')
      return
    }

    newVerification(token)
      .then((data) => {
        if (data.success) {
          setSuccess(data.success)
        }
        if (data.error) {
          setError(data.error)
        }
      })
      .catch((error) => {
        console.error(error)
        setError('An unexpected error occurred')
      })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [])

  return (
    <div className='lg:flex lg:h-screen lg:justify-center lg:items-center lg:mx-28 mx-3 h-screen flex justify-center items-center'>
      <CardWrapper
        headerLabel="Confirming your email address"
        title="Confirming now..."
        backButtonHref="/"
        backButtonLabel="Back to login"
      >
        <div className="flex items-center w-full justify-center">
          {!success && !error && <p>Loading</p>}
          <FormSuccess message={success} />
          {!success && <FormError message={error} />}
        </div>
      </CardWrapper>
    </div>
  )
}

export default VerifyEmailForm
