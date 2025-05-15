import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { categoriesData } from "../static/data";
import { server } from "../server";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/Route/ProductCard/ProductCard"; 
import { useTranslation } from "react-i18next";

const CategoryPage = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const category = categoriesData.find(
    (cat) => cat.name.toLowerCase() === name.toLowerCase()
  );
  const { t } = useTranslation();
 
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
       
        const responseProducts = await fetch(
          `${server}/product/get-products-by-category/${name}`
        );
        if (!responseProducts.ok) {
          throw new Error("Failed to fetch products");
        }
        const productsData = await responseProducts.json();
        setProducts(productsData.products);
        setFilteredProducts(productsData.products);

       
        const responseSubcategories = await fetch(
          `${server}/product/get-subcategories-by-category/${name}`
        );
        if (!responseSubcategories.ok) {
          throw new Error("Failed to fetch subcategories");
        }
        const subcategoriesData = await responseSubcategories.json();
        setSubcategories(subcategoriesData.subcategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [name]);

  
  const handleSubcategoryClick = (subcategory) => {
    const filtered = products.filter(
      (product) => product.subCategory === subcategory
    );
    setFilteredProducts(filtered);
  };

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!category) {
    return <div>Category not found.</div>;
  }
  
const handlePriceFilterChange = (range) => {
  setFilteredProducts(
    products.filter(
      (product) =>
        product.originalPrice >= range[0] && product.originalPrice <= range[1]
    )
  );
};
const formattedCategoryName = category.name.replace(/([A-Z])/g, " $1"); 
{t(formattedCategoryName.trim())} 

  return (
    <div>
      <Header />

      
      <div style={{ position: "relative", height: "600px", overflow: "hidden" }}>
        <img
          src={category.banner}
          alt={category.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(80%)",
          }}
        />
        <h1
          style={{
            position: "absolute",
            bottom: "20px",
            left: "40px",
            color: "white",
            fontSize: "36px",
            fontWeight: "bold",
          }}
        >
          {t(category.name)}
        </h1>
      </div>

      
      <div className="py-10 px-5 md:px-10">
      <h2
  className="text-2xl font-semibold mb-6"
  style={{ fontFamily: "Roboto, sans-serif" }}
>
  {t("Products in")} {t(name)}
</h2>        <div className="flex flex-col lg:flex-row gap-6">
      
          <FilterSidebar
            subcategories={subcategories}
            onSubcategoryClick={handleSubcategoryClick}
            onPriceFilterChange={handlePriceFilterChange}
            minPrice={0} 
            maxPrice={10000}
          />

          
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} data={product} /> 
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 text-lg">
                No products found in this subcategory.
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
