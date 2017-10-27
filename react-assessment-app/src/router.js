import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import EditTask from './pages/EditTask';

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/edit-task' component={EditTask} />
    </Switch>
)