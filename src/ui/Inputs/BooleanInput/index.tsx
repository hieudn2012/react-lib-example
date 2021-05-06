import React from 'react'
import Switch from '@material-ui/core/Switch'
import { FormControlLabel, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    margin: 0
  }
})

interface Props {
  value: any
  onChange: (value: any) => void
  label: string
}

const BooleanInput = (props: Props) => {
  const classes = useStyles()

  const { value, onChange, label } = props

  const handleChange = () => {
    onChange(!value)
  }

  return (
    <FormControlLabel
      classes={{ root: classes.root }}
      value={!!value}
      control={
        <Switch
          inputProps={{ 'aria-label': 'primary checkbox' }}
          onChange={handleChange}
          checked={!!value}
        />
      }
      label={label}
      labelPlacement='end'
    />
  )
}

export default BooleanInput
