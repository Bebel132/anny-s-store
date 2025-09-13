import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { productsService } from "../services/products";
import type Product from "../types/product";
import { UseAuth } from "../hooks/UseAuth";
import { cartService } from "../services/cart";
import type Cart from "../types/cart";
import { useNavigate } from "react-router";
import pagesMap from "../routes/pagesMap";
import SearchBar from "../components/SearchBar";
import CategoriesDropdown from "../components/CategoriesDropdown";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { userId, getUserId, checkAuth, ready } = UseAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSkip, setCurrentSkip] = useState(0);
  const [cart, setCart] = useState<Cart | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    if (!ready) {
      navigate(pagesMap.login);
    }
  }, [ready]);

  useEffect(() => {
    setLoading(true);
    productsService.list("top=6").then((res) => {
      setTotalPages(Math.ceil(res["@odata.count"] / 6));
      setProducts(res.value);
      getUserId();
    });
  }, []);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    cartService.retrieve(`'${userId}'`).then((res) => {
      setCart(res.value[0]);
      setLoading(false);
    });
  }, [userId]);

  useEffect(() => {
    setLoading(true);
    if (selectedCategory) {
      productsService
        .list(`$filter=Categoria eq '${selectedCategory}'&$top=6`)
        .then((res) => {
          setProducts(res.value);
          setLoading(false);
          setTotalPages(Math.ceil(res["@odata.count"] / 6));
        });
    } else {
      productsService.list("top=6").then((res) => {
        setProducts(res.value);
        setLoading(false);
      });
    }
  }, [selectedCategory]);

  const handlePagination = (skip: number, next: boolean) => {
    productsService.list(`$skip=${skip}&$top=6`).then((res) => {
      setProducts(res.value);
      setCurrentPage((prev) => (next ? prev + 1 : prev - 1));
    });
  };

  return (
    <>
      <Menu selected="home" />
      <div className="flex justify-center flex-col gap-3 xl:w-[1250px] sm:w-full m-auto pt-5">
        <SearchBar
          setProducts={setProducts}
          selectedCategory={selectedCategory}
        />
        <div className="flex lg:gap-4 px-2 relative">
          <CategoriesDropdown
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 justify-center items-center w-full">
            {loading ? (
              <p>carregando...</p>
            ) : (
              products.map((product) => (
                <ProductCard product={product} cartId={cart?.Id} />
              ))
            )}
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 w-full pb-5">
          <button
            className="bg-green text-white px-2 py-0.5 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentSkip === 0}
            onClick={() => {
              const newSkip = currentSkip - 6;
              setCurrentSkip(newSkip);
              handlePagination(newSkip, false);
            }}
          >
            &lt;
          </button>
          <span>
            pagina {currentPage} de {totalPages}
          </span>
          <button
            className="bg-green text-white px-2 py-0.5 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={totalPages! * 6 <= currentSkip + 6}
            onClick={() => {
              const newSkip = currentSkip + 6;
              setCurrentSkip(newSkip);
              handlePagination(newSkip, true);
            }}
          >
            &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
