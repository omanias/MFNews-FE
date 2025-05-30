import React, { useState } from 'react';
import { Modal, Form, Input, Button, Typography } from 'antd';
import SuccessModal from './SuccessModal';

const { Title, Text } = Typography;

interface NewModalProps {
    visible: boolean;
    onClose: () => void;
}

const NewModal: React.FC<NewModalProps> = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const [successVisible, setSuccessVisible] = useState(false);

    const handleCancel = () => {
        onClose();
        form.resetFields();
    };

    const handleOk = (values: any) => {
        form.resetFields();
        onClose();
        setTimeout(() => setSuccessVisible(true), 300)
    };

    return (
        <>
            <Modal
                open={visible}
                footer={null}
                onCancel={handleCancel}
                centered
                closable={false}
                bodyStyle={{ padding: 24, borderRadius: 10 }}
                style={{ borderRadius: 10 }}
            >
                <div style={{ textAlign: 'center', marginBottom: 12 }}>
                    <Title level={5} style={{ color: '#c4120a', marginBottom: 0 }}>Nueva Noticia</Title>
                    <Text>Completar los siguientes datos.</Text>
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
            <SuccessModal
                visible={successVisible}
                onClose={() => setSuccessVisible(false)}
            />
        </>
    );
};

export default NewModal;
