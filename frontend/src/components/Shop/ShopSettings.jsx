import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";
const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipcode] = useState(seller && seller.zipCode);
  const [country, setCountry] = useState(seller && seller.country);
  const [accountManager, setAccountManager] = useState(
    seller && seller.accountManager
  );
  const [otherShop, setOtherShop] = useState(seller && seller.otherShop);
  const [city, setCity] = useState(seller && seller.city);
  const [companyId, setCompanyId] = useState(seller && seller.companyId);
  const [fileCompanyId, setFileCompanyId] = useState();
  const [registryExtract, setRegistryExtract] = useState(
    seller && seller.registryExtract
  );
  const [numberICE, setNumberICE] = useState(seller && seller.numberICE);
  const [tva, setTva] = useState(seller && seller.tva);
  const [TitleOfTheAccount, setTitleOfTheAccount] = useState(
    seller && seller.TitleOfTheAccount
  );
  const [BankAccountNumber, setBankAccountNumber] = useState(
    seller && seller.BankAccountNumber
  );
  const [iban, setIban] = useState(seller && seller.iban);
  const [bankName, setBankName] = useState(seller && seller.bankName);
  const [bic, setBic] = useState(seller && seller.bic);
  const [codeBank, setCodeBank] = useState(seller && seller.codeBank);
  const [idBank, setIdBank] = useState(seller && seller.idBank);

  const dispatch = useDispatch();

  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/shop/update-shop-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(loadSeller());
        toast.success("Avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/shop/update-seller-info`,
        {
          name,
          description,
          address,
          phoneNumber,
          zipCode,
          country,
          accountManager,
          otherShop,
          city,
          companyId,
          fileCompanyId,
          registryExtract,
          numberICE,
          tva,
          TitleOfTheAccount,
          BankAccountNumber,
          iban,
          bankName,
          bic,
          codeBank,
          idBank,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Shop info updated succesfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleFileRegistryExtract = async (e) => {
    // const file = e.target.files[0];
    setRegistryExtract(e.target.files[0]);
    const formData = new FormData();
    formData.append("RegistryExtract", e.target.files[0]);

    await axios
      .put(`${server}/shop/update-RegistryExtract`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(loadSeller());
        toast.success("Registry Extract updated successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleFileCompanyId = async (e) => {
    setFileCompanyId(e.target.files[0]);
    const formData = new FormData();
    formData.append("fileCompanyId", e.target.files[0]);

    await axios
      .put(`${server}/shop/update-fileCompanyId`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(loadSeller());
        toast.success("file Company Id updated successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            {/* <img
              src={
                avatar ? URL.createObjectURL(avatar) : `${backend_url}/${seller.avatar}`
              }
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            /> */}
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : `${backend_url}/${seller.avatar}`
              }
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#ebf0f4] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        <form
          aria-aria-required={true}
          className="flex flex-col items-center"
          onSubmit={updateHandler}
        >
          {/* shop info */}
          <div className="bg-white my-3 rounded-lg w-full p-7">
            <div className="w-full ">
              <label className="block text-gray-500 text-xl pb-2">
                Shop Information
              </label>
            </div>
            <div className="flex w-[100%]">
              <div className="w-[100%]">
                <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                  <div className="w-full pl-[3%]">
                    <label className="block pb-2">Shop Name</label>
                  </div>
                  <input
                    type="name"
                    placeholder={`${seller.name}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                    required
                  />
                </div>
              </div>
              <div className="w-[100%]">
                <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                  <div className="w-full pl-[3%]">
                    <label className="block pb-2">Shop description</label>
                  </div>
                  <input
                    type="name"
                    placeholder={`${
                      seller?.description
                        ? seller.description
                        : "Enter your shop description"
                    }`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-[100%]">
              <div className="w-[100%]">
                <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                  <div className="w-full pl-[3%]">
                    <label className="block pb-2">Shop Address</label>
                  </div>
                  <input
                    type="name"
                    placeholder={seller?.address}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                    required
                  />
                </div>
              </div>
              <div className="w-[100%]">
                <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                  <div className="w-full pl-[3%]">
                    <label className="block pb-2">Shop Phone Number</label>
                  </div>
                  <input
                    type="number"
                    placeholder={seller?.phoneNumber}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex w-[100%]">
              <div className="w-[100%]">
                <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                  <div className="w-full pl-[3%]">
                    <label className="block pb-2">Shop Zip Code </label>
                  </div>
                  <input
                    type="number"
                    placeholder={seller?.zipCode}
                    value={zipCode}
                    onChange={(e) => setZipcode(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                    required
                  />
                </div>
              </div>
              <div className="w-[100%]">
                <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                  <div className="w-full pl-[3%]">
                    <label className="block pb-2">city</label>
                  </div>

                  <input
                    type="text"
                    placeholder={seller?.city}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex w-[100%]">
              <div className="w-[100%]">
                <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                  <div className="w-full pl-[3%]">
                    <label className="block pb-2">other Shop</label>
                  </div>
                  <input
                    type="text"
                    placeholder={seller?.otherShop}
                    value={otherShop}
                    onChange={(e) => setOtherShop(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                  />
                </div>
              </div>
              <div className="w-[100%]">
                <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                  <div className="w-full pl-[3%]">
                    <label className="block pb-2">country</label>
                  </div>

                  <input
                    type="text"
                    placeholder={seller?.country}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                  />
                </div>
              </div>
            </div>
          </div>
          {seller.typeShop == "cooperative" || seller.typeShop == "company" ? (
            /* company info */
            <div className="bg-white rounded-lg my-3 w-full p-7">
              <div className="w-full ">
                <label className="block text-gray-500 text-xl pb-2">
                  Company Information
                </label>
              </div>
              <div className="flex w-[100%]">
                <div className="w-[100%]">
                  <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                    <div className="w-full pl-[3%]">
                      <label className="block pb-2">company Id </label>
                    </div>
                    <input
                      type="text"
                      placeholder={seller?.companyId}
                      value={companyId}
                      onChange={(e) => setCompanyId(e.target.value)}
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                    />
                  </div>
                </div>
                <div className="w-[100%]">
                  <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                    <div className="w-full pl-[3%]">
                      <label className="block pb-2">number ICE</label>
                    </div>

                    <input
                      type="text"
                      placeholder={seller?.numberICE}
                      value={numberICE}
                      onChange={(e) => setNumberICE(e.target.value)}
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex w-[100%]">
                <div className="w-[100%]">
                  <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                    <div className="w-full pl-[3%]">
                      <label className="block pb-2">account Manager</label>
                    </div>

                    <input
                      type="text"
                      placeholder={seller?.accountManager}
                      value={accountManager}
                      onChange={(e) => setAccountManager(e.target.value)}
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                    />
                  </div>
                </div>
                <div className="w-[100%]">
                  <div className="w-[100%] flex  flex-col 800px:w-[100%]  m-6 mt-14">
                    <div className={`${styles.noramlFlex} justify-between`}>
                      <div className={`${styles.noramlFlex}`}>
                        <input
                          type="checkbox"
                          value={tva}
                          onChange={(e) => setTva(!seller.tva)}
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block  text-gray-900"
                        >
                          Etes vous assujettis au régime de la TVA ?
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-[100%]">
                <div className="w-[100%]">
                  <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                    <div className="w-full pl-[3%]">
                      <label className="block pb-2">file Company Id </label>
                    </div>
                    {seller.fileCompanyId ? (
                      <div>
                        {" "}
                        <img
                          className="w-[30%] h-[30%]"
                          src={`${backend_url}/${seller.fileCompanyId}`}
                          alt=""
                        ></img>
                        <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                          <input
                            type="file"
                            id="fileCompanyIdHide"
                            className="hidden"
                            onChange={handleFileCompanyId}
                          />
                          <label htmlFor="fileCompanyIdHide">
                            <AiOutlineCamera />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label
                        htmlFor="file-input"
                        className="mx-5 flex w-[90%] items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <span>Upload a file Company Id</span>
                        <input
                          type="file"
                          name="fileCompanyId"
                          id="file-input"
                          onChange={handleFileCompanyId}
                          className="sr-only"
                        />
                      </label>
                    )}
                  </div>
                </div>
                <div className="w-[100%]">
                  <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                    <div className="w-full pl-[3%]">
                      <label className="block pb-2">registry Extract </label>
                    </div>
                    {seller.registryExtract ? (
                      <div>
                        {" "}
                        <img
                          className="w-[30%] h-[30%]"
                          src={`${backend_url}/${seller.registryExtract}`}
                          alt=""
                        ></img>
                        <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                          <input
                            type="file"
                            id="fileRegistryExtractHide"
                            className="hidden"
                            onChange={handleFileRegistryExtract}
                          />
                          <label htmlFor="fileRegistryExtractHide">
                            <AiOutlineCamera />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label
                        htmlFor="file-input"
                        className="mx-5 flex w-[90%] items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <span>Upload a file registry extract</span>
                        <input
                          type="file"
                          name="RegistryExtract"
                          id="file-input"
                          onChange={handleFileRegistryExtract}
                          className="sr-only"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {/* Bank info */}
          <div className="bg-white rounded-lg my-3 w-full p-7">
            <div className="w-full ">
              <label className="block text-gray-500 text-xl pb-2">
                Bank Information
              </label>
            </div>
            <div className="flex w-[100%]">
              <div className="w-[100%]">
                <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                  <div className="w-full pl-[3%]">
                    <label className="block pb-2">Title Of The Account</label>
                  </div>
                  <input
                    type="text"
                    placeholder={seller?.TitleOfTheAccount}
                    value={TitleOfTheAccount}
                    onChange={(e) => setTitleOfTheAccount(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                  />
                </div>
              </div>
              <div className="w-[100%]">
                <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                  <div className="w-full pl-[3%]">
                    <label className="block pb-2">Bank Account Number </label>
                  </div>
                  <input
                    type="text"
                    placeholder={seller?.BankAccountNumber}
                    value={BankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-[100%]">
              <div className="w-[100%]">
                <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                  <div className="w-full pl-[3%]">
                    <label className="block pb-2">bank Name </label>
                  </div>
                  <input
                    type="text"
                    placeholder={seller?.bankName}
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                  />
                </div>
              </div>
              <div className="w-[100%]">
                <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                  <div className="w-full pl-[3%]">
                    <label className="block pb-2">bic</label>
                  </div>
                  <input
                    type="text"
                    placeholder={seller?.bic}
                    value={bic}
                    onChange={(e) => setBic(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-[100%]">
              <div className="w-[100%]">
                <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                  <div className="w-full pl-[3%]">
                    <label className="block pb-2">code Bank </label>
                  </div>
                  <input
                    type="text"
                    placeholder={seller?.codeBank}
                    value={codeBank}
                    onChange={(e) => setCodeBank(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                  />
                </div>
              </div>
              <div className="w-[100%]">
                <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                  <div className="w-full pl-[3%]">
                    <label className="block pb-2">id Bank</label>
                  </div>
                  <input
                    type="text"
                    placeholder={seller?.idBank}
                    value={idBank}
                    onChange={(e) => setIdBank(e.target.value)}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                  />
                </div>
              </div>
            </div>
            <div className="w-[100%]">
              <div className="w-[100%] flex items-center flex-col 800px:w-[100%] mt-5">
                <div className="w-full pl-[3%]">
                  <label className="block pb-2">iban</label>
                </div>

                <input
                  type="text"
                  placeholder={seller?.iban}
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0 bg-[#ebf0f4]`}
                />
              </div>
            </div>
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <input
              type="submit"
              value="Update Shop"
              className={`${styles.input} !w-[95%] text-white mb-4 800px:mb-0 bg-[#f63b60] mb-7`}
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
