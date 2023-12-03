import Client from './components/client'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'

const SettingsPage = async () => {
  const media = await prismadb.media.findMany()

  if (!media) {
    redirect('/')
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-4 md:p-8 pt-6'>
        <Client media={media} />
      </div>
    </div>
  )
}

export default SettingsPage
