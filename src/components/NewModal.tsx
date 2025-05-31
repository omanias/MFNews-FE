import React, { useState } from 'react';
import { Modal, Form, Input, Button, Typography, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { createNews } from '../services/newsService';
import { useNavigate } from 'react-router-dom';
import SuccessModal from './SuccessModal';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';

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
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const navigate = useNavigate();

    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const isAdmin = user.role === 'admin';

    const handleCancel = () => {
        onClose();
        form.resetFields();
        setFileList([]);
    };

    const handleOk = async (values: any) => {
        if (!isAdmin) {
            message.error('Solo los administradores pueden crear noticias');
            onClose();
            return;
        }

        if (fileList.length === 0) {
            message.error('Por favor suba una imagen');
            return;
        }

        try {
            setLoading(true);
            // Here you would typically upload the image to your server/storage
            // and get back the URL. For now, we'll use a placeholder
            const imageUrl = URL.createObjectURL(fileList[0].originFileObj as Blob);

            await createNews({
                title: values.titulo,
                subtitle: values.subtitulo,
                body: values.descripcion,
                image_url: imageUrl,
                author: values.autor,
                date: new Date().toISOString()
            });
            form.resetFields();
            setFileList([]);
            onClose();
            if (onNewsCreated) onNewsCreated();
            setSuccessVisible(true);
        } catch (error) {
            message.error('Error al crear la noticia');
        } finally {
            setLoading(false);
        }
    };

    const uploadProps = {
        onRemove: () => {
            setFileList([]);
        },
        beforeUpload: (file: RcFile) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                message.error('Solo se pueden subir archivos de imagen!');
                return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('La imagen debe ser menor a 2MB!');
                return false;
            }
            setFileList([{
                uid: file.uid,
                name: file.name,
                status: 'done',
                url: URL.createObjectURL(file),
                originFileObj: file
            }]);
            return false;
        },
        fileList,
        maxCount: 1,
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
                        label="Imagen"
                        required
                        tooltip="Sube una imagen para la noticia (máximo 2MB)"
                    >
                        <Upload {...uploadProps} listType="picture">
                            <Button icon={<UploadOutlined />}>Subir imagen</Button>
                        </Upload>
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
