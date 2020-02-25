import React from 'react';
import {
  Spin,
  Icon,
  Typography,
  Divider,
} from 'antd';
import './index.less';

const {
  Title,
  Text,
} = Typography;

interface ContentProps {
  children?: React.ReactNode;
  loading?: boolean;
  tip?: string;
  title?: string;
  controls?: React.ReactNode[] | React.ReactNode;
  className?: string;
}

const Content = (props: ContentProps): JSX.Element => (
  <div className={props.className || ''}>
    <Spin spinning={props.loading || false}
      tip={props.tip || '加载中...'}
      indicator={<Icon type="loading" spin />}
    >
      {
        props.title
          ? <div className="title-divider">
            <div className="title-wrapper">
              <Title level={3}
                ellipsis={true}
                className="content-title"
              >
                <Text ellipsis={true} strong>
                  {props.title}
                </Text>
              </Title>
            </div>
            <Divider />
            {
              props.controls
                ? <div className="controls-wrapper">
                  {props.controls}
                </div>
                : null
            }
          </div>
          : null
      }
      <div className="content-wrapper">
        {props.children}
      </div>
    </Spin>
  </div>
);

export default Content;
