import React from 'react';
import { Card, Typography, Image, Button } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface NewsCardProps {
    id: string;
    title: string;
    subtitle?: string;
    image_url: string;
    author: string;
    date: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ id, title, subtitle, image_url, author, date }) => {
    const navigate = useNavigate();

    return (
        <Card
            hoverable
            cover={
                <Image
                    alt={title}
                    src={image_url}
                    style={{ height: 200, objectFit: 'cover' }}
                />
            }
        >
            <Title level={4}>{title}</Title>
            {subtitle && <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>{subtitle}</Text>}
            <div style={{ marginBottom: 16 }}>
                <Text type="secondary">
                    <UserOutlined style={{ marginRight: 8 }} />
                    {author}
                </Text>
                <Text type="secondary" style={{ marginLeft: 16 }}>
                    <CalendarOutlined style={{ marginRight: 8 }} />
                    {new Date(date).toLocaleDateString()}
                </Text>
            </div>
            <div style={{ textAlign: 'right' }}>
                <Button
                    type="primary"
                    style={{
                        background: '#c4120a',
                        color: 'white',
                        fontWeight: 'bold',
                        border: 'none'
                    }}
                    onClick={() => navigate(`/news/${id}`)}
                >
                    Leer
                </Button>
            </div>
        </Card>
    );
};

export default NewsCard; 