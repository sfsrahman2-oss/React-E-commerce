import { useDispatch } from "react-redux";
import { fetchProducts } from "../store/productsSlice";

export function Loader({ text = "Loading products…" }) {
  return (
    <div className="state-box" role="status">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}

export function ErrorBox({ message }) {
  const dispatch = useDispatch();
  return (
    <div className="state-box error" role="alert">
      <h2>Something went wrong</h2>
      <p>{message}</p>
      <button className="btn btn-primary" onClick={() => dispatch(fetchProducts())}>
        Try again
      </button>
    </div>
  );
}
