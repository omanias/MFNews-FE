import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Typography } from 'antd';

const { Title, Text } = Typography;

interface EditModalProps {
    visible: boolean;
    onClose: () => void;
    initialValues: {
        url: string;
        autor: string;
        titulo: string;
        subtitulo?: string;
        descripcion?: string;
    };
    onSave: (values: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({ visible, onClose, initialValues, onSave }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            form.setFieldsValue(initialValues);
        }
    }, [visible, initialValues, form]);

    const handleCancel = () => {
        onClose();
        form.resetFields();
    };

    const handleOk = (values: any) => {
        onSave(values);
        form.resetFields();
        onClose();
    };

    return (
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
                <Title level={5} style={{ color: '#c4120a', marginBottom: 0 }}>Editar Noticia</Title>
                <Text>Editar los siguientes datos.</Text>
            </div>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleOk}
            >
                <Form.Item label="Url" name="url" rules={[{ required: true, message: 'Ingrese la URL' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Autor" name="autor" rules={[{ required: true, message: 'Ingrese el autor' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Título" name="titulo" rules={[{ required: true, message: 'Ingrese el título' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Subtítulo" name="subtitulo">
                    <Input />
                </Form.Item>
                <Form.Item label="Descripción" name="descripcion">
                    <Input.TextArea rows={3} />
                </Form.Item>
                <Form.Item style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 0 }}>
                    <Button onClick={handleCancel} style={{ background: '#f5f5f5', color: '#c4120a', border: 'none', fontWeight: 'bold', width: 120 }}>
                        Cancelar
                    </Button>
                    <Button htmlType="submit" style={{ background: '#f26522', color: 'white', fontWeight: 'bold', border: 'none', width: 120 }}>
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditModal; 