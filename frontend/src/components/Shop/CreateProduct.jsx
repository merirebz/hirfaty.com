import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";
import { useTranslation } from "react-i18next";
import English_language from "../../Assests/image/langFlag/English_language.png";
import Arabic_language from "../../Assests/image/langFlag/Arabic_language.png";
import French_language from "../../Assests/image/langFlag/Flag_of_France.png";

const CreateProduct = () => {
  const { t } = useTranslation();
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [hasDiscount, setHasDiscount] = useState(false);
  const [Lang, setLang] = useState("AR");

  const [images, setImages] = useState([]);

  const [name, setName] = useState({
    ar: "",
    fr: "",
    en: "",
  });

  const [description, setDescription] = useState({
    ar: "",
    fr: "",
    en: "",
  });

  const [category, setCategory] = useState({ name: "", id: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [certificate, setCertificate] = useState(false);
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [typeofcertificate, setTypeofcertificate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDiscount = (e) => {
    setHasDiscount(!hasDiscount);
    setDiscountPrice("");
    setOriginalPrice("");
  };

  const handleCategorie = (value) => {
    category.title = categoriesData[value - 1].title;
    category.id = value;

    setCategory(category);
    setSelectedCategory(value);
    console.log(category);
  };

  const handleSubmit = (e) => {
    if (!discountPrice && originalPrice) {
      setDiscountPrice(originalPrice);
    }
    setLoading(true);

    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name[ar]", name.ar);
    newForm.append("name[fr]", name.fr);
    newForm.append("name[en]", name.en);

    newForm.append("description[ar]", description.ar);
    newForm.append("description[fr]", description.fr);
    newForm.append("description[en]", description.en);

    newForm.append("category", JSON.stringify(category));
    newForm.append("subCategory", subCategory);
    newForm.append("certificate", certificate);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    discountPrice !== ""
      ? newForm.append("discountPrice", discountPrice)
      : newForm.append("discountPrice", 0);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    dispatch(createProduct(newForm))
      .then((res) => {
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="pb-8 px-4 sm:px-10 mt-10 bg-white border w-full sm:w-[70%] border-gray-200 rounded-lg shadow-sm mx-auto">

          <h1 className="text-xl py-4 font-semibold text-gray-900 sm:text-2xl ">
            {t("Create Product")}
          </h1>


          <form onSubmit={handleSubmit}>
            <div className="mb-8 flex justify-center  items-center flex-col ">
              <p className="block mb-5 uppercase  font-medium text-gray-900 ">
                Choose The Language :
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-around w-full items-center">

                <div
                  onClick={() => setLang("EN")}
                  className={`cursor-pointer w-full sm:w-[30%] py-2 flex justify-center items-center bg-gray-50 ${
                    Lang === "EN" ? "border-2 border-primary-400" : "border-2 border-gray-300"
                  } rounded-md`}
                  
                >
                  <img
                    src={English_language}
                    className=" w-10"
                    alt="englishFlag"
                  />
                  <span className=" ml-3 font-semibold ">ENGLISH</span>
                </div>
                <div
                  onClick={() => setLang("AR")}
                  className={`cursor-pointer w-full sm:w-[30%] py-2 flex justify-center items-center bg-gray-50 ${
                    Lang === "EN" ? "border-2 border-primary-400" : "border-2 border-gray-300"
                  } rounded-md`}
                >
                  <img
                    src={Arabic_language}
                    className=" w-10"
                    alt="arabicFlag"
                  />
                  <span className=" ml-3 font-semibold ">ARABIC</span>
                </div>
                <div
                  onClick={() => setLang("FR")}
                  className={`cursor-pointer w-full sm:w-[30%] py-2 flex justify-center items-center bg-gray-50 ${
                    Lang === "EN" ? "border-2 border-primary-400" : "border-2 border-gray-300"
                  } rounded-md`}
                >
                  <img
                    src={French_language}
                    className=" w-10"
                    alt="frenchFlag"
                  />
                  <span className=" ml-3 font-semibold ">FRENCH</span>
                </div>
              </div>
            </div>
            {Lang === "EN" ? (
              <>
                <div className="mb-6">
                  <label className="block mb-2  font-medium text-gray-900 ">
                    {t("Product Name")} EN
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name.en}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setName({ ...name, en: e.target.value })}
                    placeholder="Enter your product name..."
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2  font-medium text-gray-900 ">
                    {t("Description")} EN
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    cols="30"
                    required
                    rows="8"
                    type="text"
                    name="description"
                    value={description.en}
                    className="block p-2.5 w-full text-sm text-gray-900 outline-none bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    onChange={(e) =>
                      setDescription({ ...description, en: e.target.value })
                    }
                    placeholder="Enter your product description..."
                  ></textarea>
                </div>
              </>
            ) : (
              ""
            )}

            {Lang === "AR" ? (
              <>
                <div className="mb-6">
                  <label className="block mb-2  font-medium text-gray-900 ">
                    {t("Product Name")} AR
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name.ar}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setName({ ...name, ar: e.target.value })}
                    placeholder="Enter your product name..."
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2  font-medium text-gray-900 ">
                    {t("Description")} AR
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    cols="30"
                    required
                    rows="8"
                    type="text"
                    name="description"
                    value={description.ar}
                    className="block p-2.5 w-full text-sm text-gray-900 outline-none bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    onChange={(e) =>
                      setDescription({ ...description, ar: e.target.value })
                    }
                    placeholder="Enter your product description..."
                  ></textarea>
                </div>
              </>
            ) : (
              ""
            )}

            {Lang === "FR" ? (
              <>
                <div className="mb-6">
                  <label className="block mb-2  font-medium text-gray-900 ">
                    {t("Product Name")} FR{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name.fr}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setName({ ...name, fr: e.target.value })}
                    placeholder="Enter your product name..."
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2  font-medium text-gray-900 ">
                    {t("Description")} FR{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    cols="30"
                    required
                    rows="8"
                    type="text"
                    name="description"
                    value={description.fr}
                    className="block p-2.5 w-full text-sm text-gray-900 outline-none bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    onChange={(e) =>
                      setDescription({ ...description, fr: e.target.value })
                    }
                    placeholder="Enter your product description..."
                  ></textarea>
                </div>
              </>
            ) : (
              ""
            )}

            <div className="mb-6">
              <label className="block mb-2  font-medium text-gray-900 ">
                {t("Category")} <span className="text-red-500">*</span>
              </label>
              {category.title}
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                value={category.title}
                onChange={(e) => handleCategorie(e.target.value)}
              >
                <option value="Choose a category">Choose a category</option>
                {categoriesData &&
                  categoriesData.map((i) => {
                    return (
                      <option value={i.id} key={i.id}>
                        {t(i.name)}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="mb-6">
              <label className="block mb-2  font-medium text-gray-900 ">
                {t("Subcategory")} <span className="text-red-500">*</span>
              </label>
              <div>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  <option value="Choose a category">Choose a category</option>
                  {categoriesData[selectedCategory - 1]
                    ? categoriesData[selectedCategory - 1].subcategories.map(
                        (i, idx) => {
                          console.log(idx);
                          return (
                            <option value={i} key={idx}>
                              {t(i)}
                            </option>
                          );
                        }
                      )
                    : null}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2  font-medium text-gray-900 ">
                {t("Tags")}
              </label>
              <input
                type="text"
                name="tags"
                value={tags}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter your product tags..."
              />
            </div>

            <div className="mb-6  flex items-center ">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                onChange={handleDiscount}
              />
              <label className=" ml-3  font-medium text-gray-900 ">
                {t("do you have discount")}
              </label>
            </div>

            <div className="mb-6">
              <label className="block mb-2  font-medium text-gray-900 ">
                {hasDiscount ? t("original Price") : t("Price")}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                onWheel={(e) => e.target.blur()}
                name="price"
                value={originalPrice}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="Enter your product price with discount..."
              />
            </div>

            {hasDiscount ? (
              <>
                <div className="mb-6">
                  <label className="block mb-2  font-medium text-gray-900 ">
                    {t("Price (with discount)")}
                  </label>

                  <input
                    type="number"
                    name="price"
                    onWheel={(e) => e.target.blur()}
                    value={discountPrice}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    placeholder="Enter your product price..."
                  />
                </div>
              </>
            ) : null}

            <div className="mb-6">
              <label className="block mb-2  font-medium text-gray-900 ">
                {t("Product Stock")} <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={stock}
                min={"1"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) => setStock(e.target.value)}
                placeholder="Enter your product stock..."
              />
            </div>

            <div className="mb-6 flex items-center  ">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                onChange={(e) => setCertificate(!certificate)}
              />
              <label
                className="ml-3  font-medium text-gray-900 "
                htmlFor="ONSA"
              >
                {t("do you have certificate")}
              </label>
            </div>

            {certificate ? (
              <>
                <div className="mb-6">
                  <label className=" block mb-2  font-medium text-gray-900 ">
                    {t("Typeofcertificate")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={typeofcertificate}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setTypeofcertificate(e.target.value)}
                    placeholder="Enter your product name..."
                  />
                </div>
              </>
            ) : null}

            <div>
              <label className="block mb-2   font-medium text-gray-900 ">
                {t("Upload Images")} <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name=""
                id="upload"
                className="hidden"
                multiple
                onChange={handleImageChange}
              />
            </div>

            <div className="w-full flex items-center flex-wrap gap-2">

              <label htmlFor="upload">
                <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
              </label>
              {images &&
                images.map((i, idx) => (
                  <img
                    src={URL.createObjectURL(i)}
                    key={idx}
                    alt=""
                    loading="lazy"
                    className="h-[120px] w-[120px] object-cover m-2 border-[3px] border-gray-300 rounded-md  "
                  />
                ))}
            </div>

            <div className="mt-10 w-full flex justify-center ">
            <input
  type="submit"
  value="Create"
  className="text-white w-full sm:w-[85%] cursor-pointer bg-primary-500 hover:bg-primary-600 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
/>

            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateProduct;
