import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Box, Avatar } from '@material-ui/core'

const TextInputWithImageView = ({ ...props }) => (
  <Box display='flex'>
    <TextField {...props} />
    <Box ml={1}>
      <Avatar src={props.value} />
    </Box>
  </Box>
)

export default TextInputWithImageView
