import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import RestaurantList from './components/RestaurantList';
import CartPage from './components/CartPage';
import MenuPage from './components/MenuPage';
import UsersPage from './components/UsersPage';
import OrdersPage from './components/OrdersPage';
import RestaurantsAdminPage from './components/RestaurantsAdminPage';
import ReservationsPage from './components/ReservationsPage';
import ProfilePage from './components/ProfilePage';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const location = useLocation();

  React.useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const backButton = window.Telegram.WebApp.BackButton;
      if (['/', '/cart', '/orders', '/profile'].includes(location.pathname)) {
        backButton.hide();
      } else {
        backButton.show();
        backButton.onClick(() => {
          window.history.back();
        });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen pb-16 dark">
      <Routes>
        <Route path="/" element={<RestaurantList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/restaurants/:restaurantId/menu" element={<MenuPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/restaurants-admin" element={<RestaurantsAdminPage />} />
        <Route path="/restaurants/:restaurantId/reservations" element={<ReservationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* Перенаправление на главную страницу вместо NotFound */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}