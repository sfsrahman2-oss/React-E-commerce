import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { Loader, ErrorBox } from "../components/Status";

export default function Home() {
  const { items, categories, status, error } = useSelector((s) => s.products);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    let list = items.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        p.title.toLowerCase().includes(term)
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [items, search, category, sort]);

  if (status === "loading" || status === "idle") return <Loader />;
  if (status === "failed") return <ErrorBox message={error} />;

  return (
    <>
      <h1 className="page-title">Products</h1>

      <section className="filters">
        <input
          type="search"
          placeholder="Search products by name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort by price"
        >
          <option value="default">Sort by price</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </section>

      {visible.length === 0 ? (
        <div className="state-box">
          <p>No products match your search.</p>
        </div>
      ) : (
        <div className="grid">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  );
}
