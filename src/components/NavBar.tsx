import React, { useState } from 'react';
import { Layout, Button, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import NewModal from './NewModal';

const { Header } = Layout;
const { Title } = Typography;

const NavBar: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Layout>
            <Header style={{ background: '#c4120a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px' }}>
                <Title level={3} style={{ color: 'white', margin: 0 }}>MFNews</Title>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Button
                        type="primary"
                        style={{ background: 'white', color: '#c4120a', fontWeight: 'bold' }}
                        onClick={() => setModalVisible(true)}
                    >
                        Nueva Noticia
                    </Button>
                    <LogoutOutlined style={{ color: 'white', fontSize: 22, cursor: 'pointer' }} title="Cerrar sesión" />
                </div>
            </Header>
            {modalVisible && <NewModal visible={modalVisible} onClose={() => setModalVisible(false)} />}
        </Layout>
    );
};

export default NavBar;