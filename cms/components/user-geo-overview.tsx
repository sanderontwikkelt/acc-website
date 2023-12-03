type Data = {
  country: string
  city: string
  userCount: number
}

export function UserGeoOverview({ data }: { data: Data[] }) {
  return (
    <div className='space-y-8'>
      {data.map(({ country, city, userCount }, i: number) => (
        <div className='flex items-center w-full' key={i}>
          <div className='space-y-1 w-[calc(100%-1rem)] pr-4'>
            <p className='text-sm font-medium leading-none truncate max-w-[calc(100%)]'>
              {city}
            </p>
            <p className='text-sm text-muted-foreground truncate max-w-[calc(100%)]'>
              {country}
            </p>
          </div>
          <div className='ml-auto font-medium'>{userCount}</div>
        </div>
      ))}
    </div>
  )
}
