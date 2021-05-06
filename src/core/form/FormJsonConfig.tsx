import { forOwn, get } from 'lodash'
import React from 'react'
import * as Yup from 'yup'
import { FormControl, Button, makeStyles, Box, Grid } from '@material-ui/core'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import InputComponent from '../../ui/Inputs'
import { guidGenerator } from '../functions'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.2)
  }
}))

interface Props {
  config: any
  isSubmit: boolean
  isReset: boolean
  onListenChange: (event: any, key: string) => void
  onSubmit: () => void
  handleSubmit: () => void
  handleReset: () => void
  handleChange: (event: any) => void
  values: any
  touched: any
  errors: any
  setFieldValue: (key: any, event: any) => void
}

const RenderInput = ({
  config,
  isSubmit,
  isReset,
  onListenChange,
  onSubmit,
  ...props
}: Props) => {
  const fields = get(config, 'fields')
  const inputs: any = []

  const {
    handleSubmit,
    handleReset,
    values,
    handleChange,
    touched,
    setFieldValue,
    errors
  } = props

  const classes = useStyles()

  React.useEffect(() => {
    if (isSubmit) {
      handleSubmit()
    }
  }, [isSubmit])

  React.useEffect(() => {
    if (isReset) {
      handleReset()
    }
  }, [isReset])

  forOwn(fields, (value, key) => {
    const widget = get(value, 'ui.widget')
    let inputProps: any = {
      fullWidth: true,
      id: key,
      name: key,
      label: get(value, 'label'),
      value: values[key] || '',
      values: values,
      onChange: (e: any) => {
        handleChange(e)
        if (onListenChange) {
          onListenChange(e, key)
        }
      },
      error: touched[key] && Boolean(errors[key]),
      helperText: touched[key] && errors[key],
      variant: 'outlined',
      margin: 'none',
      size: 'small',
      widget,
      key,
      type: get(value, 'type'),
      placeholder: get(value, 'placeholder')
    }
    const rows = get(value, 'ui.rows')
    if (widget === 'text' && rows) {
      inputProps.rows = rows
      inputProps.multiline = true
    }
    if (widget === 'select') {
      inputProps = {
        ...inputProps,
        data: get(value, 'data'),
        onChange: (e: any) => {
          setFieldValue(key, e.target.value)
          if (onListenChange) {
            onListenChange(e, key)
          }
        }
      }
    }
    if (widget === 'boolean') {
      inputProps = {
        ...inputProps,
        onChange: (valueBoolean: any) => {
          setFieldValue(key, valueBoolean)
          if (onListenChange) {
            onListenChange(valueBoolean, key)
          }
        }
      }
    }

    const ui = get(value, 'ui') || {}
    const girdProps = {
      xs: ui.xs || 12,
      xl: ui.xl || 12,
      sm: ui.sm || 12,
      md: ui.md || 12,
      lg: ui.lg || 12
    }
    inputs.push(
      <Grid item {...girdProps} key={key}>
        <InputComponent {...inputProps} />
      </Grid>
    )
  })

  const actions = get(config, 'actions')
  const buttons: any = []

  const actionsButton = {
    reset: () => props.handleReset(),
    submit: () => props.handleSubmit()
  }

  forOwn(actions, (value, key) => {
    buttons.push(
      <Button
        variant='contained'
        color='primary'
        key={key}
        onClick={actionsButton[get(value, 'type')]}
        className={classes.button}
      >
        {get(value, 'label')}
      </Button>
    )
  })
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {inputs}
      </Grid>
      <Box mt={4}>{buttons}</Box>
    </React.Fragment>
  )
}

interface FormProps {
  onSubmitForm?: (values: any) => void
  config: any
  isSubmit?: boolean
  isReset?: boolean
  onListenChange?: () => void
  onDispatch: (action: any) => void
  callback?: () => void
  onClose?: () => void
}

const FormJsonConfig = ({
  onSubmitForm,
  config,
  isSubmit,
  isReset,
  onListenChange,
  onDispatch,
  callback,
  onClose
}: FormProps) => {
  React.useEffect(() => {
    const callApi = get(config, 'callApi') || {}
    forOwn(callApi, (value) => {
      onDispatch({ ...value })
    })
  }, [])

  const initialValues = get(config, 'initialValues')
  const validationObject = get(config, 'validationObject')
  const validationSchema = Yup.object().shape(validationObject)

  const actionType = get(config, 'form.actionType')
  const getId = get(config, 'form.getId')

  const handleSubmitForm = (values: any) => {
    if (onClose) {
      onClose()
    }
    const payload = getId ? { ...values, id: guidGenerator() } : { ...values }
    if (onSubmitForm) {
      onSubmitForm(values)
    }
    if (actionType) {
      onDispatch({
        type: actionType,
        payload,
        callback
      })
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      {(props: any) => (
        <Form>
          <FormControl fullWidth>
            <RenderInput
              {...props}
              onSubmit={() => handleSubmitForm(props.values)}
              isSubmit={isSubmit}
              isReset={isReset}
              onListenChange={onListenChange}
              config={config}
            />
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  onDispatch: (data: any) => dispatch(data)
})

export default connect(null, mapDispatchToProps)(FormJsonConfig)
