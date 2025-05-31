import React from 'react';
import { Layout, Button, Typography, Modal, Input } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;
const { Search } = Input;

interface NavBarProps {
    onNew: () => void;
    onSearch?: (value: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onNew, onSearch }) => {
    const handleLogout = () => {
        Modal.confirm({
            title: '¿Deseas cerrar sesión?',
            content: 'Tendrás que volver a iniciar sesión para acceder nuevamente.',
            okText: 'Salir',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: () => {
                sessionStorage.clear();
                window.location.href = '/login';
            },
        });
    };

    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const isAdmin = user.role === 'admin';

    return (
        <Layout>
            <Header style={{ background: '#c4120a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px' }}>
                <Title level={3} style={{ color: 'white', margin: 0 }}>MFNews</Title>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Search
                        placeholder="Buscar noticias..."
                        allowClear
                        onSearch={onSearch}
                        style={{ width: '40vw', minWidth: 120, maxWidth: 300 }}
                    />
                    {isAdmin && (
                        <Button
                            type="primary"
                            className="new-news-btn"
                            onClick={onNew}
                        >
                            <span className="btn-text">Nueva Noticia</span>
                            <span className="btn-plus">+</span>
                        </Button>
                    )}
                    <LogoutOutlined
                        style={{ color: 'white', fontSize: 22, cursor: 'pointer' }}
                        title="Cerrar sesión"
                        onClick={handleLogout}
                    />
                </div>
            </Header>
            <style>{`
                @media (max-width: 600px) {
                    .new-news-btn {
                        padding: 0 10px !important;
                        font-size: 22px !important;
                        min-width: 36px;
                        height: 32px;
                        background: white !important;
                        color: #c4120a !important;
                        border: none !important;
                        border-radius: 8px !important;
                        box-shadow: none !important;
                        font-weight: bold;
                    }
                    .new-news-btn .btn-text {
                        display: none;
                    }
                    .new-news-btn .btn-plus {
                        display: inline;
                    }
                }
                @media (min-width: 601px) {
                    .new-news-btn {
                        background: white !important;
                        color: #c4120a !important;
                        border: none !important;
                        border-radius: 8px !important;
                        box-shadow: none !important;
                        font-weight: bold;
                    }
                    .new-news-btn .btn-text {
                        display: inline;
                    }
                    .new-news-btn .btn-plus {
                        display: none;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default NavBar;