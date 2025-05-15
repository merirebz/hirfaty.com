import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import { useNavigate } from "react-router-dom"; // Importer useNavigate

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate(); // Initialiser useNavigate


  console.log("🔍 Token reçu:", activation_token); // ➡️ Vérifie la console du navigateur

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
            // 🔄 Après 3 secondes, redirection vers /login
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          })
          
          .catch((err) => {
            setError(true);
          });
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
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created suceessfully! Redirecting...</p>
      )}
    </div>
  );
};

export default ActivationPage;
