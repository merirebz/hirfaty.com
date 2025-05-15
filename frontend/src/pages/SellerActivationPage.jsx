// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // Importer useNavigate
// import { server } from "../server";

// const SellerActivationPage = () => {
//   const { activation_token } = useParams();
//   const [error, setError] = useState(false);
//   const navigate = useNavigate(); // Initialiser le hook useNavigate

//   useEffect(() => {
//     if (activation_token) {
//       const sendRequest = async () => {
//         try {
//           const response = await axios.post(`${server}/shop/activation`, {
//             activation_token,
//           });
//           console.log(response);
//           // Rediriger vers le tableau de bord après une activation réussie
//           navigate("/dashboard"); // Redirection vers le tableau de bord
//         } catch (err) {
//           setError(true); // En cas d'erreur, afficher le message d'erreur
//         }
//       };
//       sendRequest();
//     }
//   }, [activation_token, navigate]); // Ajouter navigate à la dépendance du useEffect

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {error ? (
//         <p>Your token is expired!</p>
//       ) : (
//         <p>Your account has been created successfully!</p>
//       )}
//     </div>
//   );
// };

// export default SellerActivationPage;



// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // Importer useNavigate
// import { server } from "../server";

// const SellerActivationPage = () => {
//   const { activation_token } = useParams();
//   const [error, setError] = useState(false);
//   const [success, setSuccess] = useState(false); // Ajouter un état pour le succès
//   const navigate = useNavigate(); // Initialiser le hook useNavigate

//   console.log("🔍 Token reçu:", activation_token); // ➡️ Vérifie la console du navigateur

//   useEffect(() => {
//     if (activation_token) {
//       const sendRequest = async () => {
//         try {
//           const response = await axios.post(`${server}/shop/activation`, {
//             activation_token,
//           });

//           console.log(response);
//           if (response.status === 200) {
//             setTimeout(() => {
//               navigate("/dashboard"); // ✅ Redirection si succès
//             }, 2000);
//           }
//         } catch (err) {
//           console.error(err);
//           setError(true);
//           setTimeout(() => {
//             navigate("/shop-login"); // ✅ Redirection vers inscription si erreur
//           }, 3000);
//         }
//       };
//       sendRequest();
//     }
//   }, [activation_token, navigate]); // Ajouter navigate à la dépendance du useEffect

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {error ? (
//         <p>Your token is expired!</p> // Afficher le message d'erreur si le token est expiré
//       ) : success ? (
//         <p>Your account has been created successfully!</p> // Afficher le message de succès si l'activation réussit
//       ) : (
//         <p>Activating your account...</p> // Afficher un message de chargement pendant l'activation
//       )}
//     </div>
//   );
// };

// export default SellerActivationPage;



import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../server";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [activated, setActivated] = useState(false); // ✅ État pour éviter l'erreur de token expiré

  // useEffect(() => {
  //   if (activation_token && !activated) {  // ✅ Vérifie que l'activation n'a pas déjà eu lieu
  //     const sendRequest = async () => {
  //       try {
  //         const response = await axios.post(`${server}/shop/activation`, { activation_token });

  //         console.log(response);
  //         if (response.status === 200) {
  //           setActivated(true); // ✅ Marque l'activation comme réussie
  //           setTimeout(() => {
  //             navigate("/dashboard"); // ✅ Redirection vers Dashboard
  //           }, 2000);
  //         }
  //       } catch (err) {
  //         console.error(err);
  //         setError(true);
  //         setTimeout(() => {
  //           navigate("/shop-login"); // ✅ Redirection vers Shop-Login en cas d'erreur
  //         }, 3000);
  //       }
  //     };
  //     sendRequest();
  //   }
  // }, [activation_token, navigate, activated]); // ✅ Ajoute activated comme dépendance pour éviter la double exécution


  // useEffect(() => {
  //   if (activation_token && !activated) {
  //     const sendRequest = async () => {
  //       try {
  //         const response = await axios.post(`${server}/shop/activation`, {
  //           activation_token,
  //         });
  
  //         console.log(response);
  
  //         if (response.status === 200) {
  //           setActivated(true);
  
  //           // ✅ Stocker le token d'authentification après activation
  //           localStorage.setItem("shopToken", response.data.token);
  
  //           setTimeout(() => {
  //             navigate("/dashboard"); // ✅ Aller directement au Dashboard
  //           }, 2000);
  //         }
  //       } catch (err) {
  //         console.error(err);
  //         setError(true);
  //         setTimeout(() => {
  //           navigate("/shop-login"); // ✅ Si erreur, aller vers la connexion
  //         }, 3000);
  //       }
  //     };
  //     sendRequest();
  //   }
  // }, [activation_token, navigate, activated]);
   
  // useEffect(() => {
  //   if (activation_token) {
      
  //     const sendRequest = async () => {
  //       try {
  //         const response = await axios.post(`${server}/shop/activation`, {
  //           activation_token,
  //         });
  
  //         console.log(response);
  
  //         if (response.status === 200 || response.status === 201) {
  //           // ✅ Stocker le token pour connecter l'utilisateur directement
  //           localStorage.setItem("shopToken", response.data.token);
  
  //           setTimeout(() => {
  //             navigate("/dashboard"); // ✅ Aller directement au Dashboard
  //           }, 2000);
  //         }
  //       } catch (err) {
  //         console.error(err);
  //         setError(true);
  //         setTimeout(() => {
  //           navigate("/shop-login"); // ✅ Si erreur, aller vers la connexion
  //         }, 3000);
  //       }
  //     };
  //     sendRequest();
  //   }
  // }, [activation_token, navigate]);
  
  useEffect(() => {
    if (activation_token) {
      console.log("Token reçu:", activation_token); // ✅ Vérifie si le token est bien reçu
      
      const sendRequest = async () => {
        try {
          const response = await axios.post(`${server}/shop/activation`, {
            activation_token,
          });
  
          console.log(response);
  
          if (response.status === 200 || response.status === 201) {
            localStorage.setItem("shopToken", response.data.token);
            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);
          }
        } catch (err) {
          console.error("Erreur Axios:", err.response?.data || err.message);
          setError(true);
          setTimeout(() => {
            navigate("/shop-login");
          }, 3000);
        }
      };
  
      sendRequest();
    }
  }, [activation_token, navigate]);
  
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your activation link has expired!</p>
      ) : (
        <p>Your account has been created successfully! Redirecting...</p>
      )}
    </div>
  );
};

export default SellerActivationPage;

