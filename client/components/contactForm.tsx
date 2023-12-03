'use client'

import React, { useState } from 'react'
import { Input } from './input'
import Upload from './upload'
import AnimatedCheck from './animated-check'
import SubmitButton from './submit-button'
import { Textarea } from './textarea'
import { sendEmail } from '@/lib/sendEmail'

const ContactForm = ({
  inputFirstName,
  inputLastName,
  inputEmail,
  inputPhoneNumber,
  inputMessage,
  inputUpload,
  button,
  successMessage,
}: {
  inputFirstName: string
  inputLastName: string
  inputEmail: string
  inputPhoneNumber: string
  inputMessage: string
  inputUpload: string
  button: string
  successMessage: string
}) => {
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = async () => {
    setSubmitted(true)
  }

  return submitted ? (
    <div className='flex flex-col items-center justify-center space-y-4 rounded-[0.625rem] bg-primary/20 p-5 text-center text-2xl'>
      <p className='mb-0'>{successMessage}</p>
      <AnimatedCheck />
    </div>
  ) : (
    <div>
      <form
        action={sendEmail}
        onSubmit={onSubmit}
        id='contact-form'
        className='grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2'
      >
        <Input name='firstName' placeholder={inputFirstName} />
        <Input name='lastName' placeholder={inputLastName} />
        <Input name='email' required placeholder={inputEmail} />
        <Input name='phoneNumber' required placeholder={inputPhoneNumber} />
        <Textarea
          className='md:col-span-2'
          name='message'
          required
          placeholder={inputMessage}
        />
        <div className='md:col-span-2'>
          <label
            className='text-md mb-5 mt-10 font-bold md:mt-20'
            htmlFor='upload'
          >
            {inputUpload}
          </label>
          <Upload id='upload' name='upload' />
        </div>
        <SubmitButton title={button} />
      </form>
    </div>
  )
}

export default ContactForm
