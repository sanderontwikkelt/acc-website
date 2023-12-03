import { FooterForm } from './components/footer-form'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'

const FooterPage = async () => {
  const footer = await prismadb.footer.findFirst()

  if (!footer) {
    redirect('/')
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-4 md:p-8 pt-6'>
        <FooterForm initialData={footer} />
      </div>
    </div>
  )
}

export default FooterPage
