import React from 'react'
import AirplanemodeActiveRoundedIcon from '@material-ui/icons/AirplanemodeActiveRounded'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Typography,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  subItem: {
    padding: '8px 16px 8px 30px'
  },
  itemIcon: {
    minWidth: 40
  },
  chip: {
    height: 14,
    fontSize: 9
  }
}))

const Menu = ({ config }: any) => {
  const [state, setState] = React.useState({})
  const classes = useStyles()

  const handdleToggleSub = (name: string) => {
    setState({ ...state, [name]: !state[name] })
  }

  return (
    <div>
      <div className={classes.toolbar}>
        <Box p={2} display='flex'>
          <AirplanemodeActiveRoundedIcon />
          <Box ml={1}>
            <Typography variant='h6'>Admin Page</Typography>
          </Box>
        </Box>
      </div>
      <Divider />
      <List>
        {config.map((item: any) => (
          <React.Fragment key={item.name}>
            <ListItem
              button
              component={item.type === 'sub' ? 'div' : Link}
              to={item.path}
              onClick={() => handdleToggleSub(item.name)}
            >
              <ListItemIcon classes={{ root: classes.itemIcon }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
              {item.type === 'sub' &&
                (state[item.name] ? (
                  <ExpandLessRoundedIcon />
                ) : (
                  <ExpandMoreRoundedIcon />
                ))}
              {item.status && (
                <Chip
                  label={item.status}
                  classes={{ root: classes.chip }}
                  variant='outlined'
                />
              )}
            </ListItem>
            {item.type === 'sub' &&
              item.children &&
              item.children.map((subItem: any) => (
                <Collapse in={state[item.name]} key={subItem.name}>
                  <ListItem
                    button
                    component={Link}
                    to={subItem.path}
                    className={classes.subItem}
                  >
                    <ListItemIcon classes={{ root: classes.itemIcon }}>
                      {subItem.icon}
                    </ListItemIcon>
                    <ListItemText primary={subItem.name} />
                    {subItem.status && (
                      <Chip
                        label={subItem.status}
                        classes={{ root: classes.chip }}
                        variant='outlined'
                      />
                    )}
                  </ListItem>
                </Collapse>
              ))}
          </React.Fragment>
        ))}
      </List>
    </div>
  )
}

export default Menu
