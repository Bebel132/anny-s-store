import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { productsService } from "../services/products";
import type Product from "../types/product";
import { UseAuth } from "../hooks/UseAuth";
import { cartService } from "../services/cart";
import type Cart from "../types/cart";
import { useNavigate } from "react-router";
import pagesMap from "../routes/pagesMap";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { userId, getUserId, checkAuth, ready } = UseAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentCount, setCurrentCount] = useState(6);
  const [currentSkip, setCurrentSkip] = useState(0);
  const [cart, setCart] = useState<Cart | null>(null);
  const [openCategories, setOpenCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories = ["chaveiros", "bolsas", "Amigurumi"];

  useEffect(() => {
    checkAuth();
    if (!ready) {
      navigate(pagesMap.login);
    }
  }, [ready]);

  useEffect(() => {
    setLoading(true);
    productsService.list("top=6").then((res) => {
      setProducts(res.value);
      setTotalCount(res["@odata.count"]);
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
        .list(`&$top=6&$filter=Categoria eq '${selectedCategory}'`)
        .then((res) => {
          setProducts(res.value);
          setCurrentCount(res.value.length);
          setTotalCount(res["@odata.count"]);
          setLoading(false);
        });
    } else {
      productsService.list("top=6").then((res) => {
        setProducts(res.value);
        setTotalCount(res["@odata.count"]);
        setLoading(false);
      });
    }
  }, [selectedCategory]);

  const handlePagination = (skip: number, next: boolean) => {
    productsService.list(`$skip=${skip}&$top=6`).then((res) => {
      setProducts(res.value);
      next
        ? setCurrentCount(currentCount + res.value.length)
        : setCurrentCount(currentCount - products.length);
    });
  };

  const handleSearch = (query: string) => {
    productsService
      .list(
        `&$top=6&$filter=contains(tolower(Name),tolower('${query}')) or contains(tolower(Categoria),tolower('${query}'))`
      )
      .then((res) => {
        setProducts(res.value);
        console.log(products);
        setCurrentCount(res.value.length);
        setTotalCount(res["@odata.count"]);
      });
  };

  const handleAddToCart = async (product: Product) => {
    const payload = {
      CartId: cart?.Id,
      ProductId: product.Id,
      Quantity: 1,
    };
    await cartService.post(payload);
  };

  const handleSelectCategory = (category: string) => {
    if (selectedCategory !== category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  };

  return (
    <>
      <Menu selected="home" />
      <div className="flex justify-center flex-col gap-3 w-[1250px] m-auto pt-5">
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full m-auto border-gray-300 border p-1"
          placeholder="buscar"
        />
        <div className="flex gap-4">

          <div className="flex flex-col h-full w-[230px]">
            <button className={` p-2 bg-teal text-snow font-semibold ${openCategories ? "rounded-t-lg bg-teal-700" : "rounded-lg hover:bg-teal-700"}`} onClick={() => setOpenCategories(!openCategories)}>
              categorias &nbsp; {openCategories ? "▼" : "▲"}
            </button>
            {openCategories && categories.map((category, i) => (
              <button 
                className={`
                  flex 
                  justify-between 
                  items-center 
                  p-2 
                  cursor-pointer 
                  ${selectedCategory === category ? "bg-teal-700 text-snow" : "hover:bg-emerald-300"}
                  ${i === categories.length - 1 ? "rounded-b-xl" : ""}
                `} 
                key={category} 
                onClick={() => handleSelectCategory(category)}
              >
                {category} <input type="radio" name="category" id={category} checked={selectedCategory === category} />
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-10 justify-center items-center w-full">
            {loading ? <p>Loading...</p> : products.map((product) => (
              <div key={product.Id} className="w-full m-auto">
                <div
                  className={`w-full h-[250px] bg-cover bg-position-[center_top_-2rem] rounded-xl`}
                  style={{ backgroundImage: `url(${product.File})` }}
                />
                <h2 className="text-xl font-bold my-2">{product.Name}</h2>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">R${product.Price}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-emerald-500 text-white p-2 rounded cursor-pointer hover:bg-emerald-600"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
          <div className="flex justify-center items-center gap-5 w-full pb-5">
            <button
              className="bg-teal-400 text-white px-2 py-0.5 rounded cursor-pointer hover:bg-teal disabled:opacity-50 disabled:hover:bg-teal-400 disabled:cursor-not-allowed"
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
              {currentCount} de {totalCount}
            </span>
            <button
              className="bg-teal-400 text-white px-2 py-0.5 rounded cursor-pointer hover:bg-teal disabled:opacity-50 disabled:hover:bg-teal-400 disabled:cursor-not-allowed"
              disabled={currentSkip + 6 >= totalCount}
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