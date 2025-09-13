import { useState } from "react";

interface CategoriesDropdownProps {
    selectedCategory: string | null; 
    setSelectedCategory: any 
}

const CategoriesDropdown = ({selectedCategory, setSelectedCategory} : CategoriesDropdownProps) => {
    const [openCategories, setOpenCategories] = useState(false);
    
    const categories = ["chaveiros", "bolsas", "Amigurumi"];

    const handleSelectCategory = (category: string) => {
        if (selectedCategory !== category) {
        setSelectedCategory(category);
        } else {
        setSelectedCategory(null);
        }
    };

    return (
        <div className="flex flex-col h-full w-[180px] lg:w-[230px]">
            <div className="fixed md:relative">
              <button className={`p-2 mt-3 bg-green text-snow w-max lg:w-[230px] font-semibold text-[15px] md:text-[18px] ${openCategories ? "rounded-t-lg" : "rounded-lg"}`} onClick={() => setOpenCategories(!openCategories)}>
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
                    w-full
                    ${selectedCategory === category ? "bg-green border-1 border-green text-snow" : " border-1 border-snow hover:border-green"}
                    ${i === categories.length - 1 ? "rounded-b-xl" : ""}
                  `}
                  key={category}
                  onClick={() => handleSelectCategory(category)}
                >
                  {category} <input type="radio" name="category" id={category} checked={selectedCategory === category} />
                </button>
              ))}
            </div>
          </div>
    )
}

export default CategoriesDropdown;