import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import { fetchProducts } from "./store/productsSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="*"
            element={
              <div className="state-box">
                <h2>Page not found</h2>
                <Link to="/" className="btn btn-primary">
                  Back to Home
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
}
