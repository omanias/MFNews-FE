import React from 'react';
import { Layout, Button, Typography, Modal, Input } from 'antd';
import { LogoutOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;
const { Search } = Input;

interface NavBarProps {
    onNew: () => void;
    onSearch?: (value: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onNew, onSearch }) => {
    const navigate = useNavigate();

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
            <Header className="navbar-header">
                <div className="navbar-title">
                    <Title level={3} style={{ color: 'white', margin: 0 }}>MFNews</Title>
                </div>
                <div className="navbar-actions">
                    <Search
                        placeholder="Buscar noticias..."
                        allowClear
                        onSearch={onSearch}
                        className="navbar-search"
                    />
                    {isAdmin && (
                        <>
                            <Button
                                type="default"
                                className="new-news-btn"
                                onClick={onNew}
                                style={{ background: '#fff', color: '#c4120a', border: '1px solid #c4120a', fontWeight: 'bold', borderRadius: 8, boxShadow: 'none' }}
                            >
                                <span className="btn-text">Nueva noticia</span>
                                <span className="btn-plus">Nueva noticia</span>
                            </Button>
                            <Button
                                type="default"
                                icon={<TeamOutlined />}
                                onClick={() => navigate('/user-management')}
                                style={{ background: '#fff', color: '#c4120a', border: 'none' }}
                            />
                        </>
                    )}
                    <LogoutOutlined
                        style={{ color: 'white', fontSize: 22, cursor: 'pointer' }}
                        title="Cerrar sesión"
                        onClick={handleLogout}
                    />
                </div>
            </Header>
            <style>{`
                .navbar-header {
                    background: #c4120a;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 40px;
                }
                .navbar-title {
                    display: flex;
                    align-items: center;
                }
                .navbar-actions {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .navbar-search {
                    width: 40vw;
                    min-width: 120px;
                    max-width: 300px;
                }
                @media (max-width: 600px) {
                    .navbar-header {
                        flex-direction: column;
                        align-items: stretch;
                        padding: 0 8px;
                        height: auto;
                    }
                    .navbar-title {
                        justify-content: center;
                        margin-bottom: 4px;
                    }
                    .navbar-actions {
                        flex-wrap: wrap;
                        gap: 6px;
                        justify-content: center;
                    }
                    .navbar-search {
                        width: 100%;
                        min-width: 0;
                        max-width: 100vw;
                    }
                    .new-news-btn, .ant-btn, .btn-user-text {
                        font-size: 14px !important;
                        padding: 0 8px !important;
                    }
                    .btn-text {
                        display: none;
                    }
                    .btn-plus {
                        display: inline;
                    }
                }
                @media (min-width: 601px) {
                    .btn-text {
                        display: inline;
                    }
                    .btn-plus {
                        display: none;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default NavBar;