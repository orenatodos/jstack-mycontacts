import { Switch, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { NewContact } from './pages/NewContact'
import { EditContactContainer as EditContact } from './pages/EditContact'

export function Routes () {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/new" exact component={NewContact} />
      <Route path="/edit/:id" exact component={EditContact} />
    </Switch>
  )
}
