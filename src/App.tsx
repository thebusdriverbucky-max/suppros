import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SalesOverview from './pages/SalesOverview';
import ProductsAnalytics from './pages/ProductsAnalytics';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SalesOverview />} />
        <Route path="/sales" element={<SalesOverview />} />
        <Route path="/products" element={<ProductsAnalytics />} />
      </Routes>
    </Layout>
  );
}

export default App;
