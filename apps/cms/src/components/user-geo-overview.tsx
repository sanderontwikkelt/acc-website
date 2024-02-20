interface Data {
  country: string;
  city: string;
  userCount: number;
}

export function UserGeoOverview({ data }: { data: Data[] }) {
  return (
    <div className="space-y-8">
      {data.map(({ country, city, userCount }, i: number) => (
        <div className="flex w-full items-center" key={i}>
          <div className="w-[calc(100%-1rem)] space-y-1 pr-4">
            <p className="max-w-[calc(100%)] truncate text-sm font-medium leading-none">
              {city}
            </p>
            <p className="max-w-[calc(100%)] truncate text-sm text-muted-foreground">
              {country}
            </p>
          </div>
          <div className="ml-auto font-medium">{userCount}</div>
        </div>
      ))}
    </div>
  );
}
