import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

interface Props {
  open: boolean
  onClose: () => void
  onAccept: () => void
}

export default function DialogConfirm({ open, onClose, onAccept }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Xác nhận</DialogTitle>
      <DialogContent style={{ minWidth: 300 }}>
        <DialogContentText id='alert-dialog-description'>
          Bạn có chắn chắn?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Không
        </Button>
        <Button onClick={onAccept}>Có</Button>
      </DialogActions>
    </Dialog>
  )
}
