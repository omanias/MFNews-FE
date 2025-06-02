import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar';
import NewsContainer from './components/NewsContainer';
import NewsDetails from './components/NewsDetails';
import Footer from './components/Footer';
import NewModal from './components/NewModal';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import UserManagement from './components/UserManagement';
import { getNews } from './services/newsService';
import { viteEnv } from './config/vite-env';

const AppContent: React.FC = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const user = JSON.parse(sessionStorage.getItem(viteEnv.VITE_USER_KEY) || '{}');
  const isAuthenticated = Object.keys(user).length > 0;

  // Si no está autenticado y no está en la página de login o create-user, redirigir al login
  if (!isAuthenticated && !['/login', '/create-user'].includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado y está en la página de login, redirigir al inicio
  if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to="/" replace />;
  }

  if (location.pathname === '/login') {
    return <Login />;
  }

  const isAdmin = user.role === 'admin';

  if (location.pathname === '/create-user' && Object.keys(user).length > 0 && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (loading) return <div>Cargando...</div>;

  return (
    <>
      <NavBar onNew={() => setModalVisible(true)} onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={
          <NewsContainer
            news={news}
            loading={loading}
            error={error}
            searchQuery={searchQuery}
          />
        } />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/user-management" element={<UserManagement />} />
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
