import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { forOwn } from 'lodash'

const RouteCustom = ({ config }: any) => {
  const routes: any = []
  forOwn(config, (value, key) => {
    routes.push(
      <Route
        key={key}
        exact={value.exact}
        path={value.path}
        component={value.component}
      />
    )
  })
  return (
    <Router>
      <Switch>{routes}</Switch>
    </Router>
  )
}

export default RouteCustom
