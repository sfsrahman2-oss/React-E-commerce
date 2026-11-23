import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const items = useSelector((s) => s.wishlist.items);

  if (items.length === 0) {
    return (
      <div className="state-box">
        <h2>Your wishlist is empty ♡</h2>
        <Link to="/" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="page-title">Wishlist</h1>
      <div className="grid">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
