export default function Content({
  id,
  title,
  description,
  button,
  image1,
  image2,
  image3,
  image4,
}: any) {
  return (
    <div className="w-full py-40 @container" id={id}>
      <div className="mx-auto max-w-7xl px-6 @lg:flex @lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 @lg:mx-0 @lg:min-w-full @lg:max-w-none @lg:flex-none @lg:gap-y-8">
          <div className="@lg:col-end-1 @lg:w-full @lg:max-w-lg @lg:pb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 @sm:text-4xl">
              {title}
            </h2>
            <p className="my-6 whitespace-pre-line text-xl leading-8 text-gray-600">
              {description}
            </p>
            {!!button && (
              <a
                href={button.href}
                className="rounded-md bg-slate-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                {button.title} <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
          <div className="flex flex-wrap items-start justify-end gap-6 @sm:gap-8 @lg:contents">
            <div className="w-0 flex-auto @lg:ml-auto @lg:w-auto @lg:flex-none @lg:self-end">
              <img
                src={image1}
                alt={title}
                className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
              />
            </div>
            <div className="contents @lg:col-span-2 @lg:col-end-2 @lg:ml-auto @lg:flex @lg:w-[37rem] @lg:items-start @lg:justify-end @lg:gap-x-8">
              <div className="order-first flex w-64 flex-none justify-end self-end @lg:w-auto">
                <img
                  src={image2}
                  alt={title}
                  className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                />
              </div>
              <div className="flex w-96 flex-auto justify-end @lg:w-auto @lg:flex-none">
                <img
                  src={image3}
                  alt={title}
                  className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                />
              </div>
              <div className="hidden @sm:block @sm:w-0 @sm:flex-auto @lg:w-auto @lg:flex-none">
                <img
                  src={image4}
                  alt={title}
                  className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
