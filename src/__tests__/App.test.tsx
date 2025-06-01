import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import App from '../App';
import * as newsService from '../services/newsService';

// Extend expect matchers
declare global {
    namespace Vi {
        interface Assertion {
            toBeInTheDocument(): void;
        }
    }
}

// Mock sessionStorage
const mockSessionStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
    removeItem: vi.fn(),
    length: 0,
    key: vi.fn()
};

Object.defineProperty(window, 'sessionStorage', {
    value: mockSessionStorage
});

interface NewsItem {
    id: number;
    title: string;
    content: string;
}

describe('App Component', () => {
    beforeEach(() => {
        mockSessionStorage.getItem.mockClear();
        mockSessionStorage.getItem.mockImplementation(() => null);
    });

    it('renders without crashing', async () => {
        const mockNews: NewsItem[] = [
            { id: 1, title: 'Test News', content: 'Test Content' }
        ];

        vi.spyOn(newsService, 'getNews').mockResolvedValue(mockNews);

        render(<App />);

        await waitFor(() => {
            const element = screen.getByText('Test News');
            expect(element).toBeTruthy();
        });
    });
}); 