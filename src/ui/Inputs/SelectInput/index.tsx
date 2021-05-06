import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles({
  outlined: {
    padding: '10px 14px'
  }
})

interface ItemProps {
  id: string
  name: string
}

interface Props {
  name: string
  helperText: any
  error: boolean
  label: string
  data: Array<ItemProps>
}

const SelectInput = (props: Props) => {
  const classes = useStyles()

  const { name, helperText, error, label, data = [], ...rest } = props

  return (
    <FormControl variant='outlined' size='small' fullWidth error={error}>
      <InputLabel id='demo-simple-select-outlined-label'>{label}</InputLabel>
      <Select
        {...rest}
        labelId='demo-simple-select-outlined-label'
        id='demo-simple-select-outlined'
        label={label}
        classes={{ outlined: classes.outlined }}
      >
        <MenuItem value=''>
          <em>Select</em>
        </MenuItem>
        {data.map((item) => (
          <MenuItem value={item.id} key={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{(error && helperText) || ''}</FormHelperText>
    </FormControl>
  )
}

export default SelectInput
