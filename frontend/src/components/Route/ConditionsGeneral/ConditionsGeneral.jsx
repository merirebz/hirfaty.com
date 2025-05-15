import React from "react";
import { useTranslation } from "react-i18next";

const ConditionsGeneral = () => {
    const { t } = useTranslation();
  return (
    <>
      <div className="2xl:container 2xl:mx-auto  lg:py-14 lg:px-[12rem] md:py-2 md:px-[6rem] pb-8   py-2 px-[2rem]">
        <div className="w-full text-center mt-4 ">
          <h2 className=" text-3xl font-semibold text-[#F1634C] mb-12 ">
          {t("Co")}
            
          </h2>
        </div>

        <div className="  bg-gray-300  px-8 py-4 ">
          <ul className=" list-decimal ">
            <li>Objet</li>
            <li>Produits </li>
            <li>Prix </li>
            <li>Commande </li>
            <li>Paiement</li>
            <li>Livraison </li>
            <li>Droit de Rétractation </li>
            <li>Responsabilité </li>
            <li>Litiges </li>
            <li>Mentions Légales </li>
            <li>Garanties </li>
            <li>Politique de Retour </li>
            <li>A propos de la Société Mère </li>
            <li>Litiges </li>
            <li>Notre Adresse </li>
            <li>Contact et Email de Contact </li>
          </ul>
        </div>

        <ul className=" list-decimal ">
          <li className=" mt-5 ">
            <span className=" font-bold text-[#F1634C] text-[1rem] mb-4 ">
              Objet :
            </span>
            <p className=" text-black pl-5 mt-3 text-base ">
              Les présentes conditions générales de vente (CGV) régissent les
              relations contractuelles entre Hirfaty, un site annoncé
              et développé par CreatiDigital, société à responsabilité limitée,
              dont le siège social est situé au 19 rue Om Ayad, quartier Moulay
              El Hassan, boulevard C, Safi, et toute personne physique ou morale
              (ci-après "le Client") effectuant un achat sur le site internet
              [https://www.Hirfaty.com/].
            </p>
          </li>
          <li className=" mt-10 ">
            <span className=" font-bold text-[#F1634C] text-[1rem] mb-4 ">
              Produits :
            </span>
            <p className=" text-black pl-5 mt-3 text-base ">
              Les produits proposés à la vente sur le site sont décrits avec la
              plus grande précision possible. Les photographies et illustrations
              ne sont pas contractuelles. Les produits restent la propriété du
              vendeur jusqu'au paiement complet de leur prix.
            </p>
          </li>
          <li className=" mt-10 ">
            <span className=" font-bold text-[#F1634C] text-[1rem] mb-4 ">
              Prix :
            </span>
            <p className=" text-black pl-5 mt-3 text-base ">
              Les prix des produits sont indiqués en dirhams marocains (MAD)
              toutes taxes comprises (TTC). Les frais de livraison sont en sus
              et précisés lors de la passation de commande. Hirfaty se
              réserve le droit de modifier ses prix à tout moment, toutefois les
              produits seront facturés sur la base des tarifs en vigueur au
              moment de la validation de la commande.
            </p>
          </li>
          <li className=" mt-10 ">
            <span className=" font-bold text-[#F1634C] text-[1rem] mb-4 ">
              Commande :
            </span>
            <p className=" text-black pl-5 mt-3 text-base ">
              Le Client passe commande sur le site internet. La commande n'est
              définitive qu'après acceptation des présentes CGV et validation du
              paiement. Hirfaty se réserve le droit d'annuler toute
              commande d'un client avec lequel il existerait un litige relatif
              au paiement d'une commande antérieure.
            </p>
          </li>
          <li className=" mt-10 ">
            <span className=" font-bold text-[#F1634C] text-[1rem] mb-4 ">
              Paiement :
            </span>
            <p className=" text-black pl-5 mt-3 text-base ">
              Le règlement des achats s'effectue par carte bancaire ou tout
              autre moyen de paiement sécurisé proposé sur le site internet. Le
              paiement est réalisé auprès du prestataire de paiement sécurisé.
              En cas de non-paiement ou de paiement refusé par l'établissement
              bancaire, la commande sera automatiquement annulée.
            </p>
          </li>
          <li className=" mt-10 ">
            <span className=" font-bold text-[#F1634C] text-[1rem] mb-4 ">
              Livraison :
            </span>
            <p className=" text-black pl-5 mt-3 text-base ">
              Les produits sont livrés à l'adresse indiquée par le Client lors
              de la commande. Les délais de livraison sont indiqués lors de la
              passation de commande et dépendent du mode de livraison choisi.
              Hirfaty ne saurait être tenue responsable des retards de
              livraison imputables au transporteur.
            </p>
          </li>
          <li className=" mt-10 ">
            <span className=" font-bold text-[#F1634C] text-[1rem] mb-4 ">
              Droit de Rétractation :
            </span>
            <p className=" text-black pl-5 mt-3 text-base ">
              Notre politique de rétractation permet aux clients de Hirfaty
               de retourner les produits dans un délai de 14 jours à
              compter de la réception de la commande, conformément aux lois et
              réglementations en vigueur. Le Client peut exercer son droit de
              rétractation sans avoir à motiver sa décision ni à supporter de
              pénalités. Tout produit retourné doit être dans son état
              d'origine, accompagné de tous les accessoires et documents inclus
              dans l'emballage initial. Les frais de retour restent à la charge
              du Client.
            </p>
          </li>
          <li className=" mt-10 ">
            <span className=" font-bold text-[#F1634C] text-[1rem] mb-4 ">
              Responsabilité :
            </span>
            <p className=" text-black pl-5 mt-3 text-base ">
              La responsabilité de Hirfaty ne saurait être engagée en
              cas d'inexécution ou de mauvaise exécution du contrat due, soit au
              fait du Client, soit au fait insurmontable et imprévisible d'un
              tiers au contrat, soit à un cas de force majeure.
            </p>
          </li>
          <li className=" mt-10 ">
            <span className=" font-bold text-[#F1634C] text-[1rem] mb-4 ">
              Litiges :
            </span>
            <p className=" text-black pl-5 mt-3 text-base ">
              Tout litige relatif à l'interprétation ou à l'exécution des
              présentes CGV sera soumis au droit marocain. En cas de litige, les
              parties s'efforceront de régler leur différend à l'amiable. À
              défaut, les tribunaux compétents du Maroc seront saisis.
            </p>
          </li>
          <li className=" mt-10 ">
            <span className=" font-bold text-[#F1634C] text-[1rem] mb-4 ">
              Mentions Légales :
            </span>
            <p className=" text-black pl-5 mt-3 text-base ">
              Le site internet est édité par Hirfaty. La directrice de
              la publication est Salma EL HARCHA. Le siège social est situé au
              19 rue Om Ayad, quartier Moulay El Hassan, boulevard C, Safi.
            </p>
          </li>
          <li className=" mt-10 ">
            <span className=" font-bold text-[#F1634C] text-[1rem] mb-4 ">
              Garanties :
            </span>
            <p className=" text-black pl-5 mt-3 text-base ">
              Les produits bénéficient de la garantie légale de conformité et de
              la garantie des vices cachés. Pour bénéficier de ces garanties, le
              Client doit informer Hirfaty par écrit et renvoyer le
              produit défectueux dans les conditions précisées par Hirfaty.
            </p>
          </li>
          <li className=" mt-10 ">
            <span className=" font-bold text-[#F1634C] text-[1rem] mb-4 ">
              Politique de Retour :
            </span>
            <p className=" text-black pl-5 mt-3 text-base ">
              Hirfaty s'engage à garantir la satisfaction de ses
              clients. Nous proposons une politique de retour flexible pour
              assurer votre entière satisfaction. En cas de problème avec un
              produit, veuillez contacter notre service clientèle dans les plus
              brefs délais afin de discuter des options de retour ou de
              remplacement. Notre équipe s'efforcera de résoudre toute situation
              de manière équitable et efficace, conformément à nos politiques
              internes. Pour plus d'informations sur notre politique de retour,
              n'hésitez pas à nous contacter.
            </p>
          </li>
          <li className=" mt-10 ">
            <span className=" font-bold text-[#F1634C] text-[1rem] mb-4 ">
              A propos de la Société Mère :
            </span>
            <p className=" text-black pl-5 mt-3 text-base ">
              Hirfaty est une plateforme développée par Creati Digital
              Finance, une société spécialisée dans les solutions numériques
              pour les entreprises. Avec notre expertise combinée en technologie
              et en commerce, nous nous engageons à fournir des produits et
              services innovants et de haute qualité pour répondre aux besoins
              de nos clients.
            </p>
          </li>
          <li className=" mt-10 ">
            <span className=" font-bold text-[#F1634C] text-[1rem] mb-4 ">
              Notre Adresse :
            </span>
            <p className=" text-black pl-5 mt-3 text-base ">
              Vous pouvez nous rendre visite à notre adresse physique située au
              19 rue Om Ayad, quartier Moulay El Hassan, boulevard C, Safi.
              Cette adresse est également disponible pour toute correspondance
              postale ou retour de produits.
            </p>
          </li>
          <li className=" mt-10 ">
            <span className=" font-bold text-[#F1634C] text-[1rem] mb-4 ">
              Contact et Email de Contact :
            </span>
            <p className=" text-black pl-5 mt-3 text-base ">
              Pour toute question, préoccupation, demande d'assistance ou
              réclamation, n'hésitez pas à nous contacter par email à l'adresse
              « contact@Hirfaty.com » ou par téléphone au [+212
              674-042632]. Notre équipe de support client se fera un plaisir de
              vous aider dans les meilleurs délais.
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ConditionsGeneral;
