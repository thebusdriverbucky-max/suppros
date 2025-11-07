import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SalesOverview from './pages/SalesOverview';
import ProductsAnalytics from './pages/ProductsAnalytics';
import Orders from './pages/Orders';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SalesOverview />} />
        <Route path="/sales" element={<SalesOverview />} />
        <Route path="/products" element={<ProductsAnalytics />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Layout>
  );
}

export default App;
