import { Routes, Route, Navigate } from 'react-router-dom';

import { Home } from "../pages/Home";
import { Preview } from '../pages/preview'
import { NewDish } from "../pages/newDish";
import { EditDish } from "../pages/editDish";
import { Orders } from "../pages/Orders";
import { Profile } from "../pages/Profile";

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/preview/:id" element={<Preview />} />
      <Route path="/editDish/:id" element={<EditDish />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/newDish" element={<NewDish />} />
      <Route path="/orderHistory" element={<Orders />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}