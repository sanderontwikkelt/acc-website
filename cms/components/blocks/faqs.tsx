export default function Faqs({ title, description, faqs, id, style }: any) {
  return (
    <div className='bg-white @container' id={id} style={style}>
      <div className='mx-auto max-w-7xl px-6 py-16 @sm:py-24 @lg:px-8'>
        <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>
          {title}
        </h2>
        <p className='mt-6 max-w-2xl text-base leading-7 text-gray-600'>
          {description}
        </p>
        <div className='mt-20'>
          <dl className='space-y-16 @sm:grid @sm:grid-cols-2 @sm:gap-x-6 @sm:gap-y-16 @sm:space-y-0 @lg:grid-cols-3 @lg:gap-x-10'>
            {faqs.map(
              (faq: { title: string; description: string }, i: number) => (
                <div key={i}>
                  <dt className='text-base font-semibold leading-7 text-gray-900'>
                    {faq.title}
                  </dt>
                  <dd className='mt-2 text-base leading-7 text-gray-600'>
                    {faq.description}
                  </dd>
                </div>
              )
            )}
          </dl>
        </div>
      </div>
    </div>
  )
}
