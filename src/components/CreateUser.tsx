import React from 'react';
import { Form, Input, Button, Typography, Card, message, Select } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../services/authService';

const { Title, Text } = Typography;
const { Option } = Select;

const CreateUser: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            await createUser({
                email: values.email,
                password: values.password,
                role: values.role
            });

            message.success('Usuario creado exitosamente');
            setTimeout(() => navigate('/login'), 1000);
        } catch (error) {
            message.error('Error al crear el usuario');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
            <Card style={{ minWidth: 340, padding: 24, borderRadius: 12, boxShadow: '0 2px 8px #0001' }}>
                <Title level={4} style={{ textAlign: 'center', marginBottom: 24 }}>Crear Nueva Cuenta</Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Correo Electrónico"
                        name="email"
                        rules={[
                            { required: true, message: 'Ingrese el correo electrónico' },
                            { type: 'email', message: 'Ingrese un correo electrónico válido' }
                        ]}
                    >
                        <Input autoComplete="email" />
                    </Form.Item>
                    <Form.Item
                        label="Contraseña"
                        name="password"
                        rules={[
                            { required: true, message: 'Ingrese la contraseña' },
                            { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
                        ]}
                    >
                        <Input.Password autoComplete="new-password" />
                    </Form.Item>
                    <Form.Item
                        label="Rol"
                        name="role"
                        rules={[{ required: true, message: 'Seleccione el rol' }]}
                    >
                        <Select>
                            <Option value="user">Usuario</Option>
                            <Option value="admin">Administrador</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block style={{ background: '#c4120a', border: 'none', fontWeight: 'bold' }}>
                            Crear Cuenta
                        </Button>
                    </Form.Item>
                    <div style={{ textAlign: 'center' }}>
                        <Text>¿Ya tienes una cuenta? </Text>
                        <Link to="/login" style={{ color: '#c4120a', fontWeight: 'bold' }}>
                            Iniciar sesión
                        </Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default CreateUser; 