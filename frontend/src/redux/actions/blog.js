import axios from "axios";
import { server } from "../../server";

// 📌 Créer un blog
export const createBlog = (newForm) => async (dispatch) => {
  console.log('FormData:', newForm); // Vérifiez ce qui est envoyé

  try {
    dispatch({
      type: "blogCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`${server}/blogs/admin-create-blog`, newForm, config);

    dispatch({
      type: "blogCreateSuccess",
      payload: data.blog,
    });
  } catch (error) {
    dispatch({
      type: "blogCreateFail",
      payload: error.response?.data?.message || "Erreur lors de la création",
    });
  }
};

// 📌 Récupérer tous les blogs
export const getBlogs = () => async (dispatch) => {
  try {
    dispatch({
      type: "getBlogsRequest",
    });

    const { data } = await axios.get(`${server}/blogs/all-blogs`);
    
    dispatch({
      type: "getBlogsSuccess",
      payload: data.blogs,
    });
  } catch (error) {
    dispatch({
      type: "getBlogsFailed",
      payload: error.response?.data?.message || "Erreur de chargement",
    });
  }
};

// 📌 Supprimer un blog
export const deleteBlog = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteBlogRequest",
    });

    const { data } = await axios.delete(`${server}/blogs/delete-blog/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "deleteBlogSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteBlogFailed",
      payload: error.response?.data?.message || "Erreur de suppression",
    });
  }
};
