import { useNavigate } from "react-router";
import pagesMap from "../routes/pagesMap";

interface MenuProps {
  selected?: "home" | "cart";
}

const Menu = ({ selected }: MenuProps) => {
  const navigate = useNavigate();
  const menuOptions = [
    { name: "Home", value: "home", link: pagesMap.home },
    { name: "Carrinho", value: "cart", link: pagesMap.cart },
  ];

  return (
    <div className="bg-emerald w-[95%] flex mx-auto rounded-b-xl">
      {menuOptions.map((option) => (
        <div
          key={option.value}
          className={`
            text-snow 
            w-40 
            h-15 
            justify-center 
            items-center 
            flex 
            font-bold 
            cursor-pointer ${
                selected === option.value ? "bg-teal underline" : ""
            }
            ${option === menuOptions[0] ? "rounded-bl-lg" : ""}
        `}
          onClick={() => navigate(option.link)}
        >
          {option.name}
        </div>
      ))}
    </div>
  );
};

export default Menu;
