const initialState = {
    blogs: [],
    loading: false,
    error: null,
  };
  
  export const blogReducer = (state = initialState, action) => {
    switch (action.type) {
      case "blogCreateRequest":
      case "getBlogsRequest":
      case "deleteBlogRequest":
        return {
          ...state,
          loading: true,
        };
  
      case "blogCreateSuccess":
        return {
          ...state,
          loading: false,
          blogs: [...state.blogs, action.payload],
        };
  
      case "getBlogsSuccess":
        return {
          ...state,
          loading: false,
          blogs: action.payload,
        };
  
      case "deleteBlogSuccess":
        return {
          ...state,
          loading: false,
          blogs: state.blogs.filter((blog) => blog._id !== action.payload),
        };
  
      case "blogCreateFail":
      case "getBlogsFailed":
      case "deleteBlogFailed":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  