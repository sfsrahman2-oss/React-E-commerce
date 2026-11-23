import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import { useToast } from "../components/Toast";
import { Loader } from "../components/Status";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const showToast = useToast();

  const fromStore = useSelector((s) =>
    s.products.items.find((p) => String(p.id) === id)
  );
  const [fetched, setFetched] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const product = fromStore || fetched;
  const wished = useSelector((s) =>
    s.wishlist.items.some((i) => String(i.id) === id)
  );

  // Fallback: if the user opens the URL directly, fetch this single product.
  useEffect(() => {
    if (fromStore) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Product not found.");
        return r.text();
      })
      .then((text) => {
        if (!text) throw new Error("Product not found.");
                if (!cancelled) {
          const p = JSON.parse(text);
          setFetched({ ...p, price: Math.round(p.price * 120) });
        }
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id, fromStore]);

  if (loading) return <Loader text="Loading product…" />;
  if (error || !product)
    return (
      <div className="state-box error">
        <h2>{error || "Product not found."}</h2>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );

  return (
    <>
      <Link to="/" className="back-link">
        ← Back to products
      </Link>
      <div className="details">
        <div className="details-img">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="details-info">
          <span className="category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="price big">৳{product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>
          <div className="actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch(addToCart(product));
                showToast("Added to cart ✓");
              }}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-outline"
              onClick={() => {
                dispatch(toggleWishlist(product));
                showToast(wished ? "Removed from wishlist" : "Added to wishlist ♥");
              }}
            >
              {wished ? "♥ In Wishlist" : "♡ Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 
