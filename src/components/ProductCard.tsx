import { useToast } from "../hooks/UseToast";
import { cartService } from "../services/cart";
import type Product from "../types/product";

interface ProductCardProps {
    product: Product;
    cartId: number | undefined;
}

const ProductCard = ({product, cartId} : ProductCardProps) => {
  const { showToast } = useToast();

  const handleAddToCart = async (product: Product) => {
    const payload = {
      CartId: cartId,
      ProductId: product.Id,
      Quantity: 1,
    };
    
    await cartService.post(payload);
    showToast("Produto adicionado!", "success");
  };

  return (
    <div
      key={product.Id}
      className="w-full m-auto duration-150 p-3 rounded hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        className={`w-full xl:h-[250px] md:h-[300px] h-[230px] bg-cover bg-position-[center_top_-2rem] rounded-xl`}
        style={{
          backgroundImage: `url(data:image/jpeg;base64,${product.File})`,
        }}
      />
      <h2 className="text-xl font-bold my-2">{product.Name}</h2>
      <div className="flex justify-between gap-3 items-center">
        <p className="text-gray-600">R${product.Price}</p>
        <button
          onClick={() => handleAddToCart(product)}
          className="bg-coral w-max border-1 border-coral text-white p-2 rounded cursor-pointer hover:bg-snow hover:text-coral"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
