import React, { useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <Faq />
      <Footer />
    </div>
  );
};

const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className={`${styles.section} my-8`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
      <div className="mx-auto space-y-4">
        {/* single Faq */}

        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(2)}
          >
            <div className="text-lg font-medium text-gray-900">
              Responsabilité ?
            </div>
            {activeTab === 2 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 2 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                Bien que nous nous efforcions de maintenir les informations
                présentes sur ce site web à jour et précises, nous ne pouvons
                garantir l&#39;exactitude, l&#39;exhaustivité ou la pertinence
                de ces informations. En conséquence, CREATI DIGITAL FINANCE
                décline toute responsabilité quant à l&#39;utilisation que vous
                pourriez faire des informations fournies sur ce site. Ce site
                peut contenir des liens vers d&#39;autres sites web gérés par
                des tiers. CREATI DIGITAL FINANCE n&#39;a aucun contrôle sur le
                contenu de ces sites tiers et n&#39;assume aucune responsabilité
                pour tout dommage ou préjudice résultant de l&#39;accès à ces
                sites.
              </p>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(3)}
          >
            <span className="text-lg font-medium text-gray-900">
              Protection des données personnelles ?
            </span>
            {activeTab === 3 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 3 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                Pour plus d&#39;informations sur la collecte et
                l&#39;utilisation de vos données personnelles, veuillez
                consulter notre Politique de confidentialité.
              </p>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(4)}
          >
            <span className="text-lg font-medium text-gray-900">
              Droit applicable et juridiction?
            </span>
            {activeTab === 4 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 4 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                Les présentes mentions légales sont régies par le droit
                applicable dans votre juridiction. Tout litige découlant de
                l&#39;utilisation de ce site web sera soumis à la juridiction
                compétente dans votre région.
              </p>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(5)}
          >
            <span className="text-lg font-medium text-gray-900">
              POLITIQUE DE CONFIDENTIALITÉ ?
            </span>
            {activeTab === 5 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 5 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                La présente Politique de Confidentialité définit la manière dont
                CREATI DIGITAL FINANCE collecte, utilise et protège les
                informations personnelles des utilisateurs de son site web
                &quot;Hirfaty&quot;.
              </p>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(6)}
          >
            <span className="text-lg font-medium text-gray-900">
              Collecte de données personnelles?
            </span>
            {activeTab === 6 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 6 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                Nous pouvons collecter des données personnelles, y compris, mais
                sans s&#39;y limiter, votre nom, votre adresse e-mail, votre
                adresse IP, etc., lorsque vous visitez notre site web. Ces
                données peuvent être collectées lorsque vous remplissez des
                formulaires, vous vous abonnez à notre newsletter, effectuez des
                achats ou interagissez avec notre site de quelque manière que ce
                soit.{" "}
              </p>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(7)}
          >
            <span className="text-lg font-medium text-gray-900">
              Utilisation des données?
            </span>
            {activeTab === 7 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 7 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                Nous utilisons les données personnelles collectées pour les
                finalités suivantes : ● Pour vous fournir des informations sur
                nos produits et services. ● Pour répondre à vos demandes et
                questions. ● Pour traiter vos commandes et paiements. ● Pour
                personnaliser votre expérience sur notre site web. ● Pour
                améliorer nos produits et services.
              </p>
            </div>
          )}
        </div>
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(7)}
          >
            <span className="text-lg font-medium text-gray-900">
              Utilisation des données?
            </span>
            {activeTab === 7 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 7 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                Nous utilisons les données personnelles collectées pour les
                finalités suivantes : ● Pour vous fournir des informations sur
                nos produits et services. ● Pour répondre à vos demandes et
                questions. ● Pour traiter vos commandes et paiements. ● Pour
                personnaliser votre expérience sur notre site web. ● Pour
                améliorer nos produits et services.
              </p>
            </div>
          )}
        </div>
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(7)}
          >
            <span className="text-lg font-medium text-gray-900">
              Stockage et sécurité des données?
            </span>
            {activeTab === 7 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 7 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                Vos données personnelles sont stockées de manière sécurisée et
                confidentielle. Nous mettons en place des mesures de sécurité
                techniques et organisationnelles appropriées pour protéger vos
                données contre tout accès non autorisé, toute divulgation, toute
                modification ou toute destruction.
              </p>
            </div>
          )}
        </div>
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(7)}
          >
            <span className="text-lg font-medium text-gray-900">
              Partage des données?
            </span>
            {activeTab === 7 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 7 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                Nous ne partageons pas vos données personnelles avec des tiers
                sans votre consentement explicite, sauf lorsque cela est requis
                par la loi.
              </p>
            </div>
          )}
        </div>
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(7)}
          >
            <span className="text-lg font-medium text-gray-900">
              Partage des données?
            </span>
            {activeTab === 7 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 7 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                Nous ne partageons pas vos données personnelles avec des tiers
                sans votre consentement explicite, sauf lorsque cela est requis
                par la loi.
              </p>
            </div>
          )}
        </div>
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(7)}
          >
            <span className="text-lg font-medium text-gray-900">
              <div className="border-b border-gray-200 pb-4">
                <button
                  className="flex items-center justify-between w-full"
                  onClick={() => toggleTab(7)}
                >
                  <span className="text-lg font-medium text-gray-900">
                    Partage des données?
                  </span>
                  {activeTab === 7 ? (
                    <svg
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </button>
                {activeTab === 7 && (
                  <div className="mt-4">
                    <p className="text-base text-gray-500">
                      Nous ne partageons pas vos données personnelles avec des
                      tiers sans votre consentement explicite, sauf lorsque cela
                      est requis par la loi.
                    </p>
                  </div>
                )}
              </div>
              Cookies et technologies de suivi?
            </span>
            {activeTab === 7 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 7 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                Nous utilisons des cookies et des technologies de suivi pour
                collecter des informations sur votre comportement de navigation
                sur notre site web. Vous pouvez gérer vos préférences de cookies
                à tout moment.
              </p>
            </div>
          )}
        </div>
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(7)}
          >
            <span className="text-lg font-medium text-gray-900">
              Droits de l&#39;utilisateur?
            </span>
            {activeTab === 7 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 7 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                En vertu de la législation sur la protection des données, vous
                avez le droit d&#39;accéder à vos données personnelles, de les
                rectifier, de les supprimer, de restreindre leur traitement, et
                de vous opposer à leur utilisation. Pour exercer ces droits ou
                pour toute question concernant la confidentialité des données,
                veuillez nous contacter à l&#39;adresse e-mail :
                administration@creatidigital.net.
              </p>
            </div>
          )}
        </div>
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(7)}
          >
            <span className="text-lg font-medium text-gray-900">
              Modifications de la politique de confidentialité?
            </span>
            {activeTab === 7 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
          {activeTab === 7 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                Nous nous réservons le droit de modifier cette politique de
                confidentialité à tout moment. Les modifications seront publiées
                sur cette page et entreront en vigueur immédiatement.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
