import { HeaderForm } from './components/header-form'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'

const HeaderPage = async () => {
  const header = await prismadb.header.findFirst()

  if (!header) {
    redirect('/')
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-4 md:p-8 pt-6'>
        <HeaderForm initialData={header} />
      </div>
    </div>
  )
}

export default HeaderPage
