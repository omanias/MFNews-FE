import React from 'react';
import { Typography, Button } from 'antd';
import { SolutionOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const UserManagement: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div
            style={{
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 32,
                    textAlign: 'center',
                }}
            >
                <SolutionOutlined
                    style={{
                        color: '#c4120a',
                        fontSize: 56,
                        flexShrink: 0,
                    }}
                />
                <Title level={3} style={{ margin: 0, fontWeight: 600, color: '#222', lineHeight: 1.2 }}>
                    Sección en construcción. <br />Aqui se gestionarán los usuarios
                </Title>
            </div>
            <Button
                type="primary"
                style={{ marginTop: 32, background: '#c4120a', border: 'none', fontWeight: 'bold', borderRadius: 8 }}
                onClick={() => navigate('/')}
            >
                Volver al inicio
            </Button>
            <style>{`
                @media (max-width: 600px) {
                    .user-mgmt-flex {
                        flex-direction: column !important;
                        gap: 12px !important;
                    }
                    .user-mgmt-text {
                        font-size: 18px !important;
                        max-width: 90vw !important;
                    }
                    .user-mgmt-icon {
                        font-size: 40px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default UserManagement; 