import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

if (process.env.NODE_ENV === 'development') {
  console.immutable = (immutable) => console.log(immutable.toJS())
}

ReactDOM.render(<App />, document.getElementById('root'))
