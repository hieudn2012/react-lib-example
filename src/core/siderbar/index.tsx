import React from 'react'
import { Drawer, Hidden, makeStyles, useTheme } from '@material-ui/core'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  // necessary for content to be below app bar
  drawerPaper: {
    width: drawerWidth
  }
}))

interface Props {
  window: any
  onClose: () => void
  children: any
  mobileOpen: boolean
}

function SiderBar({ children, window, mobileOpen, onClose }: Props) {
  const classes = useStyles()
  const theme = useTheme()

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <nav className={classes.drawer} aria-label='mailbox folders'>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden mdUp implementation='css'>
        <Drawer
          container={container}
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={onClose}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {children}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation='css'>
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant='permanent'
          open
        >
          {children}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default SiderBar
