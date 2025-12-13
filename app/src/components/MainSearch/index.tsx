import React, { useMemo, useState } from 'react';
import { Button, Input, Space, Typography } from 'antd';
import { AudioOutlined, PlusOutlined, ArrowUpOutlined } from '@ant-design/icons';

export const MainSearch: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Search query:', query);
      // 这里可以调用 API
    }
  };

  const canSend = useMemo(() => query.trim().length > 0, [query]);

  return (
    <div
      style={{
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 16px 96px',
      }}
    >
      <Space orientation="vertical" size={24} style={{ width: '100%', maxWidth: 720 }}>
        <Typography.Title level={2} style={{ margin: 0, textAlign: 'center' }}>
          今天有什么计划？
        </Typography.Title>

        <form onSubmit={handleSubmit}>
          <Input
            size="large"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="询问任何问题"
            style={{ borderRadius: 999 }}
            prefix={
              <Button
                type="text"
                icon={<PlusOutlined />}
                aria-label="Add attachment"
                onClick={() => {}}
              />
            }
            suffix={
              <Space size={4}>
                <Button type="text" icon={<AudioOutlined />} aria-label="Voice input" />
                <Button
                  type="primary"
                  shape="circle"
                  icon={<ArrowUpOutlined />}
                  htmlType="submit"
                  disabled={!canSend}
                  aria-label="Send"
                />
              </Space>
            }
          />
        </form>

        <Typography.Text type="secondary" style={{ textAlign: 'center', display: 'block' }}>
          ChatGPT 可能会犯错。请检查重要信息。
        </Typography.Text>
      </Space>
    </div>
  );
};

