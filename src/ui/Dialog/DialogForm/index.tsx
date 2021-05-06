import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import SaveRoundedIcon from '@material-ui/icons/SaveRounded'
import { TransitionProps } from '@material-ui/core/transitions'
import {
  DialogContent,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  makeStyles,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}))

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

interface Props {
  open: boolean
  onClose: () => void
  children: any
  data: any
  onSubmit: () => void
}

export default function DialogForm({
  open,
  onClose,
  children,
  data = {},
  onSubmit
}: Props) {
  const classes = useStyles()

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={onClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            {data.id}
          </Typography>
          <Button
            color='inherit'
            startIcon={<SaveRoundedIcon />}
            onClick={() => onSubmit()}
          >
            Submit
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
