import React, { useMemo, useState } from 'react';
import { Avatar, Button, Divider, Layout, Typography } from 'antd';
import {
  AppstoreOutlined,
  FileSearchOutlined,
  FolderAddOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

interface SidebarItem {
  key: string;
  icon: React.ReactNode;
  label: string;
}

export const Sidemenu: React.FC = () => {
  const [theme] = useState<'light' | 'dark'>('light');
  const items = useMemo<SidebarItem[]>(
    () => [
      { key: 'newChat', icon: <PlusOutlined />, label: '新聊天' },
      { key: 'searchChat', icon: <SearchOutlined />, label: '搜索聊天' },
      { key: 'library', icon: <FileSearchOutlined />, label: '库' },
      { key: 'atlas', icon: <AppstoreOutlined />, label: 'Atlas' },
    ],
    []
  );

  const projectItems = useMemo<SidebarItem[]>(
    () => [
      { key: 'projectNew', icon: <FolderAddOutlined />, label: '新项目' },
    ],
    []
  );

  const renderButtonList = (list: SidebarItem[]) => {
    return (
      <div style={{ padding: '4px 8px 12px' }}>
        {list.map((item) => (
          <Button
            key={item.key}
            type="text"
            block
            icon={item.icon}
            onClick={() => console.log('Sidebar action:', item.key)}
            style={{
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              borderRadius: 10,
              marginBottom: 4,
            }}
          >
            <span style={{ marginLeft: 8 }}>{item.label}</span>
          </Button>
        ))}
      </div>
    );
  };

  return (
    <Sider
      width={260}
      theme={theme}
      style={{
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
        overflow: 'hidden',
        boxShadow: theme === 'light' ? '0 0 10px 0 rgba(0, 0, 0, 0.1)' : '0 0 10px 0 rgba(0, 0, 0, 0.5)',
        background: theme === 'light' ? '#ffffff' : '#111827',
      }}
    >
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Top brand */}
        <div
          style={{
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: theme === 'light' ? '#ffffff' : '#111827',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: theme === 'light' ? '#111827' : '#ffffff',
            }}
          >
            G
          </div>
          <Typography.Text style={{ fontWeight: 600 }}>
            ChatGPT
          </Typography.Text>
        </div>

        {renderButtonList(items)}

        <Divider style={{ margin: '12px 0', borderColor: 'rgba(255,255,255,0.12)' }} />

        {/* Projects */}
        <div style={{ padding: '0 12px 8px' }}>
          <Typography.Text style={{ fontSize: 12 }}>
            项目
          </Typography.Text>
        </div>
        {renderButtonList(projectItems)}

        {/* NOTE: “你的聊天”默认文字/列表已按你的要求移除 */}

        <div style={{ flex: 1 }} />

        {/* User */}
        <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar style={{ backgroundColor: '#7c3aed' }}>ML</Avatar>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Typography.Text ellipsis>
                mal lin
              </Typography.Text>
              <div style={{ fontSize: 12,  }}>免费版</div>
            </div>
            <Button type="text" icon={<MoreOutlined />} />
          </div>
        </div>
      </div>
    </Sider>
  );
};

