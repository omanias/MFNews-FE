import React from 'react';
import { Layout, Button, Typography, Modal } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

interface NavBarProps {
    onNew: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onNew }) => {
    const handleLogout = () => {
        Modal.confirm({
            title: '¿Deseas cerrar sesión?',
            content: 'Tendrás que volver a iniciar sesión para acceder nuevamente.',
            okText: 'Salir',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: () => {
                localStorage.clear();
                window.location.href = '/login';
            },
        });
    };

    return (
        <Layout>
            <Header style={{ background: '#c4120a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px' }}>
                <Title level={3} style={{ color: 'white', margin: 0 }}>MFNews</Title>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Button
                        type="primary"
                        style={{ background: 'white', color: '#c4120a', fontWeight: 'bold' }}
                        onClick={onNew}
                    >
                        Nueva Noticia
                    </Button>
                    <LogoutOutlined
                        style={{ color: 'white', fontSize: 22, cursor: 'pointer' }}
                        title="Cerrar sesión"
                        onClick={handleLogout}
                    />
                </div>
            </Header>
        </Layout>
    );
};

export default NavBar;