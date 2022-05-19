import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';

ReactDOM.render(
  //<React.StrictMode>
    <BrowserRouter>
    {/* 全局配置antd中文 */}
      <ConfigProvider locale={locale}>  
        <App />
      </ConfigProvider>
    </BrowserRouter>,
  //</React.StrictMode>,
  document.getElementById('root')
);
