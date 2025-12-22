import { Icon, type IconProps } from '@iconify/react'

const IconifyIcon = ({ width = '1em', height = '1em', ...props }: IconProps) => {
  return <Icon width={width} height={height} {...props} />
}

export default IconifyIcon
