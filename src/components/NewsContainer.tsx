import React from 'react';
import Spinner from './Spinner';
import { Typography, Alert } from 'antd';
import NewsCard from './NewsCard';

const { Text } = Typography;

interface NewsItem {
    id: string;
    title: string;
    subtitle?: string;
    image_url: string;
    author: string;
    date: string;
}

interface NewsContainerProps {
    news: NewsItem[];
    loading: boolean;
    error: string | null;
    fetchData: () => void;
}

const NewsContainer: React.FC<NewsContainerProps> = ({ news, loading, error }) => {
    if (loading) return <div style={{ textAlign: 'center', marginTop: 40 }}><Spinner size={48} /></div>;
    if (error) return <Alert type="error" message="Error" description={error} showIcon style={{ margin: 32 }} />;
    if (!news.length) return <Text type="secondary" style={{ display: 'block', textAlign: 'center', margin: 32 }}>No hay noticias disponibles.</Text>;

    return (
        <div style={{
            maxWidth: 1200,
            margin: '32px auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
            padding: '0 16px'
        }}>
            {news.map(n => (
                <NewsCard
                    key={n.id}
                    id={n.id}
                    title={n.title}
                    subtitle={n.subtitle}
                    image_url={n.image_url}
                    author={n.author}
                    date={n.date}
                />
            ))}
        </div>
    );
};

export default NewsContainer; 