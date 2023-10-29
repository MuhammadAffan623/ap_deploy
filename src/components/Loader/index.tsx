import React from 'react'

interface ILoaderProps {
  fullScreen?: boolean
}

const Loader = ({ fullScreen }: ILoaderProps) => {
  return (
    <div className={`loader-function ${fullScreen ? 'fullscreen' : ''}`}>
      <span />
      <span />
      <span />
    </div>
  )
}

export default Loader
