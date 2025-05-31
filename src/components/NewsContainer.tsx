import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { Typography, Alert } from 'antd';
import NewsCard from './NewsCard';
import { searchNews } from '../services/newsService';

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
    searchQuery?: string;
}

const NewsContainer: React.FC<NewsContainerProps> = ({ news, loading, error, fetchData, searchQuery }) => {
    const [searchResults, setSearchResults] = useState<NewsItem[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    useEffect(() => {
        const performSearch = async () => {
            if (!searchQuery) {
                setSearchResults([]);
                return;
            }

            setSearchLoading(true);
            setSearchError(null);
            try {
                const results = await searchNews(searchQuery);
                setSearchResults(results);
            } catch (err) {
                setSearchError('Error al buscar noticias');
                console.error('Search error:', err);
            } finally {
                setSearchLoading(false);
            }
        };

        performSearch();
    }, [searchQuery]);

    const displayNews = searchQuery ? searchResults : news;
    const isLoading = loading || searchLoading;
    const displayError = error || searchError;

    if (isLoading) return <div style={{ textAlign: 'center', marginTop: 40 }}><Spinner size={48} /></div>;
    if (displayError) return <Alert type="error" message="Error" description={displayError} showIcon style={{ margin: 32 }} />;
    if (!displayNews.length) return <Text type="secondary" style={{ display: 'block', textAlign: 'center', margin: 32 }}>
        {searchQuery ? 'No se encontraron noticias que coincidan con la búsqueda.' : 'No hay noticias disponibles.'}
    </Text>;

    return (
        <div style={{
            maxWidth: 1200,
            margin: '32px auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
            padding: '0 16px'
        }}>
            {displayNews.map(n => (
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