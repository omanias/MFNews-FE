import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Typography, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';

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
    onSave: (values: any, imageFile?: File) => void;
}

const EditModal: React.FC<EditModalProps> = ({ visible, onClose, initialValues, onSave }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        if (visible) {
            form.setFieldsValue(initialValues);
            if (initialValues.url) {
                setFileList([{
                    uid: '-1',
                    name: 'imagen-actual',
                    status: 'done',
                    url: initialValues.url
                }]);
            }
        }
    }, [visible, initialValues, form]);

    const handleCancel = () => {
        onClose();
        form.resetFields();
        setFileList([]);
    };

    const handleOk = (values: any) => {
        if (fileList.length === 0) {
            message.error('Por favor suba una imagen');
            return;
        }

        const imageFile = fileList[0].originFileObj as File | undefined;

        onSave({
            ...values,
            url: initialValues.url
        }, imageFile);

        form.resetFields();
        setFileList([]);
        onClose();
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
                <Form.Item
                    label="Imagen"
                    required
                    tooltip="Sube una imagen para la noticia (máximo 2MB)"
                >
                    <Upload {...uploadProps} listType="picture">
                        <Button icon={<UploadOutlined />}>Subir imagen</Button>
                    </Upload>
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
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 24 }}>
                    <Button onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button type="primary" htmlType="submit" style={{ background: '#c4120a' }}>
                        Guardar
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default EditModal; 