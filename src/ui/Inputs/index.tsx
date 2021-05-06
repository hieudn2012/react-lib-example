import React from 'react'
import TextInput from './TextInput'
import ArrayInput from './ArrayInput'
import SelectInput from './SelectInput'
import BooleanInput from './BooleanInput'
import TextInputWithImageView from './TextInputWithImageView'

const Inputs = {
  text: TextInput,
  array: ArrayInput,
  select: SelectInput,
  boolean: BooleanInput,
  textWithImage: TextInputWithImageView
}

const InputComponent = (props: any) => {
  const { widget } = props
  const Input = Inputs[widget]
  return <Input {...props} />
}

export default InputComponent
