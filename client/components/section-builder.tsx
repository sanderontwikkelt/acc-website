'use client'

const SectionBuilder = ({ id, label }: { id: string; label: string }) => {
  const postMessage = (action: 'EDIT' | 'UP' | 'DOWN') => {
    parent.postMessage({ id, action }, '*')
  }

  return (
    <div className='sticky top-32 z-[9999] h-0 opacity-0 transition group-hover/client:opacity-100'>
      <div className='absolute left-1/2 top-10 z-[99999] flex -translate-x-1/2 items-center space-x-2 rounded-full border border-gray-400 bg-black px-3 py-2 text-white'>
        <button
          className='flex items-center space-x-2'
          onClick={() => postMessage('EDIT')}
        >
          <p className='text-sm'>{label} aanpassen</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16px'
            height='100%'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-file-signature'
          >
            <path d='M20 19.5v.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8.5L18 5.5' />
            <path d='M8 18h1' />
            <path d='M18.42 9.61a2.1 2.1 0 1 1 2.97 2.97L16.95 17 13 18l.99-3.95 4.43-4.44Z' />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SectionBuilder
