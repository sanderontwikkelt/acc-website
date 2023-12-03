import { SettingsForm } from './components/settings-form'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'

const SettingsPage = async () => {
  const settings = await prismadb.settings.findFirst()

  if (!settings) {
    redirect('/')
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-4 md:p-8 pt-6'>
        <SettingsForm initialData={settings} />
      </div>
    </div>
  )
}

export default SettingsPage
