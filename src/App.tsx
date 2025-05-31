import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar';
import NewsContainer from './components/NewsContainer';
import NewsDetails from './components/NewsDetails';
import Footer from './components/Footer';
import NewModal from './components/NewModal';
import Login from './components/Login';
import { getNews } from './services/newsService';

const AppContent: React.FC = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const location = useLocation();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNews();
      setNews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      fetchData();
    }
  }, [location.pathname]);

  // Mostrar solo el login en la ruta /login
  if (location.pathname === '/login') {
    return <Login />;
  }

  return (
    <>
      <NavBar onNew={() => setModalVisible(true)} />
      <Routes>
        <Route path="/" element={
          <NewsContainer news={news} loading={loading} error={error} fetchData={fetchData} />
        } />
        <Route path="/news/:id" element={<NewsDetails />} />
      </Routes>
      <NewModal visible={modalVisible} onClose={() => setModalVisible(false)} onNewsCreated={fetchData} />
      <Footer />
    </>
  )
}

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
