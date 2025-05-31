import React from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const { Title } = Typography;

const Login: React.FC = () => {
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        try {
            const response = await login({
                email: values.usuario,
                password: values.password
            });

            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('user', JSON.stringify(response.user));

            message.success('¡Bienvenido!');
            setTimeout(() => navigate('/'), 1000);
        } catch (error) {
            message.error('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
            <Card style={{ minWidth: 340, padding: 24, borderRadius: 12, boxShadow: '0 2px 8px #0001' }}>
                <Title level={4} style={{ textAlign: 'center', marginBottom: 24 }}>Iniciar Sesión</Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Usuario" name="usuario" rules={[{ required: true, message: 'Ingrese su usuario' }]}>
                        <Input autoComplete="username" />
                    </Form.Item>
                    <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: 'Ingrese su contraseña' }]}>
                        <Input.Password autoComplete="current-password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block style={{ background: '#c4120a', border: 'none', fontWeight: 'bold' }}>
                            Iniciar Sesión
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login; 