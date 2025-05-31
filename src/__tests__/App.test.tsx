/// <reference path="../types/jest.d.ts" />
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import '@testing-library/jest-dom';
import App from '../App';
import * as newsService from '../services/newsService';

interface NewsItem {
    id: number;
    title: string;
    content: string;
}

jest.mock('../services/newsService');
const getNewsMock = jest.fn();
(newsService.getNews as any) = getNewsMock;

describe('App', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<App />);
        expect(document.body).toBeTruthy();
    });

    it('shows loading state initially', () => {
        getNewsMock.mockImplementation(() => new Promise(() => { }));
        render(<App />);
        (expect(screen.getByText(/cargando/i)) as any).toBeInTheDocument();
    });

    it('shows error state when news fetch fails', async () => {
        const errorMessage = 'Error fetching news';
        (getNewsMock as any).mockRejectedValue(new Error(errorMessage));

        render(<App />);

        await waitFor(() => {
            (expect(screen.getByText(errorMessage)) as any).toBeInTheDocument();
        });
    });

    it('shows news when data is fetched successfully', async () => {
        const mockNews: NewsItem[] = [
            { id: 1, title: 'Test News 1', content: 'Content 1' },
            { id: 2, title: 'Test News 2', content: 'Content 2' },
        ];
        (getNewsMock as any).mockResolvedValue(mockNews);

        render(<App />);

        await waitFor(() => {
            (expect(screen.getByText('Test News 1')) as any).toBeInTheDocument();
            (expect(screen.getByText('Test News 2')) as any).toBeInTheDocument();
        });
    });
}); 