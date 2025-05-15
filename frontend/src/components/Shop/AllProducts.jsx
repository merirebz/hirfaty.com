import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye, AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UpdateProduct from "./UpdateProduct1";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import { getProductById } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import { useTranslation } from "react-i18next";
import { GetProductName, GetProductPrice } from "../../utils/ProductInfo";
const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const [DialogUpdate, setDialogUpdate] = useState(false);
  const { i18n } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };
  const handleUpdate = (id) => {
    dispatch(getProductById(id));
    setDialogUpdate(true);

    // dispatch(deleteProduct(id));
    // window.location.reload();
  };
  const closeDialog = () => {
    setDialogUpdate(false);
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Update",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleUpdate(params.id)}>
              <AiFillEdit size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: GetProductName(item, i18n),
        price: "MAD " + GetProductPrice(item),
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full mx-8 pt-1 mt-10 bg-white">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          </div>
          {DialogUpdate ? <UpdateProduct closeDialog={closeDialog} /> : null}
        </>
      )}
    </>
  );
};

export default AllProducts;
