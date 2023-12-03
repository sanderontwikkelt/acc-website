'use server'

export const revalidateClientTag = async (tag = 'index') => {
  const body = new FormData()
  body.append('token', process.env.API_TOKEN || '')
  body.append('tag', tag)

  try {
    await fetch(process.env.NEXT_PUBLIC_FRONT_URL + '/api/revalidate', {
      method: 'POST',
      body: JSON.stringify({ token: process.env.API_TOKEN || '', tag }),
      cache: 'no-cache',
    })
  } catch (e) {
    console.log(e)
  }
}
