import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const promoProductReducer = createReducer(initialState, {
    getPromoProducts: (state, action) => {
        state.isLoading = false;
        state.promoProducts = action.payload;
      },

      getPromoProductsSuccess: (state, action) => {
        state.isLoading = false;
        state.promoProducts = action.payload;
      },
      getPromoProductsFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
        // delete product of a shop
  deletePromoProductRequest: (state) => {
    state.isLoading = true;
  },
  deletePromoProductSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deletePromoProductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
});