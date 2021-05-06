import React from 'react'
import TextField from './TextField'
import AvatarField from './AvatarField'
import BooleanField from './BooleanField'

const Fields = {
  text: TextField,
  avatar: AvatarField,
  boolean: BooleanField
}

const FieldComponent = (props: any) => {
  const { widget } = props
  const Field = Fields[widget]
  return <Field {...props} />
}

export default FieldComponent
