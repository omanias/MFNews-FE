import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Image, Button, Spin, Alert, Modal, message } from 'antd';
import { UserOutlined, CalendarOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { getNews, deleteNews, updateNews } from '../services/newsService';
import EditModal from './EditModal';

const { Title, Text } = Typography;

interface NewsItem {
    id: string;
    title: string;
    subtitle?: string;
    body: string;
    image_url: string;
    author: string;
    date: string;
}

const NewsDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [news, setNews] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editVisible, setEditVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const isAdmin = user.role === 'admin';

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const data = await getNews();
                const newsItem = data.find((item: NewsItem) => String(item.id) === String(id));
                if (newsItem) {
                    setNews(newsItem);
                } else {
                    setError('Noticia no encontrada');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar la noticia');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [id]);

    if (loading) return <div style={{ textAlign: 'center', marginTop: 40 }}><Spin size="large" /></div>;
    if (error) return <Alert type="error" message="Error" description={error} showIcon style={{ margin: 32 }} />;
    if (!news) return <Alert type="warning" message="Noticia no encontrada" showIcon style={{ margin: 32 }} />;

    const handleEditSave = async (values: any) => {
        try {
            const updated = await updateNews(news.id, {
                image_url: values.url,
                author: values.autor,
                title: values.titulo,
                subtitle: values.subtitulo,
                body: values.descripcion
            });
            setNews(updated);
            message.success('Noticia actualizada correctamente');
        } catch (err) {
            message.error('Error al actualizar la noticia');
        }
    };

    const handleDelete = () => {
        setDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteNews(news.id);
            message.success('Noticia eliminada correctamente');
            navigate('/');
        } catch (err) {
            message.error('Error al eliminar la noticia');
        }
        setDeleteModalVisible(false);
    };

    return (
        <div style={{ maxWidth: 800, margin: '32px auto', padding: '0 16px' }}>
            <Image
                src={news.image_url}
                alt={news.title}
                style={{ width: '100%', height: 400, objectFit: 'cover', marginBottom: 24 }}
            />

            <Title level={2}>{news.title}</Title>
            {news.subtitle && (
                <Title level={4} style={{ color: '#666', marginBottom: 24 }}>
                    {news.subtitle}
                </Title>
            )}

            <div style={{ marginBottom: 24 }}>
                <Text type="secondary">
                    <UserOutlined style={{ marginRight: 8 }} />
                    {news.author}
                </Text>
                <Text type="secondary" style={{ marginLeft: 16 }}>
                    <CalendarOutlined style={{ marginRight: 8 }} />
                    {new Date(news.date).toLocaleDateString()}
                </Text>
            </div>

            <Text style={{ fontSize: 16, lineHeight: 1.8 }}>
                {news.body}
            </Text>

            <div style={{ marginTop: 32, display: 'flex', gap: 16 }}>
                {isAdmin && (
                    <>
                        <Button type="primary" onClick={() => setEditVisible(true)} style={{ background: '#c4120a' }}>
                            Editar
                        </Button>
                        <Button danger onClick={handleDelete}>
                            Eliminar
                        </Button>
                    </>
                )}
                <Button
                    type="default"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate(-1)}
                >
                    Volver
                </Button>
            </div>
            <EditModal
                visible={editVisible}
                onClose={() => setEditVisible(false)}
                onSave={handleEditSave}
                initialValues={{
                    url: news.image_url,
                    autor: news.author,
                    titulo: news.title,
                    subtitulo: news.subtitle,
                    descripcion: news.body
                }}
            />
            <Modal
                open={deleteModalVisible}
                onOk={confirmDelete}
                onCancel={() => setDeleteModalVisible(false)}
                okText="Eliminar"
                okButtonProps={{ danger: true }}
                cancelText="Cancelar"
            >
                ¿Estás seguro de que deseas eliminar esta noticia?
            </Modal>
        </div>
    );
};

export default NewsDetails; 