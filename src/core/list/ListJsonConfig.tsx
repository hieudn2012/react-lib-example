import React from 'react'
import { get, forOwn, isEmpty } from 'lodash'
import { DataGrid } from '@material-ui/data-grid'
import { IconButton, Button, Box, makeStyles } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import ImportExportRoundedIcon from '@material-ui/icons/ImportExportRounded'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import FieldComponent from '../../ui/Fields'
import DialogConfirm from '../../ui/Dialog/DialogConfirm'
import DialogForm from '../../ui/Dialog/DialogForm'

const useStyles = makeStyles({
  root: {
    borderRadius: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0
  }
})

const MAP_ICON = {
  detail: <VisibilityIcon />,
  delete: <HighlightOffIcon />,
  create: <AddRoundedIcon />,
  export: <ImportExportRoundedIcon />
}

interface Props {
  config: any
  rows: Array<any>
  pageSize: number
  onDispatchAction: (type: string, payload: any) => void
  onPushLocation: (location: string) => void
  onDispatch: (action: any) => void
  form: any
  isCloseForm: boolean
}

const ListJsonConfig = ({
  config,
  rows,
  pageSize,
  onDispatchAction,
  onPushLocation,
  onDispatch,
  isCloseForm,
  form
}: Props) => {
  const classes = useStyles()
  const columns = get(config, 'columns')
  const columnsRender = []

  const [open, setOpen] = React.useState(false)
  const [rowInfo, setRowInfo] = React.useState<any>({})
  const [topButtonInfo, setTopButtonInfo] = React.useState<any>({})
  const [showDialogForm, setShowDialogForm] = React.useState(false)
  const [isSubmit, setIsSubmit] = React.useState(false)

  React.useEffect(() => {
    if (topButtonInfo.type === 'create' && topButtonInfo.redirect) {
      onPushLocation(topButtonInfo.redirect)
    }
    if (topButtonInfo.type === 'create' && topButtonInfo.showDialog) {
      setShowDialogForm(true)
      setRowInfo({ ...rowInfo, data: {} })
    }
  }, [topButtonInfo])

  forOwn(columns, (value, key) => {
    columnsRender.push({
      field: key,
      headerName: get(value, 'headerName'),
      width: get(value, 'ui.width'),
      renderCell: (params: any) => (
        <FieldComponent
          widget={get(value, 'ui.widget')}
          value={params.row[key]}
        />
      )
    })
  })

  // CLOSE FORM
  React.useEffect(() => {
    if (isCloseForm) {
      setShowDialogForm(false)
    }
  }, [isCloseForm])

  // CALL API DID MOUND
  React.useEffect(() => {
    const callApi = get(config, 'didMoundList') || {}
    forOwn(callApi, (value) => {
      onDispatch({ ...value })
    })
  }, [])

  const topActions = get(config, 'topActions') || {}
  const buttons: any = []
  forOwn(topActions, (value, key) => {
    buttons.push(
      <Button
        key={key}
        startIcon={MAP_ICON[get(value, 'type')]}
        onClick={() => setTopButtonInfo({ ...value })}
      >
        {get(value, 'label')}
      </Button>
    )
  })

  const actions = get(config, 'actions') || {}
  const iconButtons: any = []
  forOwn(actions, (value, key) => {
    iconButtons.push({ ...value, key })
  })

  if (!isEmpty(actions)) {
    columnsRender.push({
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params: any) => (
        <React.Fragment>
          {iconButtons.map((item: any) => (
            <IconButton
              size='small'
              key={item.key}
              onClick={() => {
                setRowInfo({
                  actionType: item.actionType,
                  data: { ...params.row }
                })
                if (item.type === 'delete') {
                  setOpen(true)
                }
                if (item.type === 'detail' && item.redirect) {
                  onPushLocation(`${item.redirect}/${params.row.id}`)
                }
                if (item.type === 'detail' && item.showDialog) {
                  setShowDialogForm(true)
                }
              }}
            >
              {MAP_ICON[item.type]}
            </IconButton>
          ))}
        </React.Fragment>
      )
    })
  }

  const handleToggleSubmit = () => {
    setIsSubmit(true)
    setTimeout(() => setIsSubmit(false), 200)
  }

  return (
    <React.Fragment>
      <Box p={2} display='flex' justifyContent='flex-end'>
        {buttons}
      </Box>
      <DataGrid
        columns={columnsRender}
        rows={rows}
        pageSize={pageSize}
        className={classes.root}
        autoPageSize
        scrollbarSize={2}
      />
      <DialogConfirm
        open={open}
        onClose={() => setOpen(false)}
        onAccept={() => {
          setOpen(false)
          onDispatchAction(rowInfo.actionType, rowInfo.data.id)
        }}
      />
      <DialogForm
        open={showDialogForm}
        onClose={() => setShowDialogForm(false)}
        data={rowInfo.data}
        onSubmit={handleToggleSubmit}
      >
        {form &&
          React.cloneElement(form, { data: { ...rowInfo.data }, isSubmit })}
      </DialogForm>
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  onDispatchAction: (type: string, payload: any) => dispatch({ type, payload }),
  onPushLocation: (location: string) => dispatch(push(location)),
  onDispatch: (data: any) => dispatch(data)
})

export default connect(null, mapDispatchToProps)(ListJsonConfig)
