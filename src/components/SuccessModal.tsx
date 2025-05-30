import React from 'react';
import { Modal, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface SuccessModalProps {
    visible: boolean;
    onClose: () => void;
    mainMessage?: string;
    subMessage?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
    visible,
    onClose,
    mainMessage = 'La noticia se creó exitosamente',
    subMessage = 'La nueva noticia fue creada, para editarla ingrese en el detalle de la misma',
}) => (
    <Modal
        open={visible}
        footer={null}
        closable={false}
        centered
        onCancel={onClose}
        bodyStyle={{ padding: 32, borderRadius: 12, textAlign: 'center' }}
        style={{ borderRadius: 12, minWidth: 340 }}
        maskClosable={true}
    >
        <div style={{ position: 'absolute', top: 16, right: 20, cursor: 'pointer', fontSize: 20 }} onClick={onClose}>
            <CloseOutlined style={{ color: '#c4120a' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
            <svg width="48" height="48" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" fill="#eee" />
                <polyline points="16,25 22,31 33,19" fill="none" stroke="#888" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
        <Title level={5} style={{ color: '#c4120a', fontWeight: 'bold', marginBottom: 8 }}>{mainMessage}</Title>
        <Text style={{ color: '#444' }}>{subMessage}</Text>
    </Modal>
);

export default SuccessModal; 