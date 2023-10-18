import { Avatar as AntAvatar, Badge, AvatarProps as AntAvatarProps } from 'antd'
import './style.scss'

interface AvatarProps extends AntAvatarProps {
  src?: string
  online?: boolean
  className?: string
}

const Avatar = ({ className, src, online = false, ...rest }: AvatarProps) => {
  return (
    <Badge dot={online} color='green' className='onlineBadge'>
      <AntAvatar
        src={src}
        shape='circle'
        {...rest}
        className={['ant-avatar', className].join(' ')}
      />
    </Badge>
  )
}

export default Avatar
