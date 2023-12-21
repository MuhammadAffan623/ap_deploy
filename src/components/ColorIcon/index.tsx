import './style.scss'

const ColorIcon = ({ color, mr }: { color: string; mr?: string }) => {
  return <div className='color-box' style={{ backgroundColor: color, marginRight: mr }} />
}

export default ColorIcon
