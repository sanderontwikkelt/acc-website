import { ReactNode } from "react"

interface HeadingProps {
  title: string
  description: string
  children?: ReactNode
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="flex w-full max-md:flex-col max-md:space-y-4 md:items-center md:justify-between md:space-x-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  )
}
