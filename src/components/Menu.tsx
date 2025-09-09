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
    <div className="bg-green w-full lg:w-[95%] flex row mx-auto rounded-b-xl justify-between">
      <div className="flex">
          {menuOptions.map((option) => (
            <button
              key={option.value}
              className={`
                text-snow 
                md:w-40
                w-25
                h-15 
                justify-center 
                items-center 
                flex 
                font-bold 
                cursor-pointer
                ${selected === option.value ? "bg-coral underline" : "hover:bg-snow hover:text-green border-1 border-green"}
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
            md:w-40
            w-25
            h-15 
            justify-center 
            items-center 
            flex
            ${selected === "profile" ? "bg-coral underline" : "hover:bg-snow hover:text-green border-1 border-green"}
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
