import { AdminSideBar } from '@/components/sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex h-full w-screen'>
      <AdminSideBar />
      <div className='max-h-full flex-grow overflow-auto bg-gray-100 dark:bg-opacity-[0.02]'>
        {children}
      </div>
    </div>
  )
}
