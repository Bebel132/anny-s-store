import { useNavigate } from "react-router";
import pagesMap from "../routes/pagesMap";

interface MenuProps {
  selected?: "home" | "cart" | "profile";
}

const Menu = ({ selected }: MenuProps) => {
  const navigate = useNavigate();
  const menuOptions = [
    { name: "Home", value: "home", link: pagesMap.home },
    { name: "Carrinho", value: "cart", link: pagesMap.cart },
  ];

  return (
    <div className="bg-emerald w-[95%] flex row mx-auto rounded-b-xl justify-between">
      <div className="flex">
          {menuOptions.map((option) => (
            <button
              key={option.value}
              className={`
                text-snow 
                w-40 
                h-15 
                justify-center 
                items-center 
                flex 
                font-bold 
                cursor-pointer
                ${selected === option.value ? "bg-teal underline" : "hover:bg-teal-500"}
                ${option === menuOptions[0] ? "rounded-bl-xl" : ""}
              `}
              onClick={() => navigate(option.link)}
            >
              {option.name}
            </button>
        ))}
      </div>
        <button 
          className={`
            text-snow 
            w-40 
            h-15 
            justify-center 
            items-center 
            flex 
            ${selected === "profile" ? "bg-teal underline" : "hover:bg-teal-500"}
            font-bold 
            rounded-br-xl
            cursor-pointer`}
          onClick={() => navigate(pagesMap.profile)}
        >
          Perfil
        </button>
    </div>
  );
};

export default Menu;
