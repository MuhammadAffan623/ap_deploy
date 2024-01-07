import { Avatar as AntAvatar, AvatarProps as AntAvatarProps } from 'antd'
import './style.scss'
import { getInitials } from '~/utils/helper'

interface AvatarProps extends AntAvatarProps {
  src?: string
  className?: string
  name?: string
}

const Avatar = ({ className, src, name, ...rest }: AvatarProps) => {
  return (
    <AntAvatar src={src} shape='circle' {...rest} className={['ant-avatar', className].join(' ')}>
      {getInitials(name as string)}
    </AntAvatar>
  )
}

export default Avatar
