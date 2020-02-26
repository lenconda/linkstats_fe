import React from 'react';
import {
  Typography,
  Divider,
  Card,
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
    <Card
      loading={props.loading || false}
      bordered={false}
      className="profile-card"
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
    </Card>
  </div>
);

export default Content;
