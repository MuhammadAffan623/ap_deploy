import { Avatar as AntAvatar, Badge, AvatarProps as AntAvatarProps } from 'antd'
import './style.scss'
import { getInitials } from '~/utils/helper'

interface AvatarProps extends AntAvatarProps {
  src?: string
  online?: boolean
  className?: string
  name?: string
}

const Avatar = ({ className, src, name, online = false, ...rest }: AvatarProps) => {
  return (
    <Badge dot={online} color='green' className='onlineBadge'>
      <AntAvatar src={src} shape='circle' {...rest} className={['ant-avatar', className].join(' ')}>
        {getInitials(name as string)}
      </AntAvatar>
    </Badge>
  )
}

export default Avatar
