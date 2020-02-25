import React from 'react';
import { Icon } from 'antd';
import './index.less';

const Loading = (): JSX.Element => (
  <div className="loading-wrapper">
    <Icon type="loading" spin className="loading-icon" />
  </div>
);

export default Loading;
