import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './theme.css'

import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'

ReactDOM.render(
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
