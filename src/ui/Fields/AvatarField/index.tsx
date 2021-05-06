import React from 'react'
import { Avatar } from '@material-ui/core'

type Props = {
  value: string
}

const AvatarField = ({ value }: Props) => (
  <Avatar src={value} alt='avatar' variant='rounded' />
)

export default AvatarField
