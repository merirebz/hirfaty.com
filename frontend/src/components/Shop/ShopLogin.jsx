// import { React, useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import styles from "../../styles/styles";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";
// import LoadingButton from "../Layout/LoadingButton";

// const ShopLogin = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [visible, setVisible] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     setLoading(true);

//     e.preventDefault();

//     await axios
//       .post(
//         `${server}/shop/login-shop`,
//         {
//           email: email.toLowerCase(),
//           password,
//         },
//         { withCredentials: true }
//       )
//       .then((res) => {
//         setLoading(false);

//         toast.success("Login Success!");
//         navigate("/dashboard");
//         window.location.reload(true);
//       })
//       .catch((err) => {
//         setLoading(false);
//         toast.error(err.response.data.message);
//       });
//   };

//   return (
//     <>
//       <div className=" flex flex-col justify-center py-12 bg-white  ">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white rounded-md sm:border-solid  border border-gray-200 border-none  py-8 px-8  ">
//           <div className=" w-full flex justify-center items-center mb-4 ">
//             <h2 className=" text-center text-[20px] capitalize font-[700] text-gray-900">
//               Login to your shop
//             </h2>
//           </div>
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="email"
//                   name="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   type={visible ? "text" : "password"}
//                   name="password"
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//                 {visible ? (
//                   <AiOutlineEye
//                     className="absolute right-2 top-2 cursor-pointer"
//                     size={25}
//                     onClick={() => setVisible(false)}
//                   />
//                 ) : (
//                   <AiOutlineEyeInvisible
//                     className="absolute right-2 top-2 cursor-pointer"
//                     size={25}
//                     onClick={() => setVisible(true)}
//                   />
//                 )}
//               </div>
//             </div>
//             <div className={`${styles.noramlFlex} justify-between`}>
//               <div className={`${styles.noramlFlex}`}>
//                 <input
//                   type="checkbox"
//                   name="remember-me"
//                   id="remember-me"
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label
//                   htmlFor="remember-me"
//                   className="ml-2 block text-sm text-gray-900"
//                 >
//                   Remember me
//                 </label>
//               </div>
//               <div className="text-sm">
//                 <a
//                   href="/forgot-password-seller"
//                   className="font-medium text-blue-600 hover:text-blue-500"
//                 >
//                   Forgot your password?
//                 </a>
//               </div>
//             </div>
//             <div>
//               <LoadingButton isSending={loading} textButton={"Submit"} />
//             </div>
//             <div className={`${styles.noramlFlex} w-full`}>
//               <h4>Not have any account?</h4>
//               <Link to="/shop-create" className="text-blue-600 pl-2">
//                 Sign Up
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ShopLogin;


import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import LoadingButton from "../Layout/LoadingButton";
import backgroundImage from "../../Assests/image/bg.jpeg"; 
import { useTranslation } from "react-i18next";

const ShopLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
const { t } = useTranslation();
  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();

    await axios
      .post(
        `${server}/shop/login-shop`,
        {
          email: email.toLowerCase(),
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setLoading(false);

        toast.success("Login Success!");
        navigate("/dashboard");
        window.location.reload(true);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  return (
     <div
        
          className="flex items-center justify-center
           min-h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
      <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg border border-white/20 p-8 rounded-lg shadow-lg">
      
          
            <h2 className=" text-center text-2xl font-bold text-white mb-6">
              {t("Logintoyourshop")}
            </h2>
         
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
            <label className="block text-sm font-medium text-white">
              {t("Email")}
            </label>
        
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                />
              
            </div>
            <div>
            <label className="block text-sm font-medium text-white">
              {t("Password")}
            </label>
              {/* <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div> */}
               <div className="relative">
                            <input
                              type={visible ? "text" : "password"}
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              class="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            {visible ? (
                              <AiOutlineEye
                                className="absolute right-3 top-3 cursor-pointer text-white"
                                size={24}
                                onClick={() => setVisible(false)}
                              />
                            ) : (
                              <AiOutlineEyeInvisible
                                className="absolute right-3 top-3 cursor-pointer text-white"
                                size={24}
                                onClick={() => setVisible(true)}
                              />
                            )}
                          </div>
            </div>
             <div className="flex justify-between text-sm text-white">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          {t("RememberMe")}
                        </label>
                        <Link to="/forgot-password" className="no-underline hover:text-black">
                          {t("Forgotyourpassword")}?
                        </Link>
                      </div>
           
              <LoadingButton isSending={loading} textButton={t("login")} />
          
            <div className="text-center text-white">
            <span>{t("Nothaveanyaccount")}</span>
              <Link to="/shop-create" className="text-white-400 pl-2 no-underline hover:text-black">
              {t("SignUp")}
              </Link>
            </div>
          </form>
        
      </div>
      </div>
  );
};

export default ShopLogin;
