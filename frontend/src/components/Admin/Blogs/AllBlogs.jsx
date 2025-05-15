import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBlogs } from '../../../redux/actions/blog'; // Action pour récupérer les blogs
import axios from 'axios';
import { server } from '../../../server';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import styles from '../../../styles/styles';
import { useTranslation } from 'react-i18next';

const AllBlogs = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogs); // On récupère les blogs depuis Redux
  const { i18n } = useTranslation();

  const [blogId, setBlogId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getBlogs()); // On charge les blogs au premier rendu
  }, [dispatch]);

  const handleDelete = async (id) => { 
    await axios
      .delete(`${server}/blogs/delete-blog/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getBlogs()); // Rafraîchir la liste des blogs après suppression
      })
      .catch((error) => {
        toast.error('Erreur lors de la suppression du blog');
      });
  };

  const columns = [
    { field: 'id', headerName: 'Blog Id', minWidth: 150, flex: 0.7 },
    {
      field: 'title',
      headerName: 'Title',
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: 'content',
      headerName: 'Content',
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.8,
      minWidth: 100,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/blog/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
            <Button onClick={() => { setBlogId(params.id); setOpen(true); }}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = blogs && blogs.length > 0
  ? blogs.map((item) => ({
      id: item._id,
      title: item.title,
      content: item.content,
  }))
  : [];

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>

      {/* Modal de confirmation de suppression */}
      {open && (
        <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
          <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
            <div className="w-full flex justify-end cursor-pointer">
              <RxCross1 size={25} onClick={() => setOpen(false)} />
            </div>
            <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
              Are you sure you want to delete this blog?
            </h3>
            <div className="w-full flex items-center justify-center">
              <div
                className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                onClick={() => setOpen(false)}
              >
                {i18n.t('Cancel')}
              </div>
              <div
                className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                onClick={() => { setOpen(false); handleDelete(blogId); }}
              >
                {i18n.t('Confirm')}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllBlogs;
