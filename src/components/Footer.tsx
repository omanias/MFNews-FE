import React from 'react';
import { LinkedinOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Text } = Typography;

const Footer: React.FC = () => (
    <footer style={{
        width: '100%',
        background: '#f5f5f5',
        color: '#333',
        textAlign: 'center',
        padding: '16px 0',
        position: 'fixed',
        left: 0,
        bottom: 0,
        zIndex: 100
    }}>
        <Text>Proyecto creado por Omar J. Manias - Desafío para MindFactory</Text>
        <a
            href="https://www.linkedin.com/in/omar-jesus-manias/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: 16, color: '#0077b5', fontSize: 22, verticalAlign: 'middle' }}
            title="LinkedIn Omar J. Manias"
        >
            <LinkedinOutlined />
        </a>
    </footer>
);

export default Footer; 