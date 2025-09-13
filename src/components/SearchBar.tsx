import { productsService } from "../services/products";

interface SeachBarProps {
    setProducts: any;
    selectedCategory: string | null;
}

const SearchBar = ({setProducts, selectedCategory} : SeachBarProps) => {
  const handleSearch = (query: string) => {
    productsService
      .list(
        selectedCategory !== null
            ? `&$filter=Categoria eq '${selectedCategory}' and (contains(tolower(Name),tolower('${query}')) or contains(tolower(Categoria),tolower('${query}')))&$top=6`
            : `&$filter=contains(tolower(Name),tolower('${query}')) or contains(tolower(Categoria),tolower('${query}'))&$top=6`
      )
      .then((res) => {
        setProducts(res.value);
      });
  };

  return (
    <div className="px-3 xl:px-0">
      <input
        type="text"
        name=""
        id=""
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full border-gray-300 border p-1"
        placeholder="buscar"
      />
    </div>
  );
};

export default SearchBar;
