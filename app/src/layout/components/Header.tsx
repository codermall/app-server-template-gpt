import React from 'react';
import { Button, Dropdown, Layout, Space, Typography } from 'antd';
import { DownOutlined, GiftOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

export const Header: React.FC = () => {
  return (
    <AntHeader
      style={{
        background: '#ffffff',
        borderBottom: '1px solid #f0f0f0',
        padding: '0 16px',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Space size={6}>
        <Typography.Text style={{ fontSize: 16, fontWeight: 600 }}>ChatGPT</Typography.Text>
        <Dropdown
          menu={{
            items: [
              { key: 'default', label: '默认' },
              { key: 'placeholder', label: '占位菜单项' },
            ],
          }}
          trigger={['click']}
        >
          <Button type="text" icon={<DownOutlined />} />
        </Dropdown>
      </Space>

      <Button icon={<GiftOutlined />}>免费赠品</Button>
    </AntHeader>
  );
};

