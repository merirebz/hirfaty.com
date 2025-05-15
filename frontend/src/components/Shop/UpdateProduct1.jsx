import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProductById } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import Loader from "../Layout/Loader";
import { backend_url, server } from "../../server";
import axios from "axios";
import { useTranslation } from "react-i18next";
import English_language from "../../Assests/image/langFlag/English_language.png";
import Arabic_language from "../../Assests/image/langFlag/Arabic_language.png";
import French_language from "../../Assests/image/langFlag/Flag_of_France.png";

const UpdateProduct = ({ closeDialog }) => {
  const { t } = useTranslation();

  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const { product } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Lang, setLang] = useState("AR");
  const [images, setImages] = useState(product?.images);

  const [name, setName] = useState({
    ar: product?.name.ar || "",
    fr: product?.name.fr || product?.name || "",
    en: product?.name.en || "",
  });

  const [description, setDescription] = useState({
    ar: product?.description.ar || "",
    fr: product?.description.fr || product?.description || "",
    en: product?.description.en || "",
  });

  const [category, setCategory] = useState(
    product ? JSON.parse(product?.category) : null
  );
  const [selectedCategory, setSelectedCategory] = useState(
    product?.category?.id
  );
  const [subCategory, setSubCategory] = useState(product?.subCategory);
  const [certificate, setCertificate] = useState(product?.certificate);
  const [tags, setTags] = useState(product?.tags);
  const [originalPrice, setOriginalPrice] = useState(product?.originalPrice);
  const [discountPrice, setDiscountPrice] = useState(product?.discountPrice);
  const [stock, setStock] = useState(product?.stock);
  const [file, setFile] = useState(null);
  const [hasDiscount, setHasDiscount] = useState(
    discountPrice !== 0 ? true : false
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSubCategory(subCategory);
  }, [dispatch, error, success, subCategory]);

  const handleImageChange = async (e) => {
    setFile(true);
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages(files);
    console.log(files, images);

    images.forEach((image) => {
      console.log(image);
    });
    const newForm = new FormData();

    files.forEach((image) => {
      newForm.append("images", image);
    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    await axios.post(
      `${server}/product/update-product-images/${product._id}`,
      newForm,
      config
    );
  };

  const handleCategorie = (value) => {
    category.title = categoriesData[value - 1].title;
    category.id = value;
    setSubCategory(null);
    setSelectedCategory(null);
    setCategory(category);
    setSelectedCategory(value);
  };

  const handleSubmit = (e) => {
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

    newForm.append("category", category ? JSON.stringify(category) : null);
    newForm.append("subCategory", subCategory);
    newForm.append("certificate", certificate);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    discountPrice === 0 || discountPrice === ""
      ? newForm.append("discountPrice", 0)
      : newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    dispatch(updateProductById(product._id, newForm))
      .then((res) => {
        closeDialog();
        setLoading(false);
        navigate("/dashboard");
        // window.location.reload();
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className=" fixed top-0 left-0 z-50   w-full h-full overflow-x-hidden overflow-y-auto ">
        <div className="relative top-[2rem] z-[80] w-[50rem] h-fit   m-auto mb-20 bg-white rounded-lg shadow  ">
          <div className="flex items-start justify-between  p-5 border-b rounded-t ">
            <h3 className="text-xl font-semibold ">Update Product</h3>
            <button
              type="button"
              onClick={closeDialog}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="edit-user-modal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6 space-y-6 ">
            {loading ? (
              <Loader />
            ) : (
              <form onSubmit={handleSubmit} className="w-full overflow-auto">
                <div className="mb-8 flex justify-center  items-center flex-col ">
                  <p className="block mb-5 uppercase  font-medium text-gray-900 ">
                    Choose The Language :
                  </p>
                  <div className=" flex w-full justify-around  items-center ">
                    <div
                      onClick={() => setLang("EN")}
                      className={`cursor-pointer w-[20%] py-2 flex justify-center items-center  bg-gray-50  ${
                        Lang === "EN"
                          ? "border-2 border-primary-400"
                          : "border-2 border-gray-300"
                      }  rounded-md `}
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
                      className={` cursor-pointer w-[20%] py-2 flex justify-center items-center  bg-gray-50  ${
                        Lang === "AR"
                          ? "border-2 border-primary-400"
                          : "border-2 border-gray-300"
                      } rounded-md `}
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
                      className={` cursor-pointer w-[20%] py-2 flex justify-center items-center  bg-gray-50  ${
                        Lang === "FR"
                          ? "border-2 border-primary-400"
                          : "border-2 border-gray-300"
                      } rounded-md `}
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

                <div className="grid grid-cols-6 gap-6 mb-6 ">
                  {Lang === "EN" ? (
                    <>
                      <div className="col-span-6 ">
                        <label className="block mb-2  font-medium text-gray-900 ">
                          {t("Product Name")} EN
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={name.en}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          onChange={(e) =>
                            setName({ ...name, en: e.target.value })
                          }
                          placeholder="Enter your product name..."
                        />
                      </div>
                      <div className="col-span-6 ">
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
                            setDescription({
                              ...description,
                              en: e.target.value,
                            })
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
                      <div className="col-span-6 ">
                        <label className="block mb-2  font-medium text-gray-900 ">
                          {t("Product Name")} AR
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={name.ar}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          onChange={(e) =>
                            setName({ ...name, ar: e.target.value })
                          }
                          placeholder="Enter your product name..."
                        />
                      </div>
                      <div className="col-span-6 ">
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
                            setDescription({
                              ...description,
                              ar: e.target.value,
                            })
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
                      <div className="col-span-6 ">
                        <label className="block mb-2  font-medium text-gray-900 ">
                          {t("Product Name")} FR{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={name.fr}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          onChange={(e) =>
                            setName({ ...name, fr: e.target.value })
                          }
                          placeholder="Enter your product name..."
                        />
                      </div>
                      <div className="col-span-6 ">
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
                            setDescription({
                              ...description,
                              fr: e.target.value,
                            })
                          }
                          placeholder="Enter your product description..."
                        ></textarea>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  <div className="col-span-6 ">
                    <label className="block mb-2  font-medium text-gray-900">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="catgorie"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      value={category?.id}
                      onChange={(e) => handleCategorie(e.target.value)}
                    >
                      <option value={null}>Choise categories</option>
                      {categoriesData &&
                        categoriesData.map((i) => (
                          <option value={i.id} key={i.name}>
                            {t(i.name)}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="col-span-6 ">
                    <label className="block mb-2 font-medium text-gray-900">
                      Subcategory {product?.subCategory}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div>
                      <select
                        name="subcatgorie"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                      >
                        {subCategory === null ? (
                          <option selected value={null}>
                            Choose a subCategory
                          </option>
                        ) : (
                          <option value={null}>Choose a subCategory</option>
                        )}
                        {categoriesData[category?.id - 1]
                          ? categoriesData[category?.id - 1].subcategories.map(
                              (i) => (
                                <option value={i} key={i}>
                                  {t(i)}
                                </option>
                              )
                            )
                          : null}
                      </select>
                    </div>
                  </div>

                  <div className="col-span-6  ">
                    <label className="block mb-2  font-medium text-gray-900">
                      Tags
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

                  <div className="flex items-center col-span-6  ">
                    <input
                      type="checkbox"
                      checked={hasDiscount}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      onChange={(e) => setHasDiscount(!hasDiscount)}
                    />
                    <label className=" ml-3  font-medium text-gray-900 ">
                      {t("do you have discount")}
                    </label>
                  </div>

                  <div className="col-span-6 ">
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
                      <div className="col-span-6 ">
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

                  <div className="col-span-6 ">
                    <label className="block mb-2  font-medium text-gray-900">
                      Product Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={stock}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="Enter your product stock..."
                    />
                  </div>

                  <div className="col-span-6 ">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      onChange={(e) => setCertificate(!certificate)}
                    />
                    <label
                      className="ml-3  font-medium text-gray-900 "
                      htmlFor="ONSA"
                    >
                      do you have certificate of (Onsa)
                    </label>
                  </div>

                  <div className="col-span-6 ">
                    <label className="block mb-2  font-medium text-gray-900">
                      Upload Images <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name=""
                      id="upload"
                      className="hidden"
                      multiple
                      onChange={handleImageChange}
                    />
                    <div className="w-full flex items-center flex-wrap">
                      <label htmlFor="upload">
                        <AiOutlinePlusCircle
                          size={30}
                          className="mt-3"
                          color="#555"
                        />
                      </label>
                      {images &&
                        images.map((i, idx) => (
                          <img
                            src={
                              file ? URL.createObjectURL(i) : backend_url + i
                            }
                            key={idx}
                            alt=""
                            loading="lazy"
                            className="h-[120px] w-[120px] object-cover m-2 border-[3px] border-gray-300 rounded-md "
                          />
                        ))}
                    </div>
                  </div>
                </div>

                <div className="mb-3 w-full flex justify-center  ">
                  <button
                    className="text-white w-[85%] cursor-pointer bg-primary-500  hover:bg-primary-600 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center "
                    type="submit"
                  >
                    Update Product
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div
          onClick={closeDialog}
          className="bg-gray-900   w-full h-full bg-opacity-70  fixed inset-0 z-40"
        ></div>
      </div>
    </>
  );
};

export default UpdateProduct;
