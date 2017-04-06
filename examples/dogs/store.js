import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

import rootReducer from './reducer'
import client from './client'


const middleware = [
  thunk.withExtraArgument(client),
  routerMiddleware(browserHistory)
]
if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger())
}

const enhancer = compose(applyMiddleware(
  ...middleware
))

export default createStore(rootReducer, enhancer)
