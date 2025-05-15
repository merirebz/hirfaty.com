import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const FilterSection = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();

  return (
    <div className="border-b border-white/20 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full font-medium text-lg text-black hover:text-orange-400 transition"
      >
        {title}
        {open ? (
          <ChevronUp className="w-5 h-5 text-black/70" />
        ) : (
          <ChevronDown className="w-5 h-5 text-black/70" />
        )}
      </button>
      {open && <div className="mt-4 space-y-2">{children}</div>}
    </div>
  );
};

const FilterSidebar = ({
  subcategories,
  onSubcategoryClick,
  onPriceFilterChange,
  minPrice,
  maxPrice,
}) => {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const { t } = useTranslation();

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    const updatedRange =
      e.target.name === "minPrice"
        ? [value, priceRange[1]]
        : [priceRange[0], value];
    setPriceRange(updatedRange);
    onPriceFilterChange(updatedRange);
  };

  return (
    <aside className="w-full sm:w-72 bg-transparent p-6 border border-white/20 backdrop-blur-md rounded-lg">
      <FilterSection title={t("Subcategories")}>
        <div className="space-y-3">
          {subcategories.map((subcategory) => (
            <label
              key={subcategory}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onSubcategoryClick(subcategory)}
            >
              <input
                type="radio"
                name="subcategory"
                className="h-4 w-4 border-black text-orange-400 focus:ring-orange-400"
              />
              <span className="text-sm text-black">{t(subcategory)}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title={t("Price")}>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label htmlFor="minPrice" className="text-black text-sm">
              {t("Min:")}
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              className="w-24 bg-transparent border border-black/30 rounded p-1 text-black placeholder-black focus:ring-orange-400 focus:border-orange-400"
              value={priceRange[0]}
              onChange={handlePriceChange}
              min={minPrice}
              max={priceRange[1]}
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="maxPrice" className="text-black text-sm">
              {t("Max:")}
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              className="w-24 bg-transparent border border-black/30 rounded p-1 text-black placeholder-black focus:ring-orange-400 focus:border-orange-400"
              value={priceRange[1]}
              onChange={handlePriceChange}
              min={priceRange[0]}
              max={maxPrice}
            />
          </div>

          <div className="mt-2">
            <input
              type="range"
              className="w-full h-2 rounded-lg bg-black/20 accent-orange-400"
              value={priceRange[1]}
              min={minPrice}
              max={maxPrice}
              step="10"
              onChange={(e) =>
                handlePriceChange({
                  target: { name: "maxPrice", value: e.target.value },
                })
              }
            />
          </div>

          <div className="flex justify-between text-sm text-black/70">
            <span>DH {priceRange[0]}</span>
            <span>DH {priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>
    </aside>
  );
};

export default FilterSidebar;
