import React from 'react'

interface ILoaderProps {
  fullScreen?: boolean
  dark?: boolean
}

const Loader = ({ fullScreen, dark }: ILoaderProps) => {
  return (
    <div className={`loader-function ${fullScreen ? 'fullscreen' : ''} ${dark ? 'dark' : ''}`}>
      <span />
      <span />
      <span />
    </div>
  )
}

export default Loader
