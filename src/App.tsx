import { Route, Routes } from 'react-router-dom';
import { CallbackPage } from './pages/CallbackPage';
import { NotFoundPage } from './pages/NotFoundPage';
import ProductTable from './components/ProductTable';
import ProductView from './pages/ProductView';
import { NavBar } from './components/Navbar';

export const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<CallbackPage />} />
        <Route path="/api/products">
          <Route index element={<ProductTable />} />
          <Route path=":id" element={<ProductView />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
