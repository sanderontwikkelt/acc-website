'use server'

import { API_URL } from './constants'

export const sendEmail = async (formData: FormData) => {
  formData.append('token', process.env.API_TOKEN || '')
  try {
    await fetch(API_URL + '/api/email/contact', {
      method: 'POST',
      body: formData,
      cache: 'no-cache',
    })
  } catch (e) {
    console.log(e)
  }
}
