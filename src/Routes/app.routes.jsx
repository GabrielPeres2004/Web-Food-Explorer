import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { Preview } from '../pages/preview'
import { NewDish } from "../pages/newDish";
import { EditDish } from "../pages/editDish";
import { Payment } from "../pages/payment";
import { MyFavorites } from "../pages/MyFavorites";
import { Orders } from "../pages/Orders";
import { Profile } from "../pages/Profile";

export function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/preview/:id" element={<Preview />} />
            <Route path="/newDish" element={<NewDish />} />
            <Route path="/editDish" element={<EditDish />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/favorite" element={<MyFavorites />} />
            <Route path="/orderHistory" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />

        </Routes>

    )
}