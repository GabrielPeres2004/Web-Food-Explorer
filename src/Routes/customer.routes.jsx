import { Routes, Route, Navigate } from 'react-router-dom';


import { Home } from "../pages/Home";
import { Preview } from '../pages/preview'
import { Payment } from "../pages/payment";
import { MyFavorites } from "../pages/MyFavorites";
import { Orders } from "../pages/Orders";
import { Profile } from "../pages/Profile";


export function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/preview/:id" element={<Preview />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/favorite" element={<MyFavorites />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/orderHistory" element={<Orders />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}