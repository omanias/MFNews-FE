import React, { useState } from 'react';
import { Modal, Form, Input, Button, Typography, message } from 'antd';
import { createNews } from '../services/newsService';
import { useNavigate } from 'react-router-dom';
import SuccessModal from './SuccessModal';

const { Title, Text } = Typography;

interface NewModalProps {
    visible: boolean;
    onClose: () => void;
    onNewsCreated?: () => void;
}

const NewModal: React.FC<NewModalProps> = ({ visible, onClose, onNewsCreated }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const navigate = useNavigate();

    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const isAdmin = user.role === 'admin';

    const handleCancel = () => {
        onClose();
        form.resetFields();
    };

    const handleOk = async (values: any) => {
        if (!isAdmin) {
            message.error('Solo los administradores pueden crear noticias');
            onClose();
            return;
        }
        try {
            setLoading(true);
            await createNews({
                title: values.titulo,
                subtitle: values.subtitulo,
                body: values.descripcion,
                image_url: values.url,
                author: values.autor,
                date: new Date().toISOString()
            });
            form.resetFields();
            onClose();
            if (onNewsCreated) onNewsCreated();
            setSuccessVisible(true);
        } catch (error) {
            message.error('Error al crear la noticia');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                open={visible}
                footer={null}
                onCancel={handleCancel}
                centered
                closable={false}
                styles={{ body: { padding: 24, borderRadius: 10 } }}
                style={{ borderRadius: 10 }}
            >
                <div style={{ textAlign: 'center', marginBottom: 12 }}>
                    <Title level={5} style={{ color: '#c4120a', marginBottom: 0 }}>Nueva Noticia</Title>
                    <Text>Completar los siguientes datos.</Text>
                </div>
                <Form
                    form={form}
                    onFinish={handleOk}
                    layout="vertical"
                    requiredMark={false}
                >
                    <Form.Item
                        name="titulo"
                        label="Título"
                        rules={[{ required: true, message: 'Por favor ingrese el título' }]}
                    >
                        <Input placeholder="Ingrese el título" />
                    </Form.Item>
                    <Form.Item
                        name="subtitulo"
                        label="Subtítulo"
                    >
                        <Input placeholder="Ingrese el subtítulo" />
                    </Form.Item>
                    <Form.Item
                        name="descripcion"
                        label="Descripción"
                        rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Ingrese la descripción" />
                    </Form.Item>
                    <Form.Item
                        name="url"
                        label="URL de la imagen"
                        rules={[{ required: true, message: 'Por favor ingrese la URL de la imagen' }]}
                    >
                        <Input placeholder="Ingrese la URL de la imagen" />
                    </Form.Item>
                    <Form.Item
                        name="autor"
                        label="Autor"
                        rules={[{ required: true, message: 'Por favor ingrese el autor' }]}
                    >
                        <Input placeholder="Ingrese el autor" />
                    </Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 24 }}>
                        <Button onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button type="primary" htmlType="submit" loading={loading} style={{ background: '#c4120a' }}>
                            Crear
                        </Button>
                    </div>
                </Form>
            </Modal>
            <SuccessModal visible={successVisible} onClose={() => setSuccessVisible(false)} />
        </>
    );
};

export default NewModal;
