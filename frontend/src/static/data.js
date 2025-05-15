import EnglishFlag from "../Assests/image/langFlag/English_language.png";
import FrenchFlag from "../Assests/image/langFlag/Flag_of_France.png";
import ArabicFlag from "../Assests/image/langFlag/Arabic_language.png";
import DarijaFlag from "../Assests/image/langFlag/Flag_of_Morocco.svg.webp";

// navigation Data
export const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "BestSelling",
    url: "/best-selling",
  },
  {
    title: "Products",
    url: "/products",
  },
  {
    title: "AboutUs",
    url: "/about",
  },
  {
    title: "FAQ",
    url: "/faq",
  },
  {
    title:"Blog",
    url:"/blog"
  },
];

export const LanguageData = [
  {
    id: 1,
    value: "en",
    title: "English",
    img: EnglishFlag,
  },
  {
    id: 2,
    value: "fr",
    title: "French",
    img: FrenchFlag,
  },
  {
    id: 3,
    value: "ar",
    title: "Arabic",
    img: ArabicFlag,
  },
  {
    id: 4,
    value: "dr",
    title: "Darija",
    img: DarijaFlag,
  },
];

// Type shop data
export const TypeShopData = [
  {
    id: 0,
    title: "cooperative",
  },
  {
    id: 1,
    title: "company",
  },
  {
    id: 2,
    title: "Self-contractor",
  },
];

// categories data
export const categoriesData = [
  {
    id: 1,
    name: "BeautyandHealth",
    subcategories: ["Makeup", "SkinCare", "Perfumes"],
  },
  {
    id: 2,
    name: "Clothingand",
    subcategories: ["MenClothing", "WomenClothing", "Childrensclothing"],
  },
  {
    id: 3,
    name: "Shoes",
    subcategories: ["ManShoes", "WomenShoes", "ChildrensShoes"],
  },
  {
    id: 4,
    name: "Accessories",
    subcategories: ["Sunglasses", "Hats", "Jewelry", "Bags"],
  },
  {
    id: 5,
    name: "HomeandKitchen",
    subcategories: [
      "Furniture",
      "Decoration",
      "KitchenUtensils",
      "KitchenAccessories",
    ],
  },
  {
    id: 6,
    name: "LocalProducts",
    subcategories: [
      "SemolinaAndFlour",
      "EdibleOils",
      "HydrosolsAndEssentialOils",
      "HoneyAmlouAndJam",
    ],
  },
  // {
  //   id: 7,
  //   name: "Others",
  //   icone: "faEyes",
  // },
];

export const footerSupportLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Products",
    link: "/products",
  },
  {
    name: "BestSelling",
    link: "/best-selling",
  },
  {
    name: "AboutUs",
    link: "/about",
  },
  {
    name: "Co",
    link: "/conditions-ge",
  },
  {
    name: "FAQ",
    link: "/faq",
  },
  {
    name:"Blog",
    link:"/blog"
  },
  
];

export const footerProductLinks = [
  {
    name: "About us",
    link: "/about",
  },
  {
    name: "pricing",
    link: "/pricing",
  },
  {
    name: "Conditions Générales de Vente",
    link: "/conditions-ge",
  },
];

export const footercompanyLinks = [
  {
    name: "PetCare",
  },
  {
    name: "Gifts",
  },
  {
    name: "MobileandTablets",
  },
  {
    name: "Others",
  },
];
