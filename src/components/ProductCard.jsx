import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import { useToast } from "./Toast";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const showToast = useToast();
  const wished = useSelector((s) =>
    s.wishlist.items.some((i) => i.id === product.id)
  );

  const handleAdd = () => {
    dispatch(addToCart(product));
    showToast("Added to cart ✓");
  };

  return (
    <article className="card">
      <button
        className={`wish-btn ${wished ? "active" : ""}`}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => {
          dispatch(toggleWishlist(product));
          showToast(wished ? "Removed from wishlist" : "Added to wishlist ♥");
        }}
      >
        {wished ? "♥" : "♡"}
      </button>

      <Link to={`/product/${product.id}`} className="card-img">
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>

      <div className="card-body">
        <span className="category">{product.category}</span>
        <Link to={`/product/${product.id}`} className="card-title" title={product.title}>
          {product.title}
        </Link>
        <div className="card-footer">
          <span className="price">৳{product.price.toFixed(2)}</span>
          <button className="btn btn-primary" onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
