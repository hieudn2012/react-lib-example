import React from 'react'
import { Box, TextField, IconButton, Avatar } from '@material-ui/core'
import LibraryAddRoundedIcon from '@material-ui/icons/LibraryAddRounded'
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded'
import { FieldArray } from 'formik'

interface Props {
  name: string
  values: any
  helperText: any
  error: boolean
  label: string
}

const ArrayInput = (props: Props) => {
  const { values = {}, name, helperText, error, label } = props

  return (
    <Box>
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <Box>
            {values[name] &&
              values[name].length &&
              values[name].map((_value: any, index: number) => (
                <Box key={index.toString()} position='relative'>
                  <Box
                    width='calc(100% - 40px)'
                    display='flex'
                    alignItems='center'
                  >
                    <TextField
                      id={`${name}.[${index}]`}
                      key={index.toString()}
                      name={`${name}.[${index}]`}
                      value={values[name][index] || ''}
                      label={`${label} ${index + 1}`}
                      error={!!(error && helperText && helperText[index])}
                      helperText={error && helperText && helperText[index]}
                      margin='dense'
                    />
                    <Box ml={1}>
                      <Avatar src={values[name][index] || ''} />
                    </Box>
                  </Box>
                  <IconButton
                    onClick={() => arrayHelpers.remove(index)}
                    size='small'
                    style={{ position: 'absolute', right: 0, top: 12 }}
                  >
                    <HighlightOffRoundedIcon />
                  </IconButton>
                </Box>
              ))}
            <Box>
              <IconButton onClick={() => arrayHelpers.push('')}>
                <LibraryAddRoundedIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      />
    </Box>
  )
}

export default ArrayInput
