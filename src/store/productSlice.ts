import {
  getBestSellerProducts,
  getFilteredProducts,
  getNewArrivalProducts,
  getProductById,
  getProducts,
  getSearchProducts,
  getTopRatedProducts,
} from "@/api/product";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  quantity: number;
  category: string;
  flavor: string;
  price: number;
  discountedPrice: number;
  rating: number;
  images: string[];
  brand: string;
  sizes: { id: number; label: string }[];
  description: string;
}

interface CartState {
  items: Product[];
  selectedProductById: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  selectedProductById: null,
  loading: false,
  error: null,
};

//All products
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const data = await getProducts();
    return data;
  },
);

//New-arrivals product
export const fetchNewArrivalsProduct = createAsyncThunk(
  "products/fetchNewArrivalsProduct",
  async () => {
    const data = await getNewArrivalProducts();
    return data;
  },
);

//Top-rated products
export const fetchTopRatedProducts = createAsyncThunk(
  "products/fetchTopRatedProducts",
  async () => {
    const data = await getTopRatedProducts();
    return data;
  },
);

//Best-seller products
export const fetchBestSellerProducts = createAsyncThunk(
  "products/fetchBestSellerProducts",
  async () => {
    const data = await getBestSellerProducts();
    return data;
  },
);

//Product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: number) => {
    const data = await getProductById(id);
    return data;
  },
);

//Search product
export const fetchSearchProducts = createAsyncThunk(
  "products/fetchSearchProducts",
  async (searchText: string) => {
    const data = await getSearchProducts(searchText);
    return data;
  },
);

// Filtered Products
export const fetchFilteredProducts = createAsyncThunk(
  "products/fetchFilteredProducts",
  async (filters: {
    category?: string;
    flavors?: string[];
    tags?: string[];
    sizes?: string[];
  }) => {
    const data = await getFilteredProducts(filters);
    return data;
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProductById = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //All Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      //New-arrivals Product
      .addCase(fetchNewArrivalsProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewArrivalsProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchNewArrivalsProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      //Top-rated Products
      .addCase(fetchTopRatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchTopRatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      //Best-seller Products
      .addCase(fetchBestSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchBestSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      //Products By ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProductById = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      //Search Products
      .addCase(fetchSearchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchSearchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      // Filtered Products
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});
export const { clearSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
