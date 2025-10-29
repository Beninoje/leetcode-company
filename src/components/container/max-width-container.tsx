import React from 'react'

type Props = {
  children: React.ReactNode
}

const MaxWidthContainer = ({ children }: Props) => {
  return (
    <div className="max-w-7xl mx-auto px-4">{children}</div>
  )
}

export default MaxWidthContainer