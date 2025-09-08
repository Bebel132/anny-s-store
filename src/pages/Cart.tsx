import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { UseAuth } from "../hooks/UseAuth";
import type CartItem from "../types/cart";
import { cartService } from "../services/cart";

const Cart = () => {
  const { userId, getUserId } = UseAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartPrice, setCartPrice] = useState(0);

  useEffect(() => {
    getUserId();    
    cartService.list(`'${userId}'`).then((res) => {
      setCartItems(res.value);
    });
    cartService.retrieve(`'${userId}'`).then((res) => {
      setCartPrice(res.value[0].CartPrice);
    });
  }, [userId]);

  const handleCartChangePrice = (changeType : "increase" | "decrease", cartItem : CartItem) => {
    cartItem.Quantity = changeType === "increase" ? cartItem.Quantity + 1 : cartItem.Quantity - 1;
    cartService.put(cartItem).then(() => {
        cartService.list(`'${userId}'`).then((res) => {
            setCartItems(res.value);
        });
        cartService.retrieve(`'${userId}'`).then((res) => {
            setCartPrice(res.value[0].CartPrice);
        });
    });
  };

  return (
    <>
        <Menu selected="cart" />
        <div className="flex justify-center flex-col gap-3 w-[1250px] m-auto pt-5">
        <h1 className="text-2xl font-bold text-right">Total: R${cartPrice}</h1>
            {cartItems.length === 0 && <p>Seu carrinho está vazio</p>}
            <div className="flex flex-col gap-3">
                {cartItems.map((item) => (
                    <div key={item.Id} className="p-2 w-full flex gap-5 border rounded border-gray-300">
                        <div
                            className={`w-[300px] h-[250px] bg-cover bg-position-[center_top_-2rem] rounded-xl`}
                            style={{ backgroundImage: `url(${item.Product.File})` }}
                        />
                        <div className="w-full">
                            <h2 className="text-xl font-bold my-2">{item.Product.Name}</h2>
                            <div className="w-full flex justify-between items-center">
                                <p className="text-gray-600">R${item.Product.Price}</p>
                                <div className="flex items-center">
                                    <button className="border px-1 bg-green text-snow hover:bg-emerald cursor-pointer" onClick={() => handleCartChangePrice("decrease", item)}>&lt;</button>
                                    <span className="px-2 cursor-default">{item.Quantity}</span>
                                    <button className="border px-1 bg-green text-snow hover:bg-emerald cursor-pointer" onClick={() => handleCartChangePrice("increase", item)}>&gt;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  );
};

export default Cart;