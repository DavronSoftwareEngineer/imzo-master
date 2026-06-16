import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import PlasticWindowsPage from './pages/PlasticWindowsPage';
import AluminumWindowsPage from './pages/AluminumWindowsPage';
import ForCafesPage from './pages/ForCafesPage';
import CalculatorPage from './pages/CalculatorPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="plastic-windows" element={<PlasticWindowsPage />} />
            <Route path="aluminum-windows" element={<AluminumWindowsPage />} />
            <Route path="for-cafes" element={<ForCafesPage />} />
            <Route path="calculator" element={<CalculatorPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
