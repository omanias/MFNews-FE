import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { Card, Typography, Alert } from 'antd';
import { getNews } from '../services/newsService';

const { Title, Text } = Typography;

interface NewsItem {
    id: string;
    titulo: string;
    autor: string;
    descripcion: string;
}

const NewsContainer: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getNews()
            .then(setNews)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div style={{ textAlign: 'center', marginTop: 40 }}><Spinner size={48} /></div>;
    if (error) return <Alert type="error" message="Error" description={error} showIcon style={{ margin: 32 }} />;
    if (!news.length) return <Text type="secondary" style={{ display: 'block', textAlign: 'center', margin: 32 }}>No hay noticias disponibles.</Text>;

    return (
        <div style={{ maxWidth: 700, margin: '32px auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {news.map(n => (
                <Card key={n.id}>
                    <Title level={5}>{n.titulo}</Title>
                    <Text type="secondary">Por {n.autor}</Text>
                    <div style={{ marginTop: 8 }}>{n.descripcion}</div>
                </Card>
            ))}
        </div>
    );
};

export default NewsContainer; 