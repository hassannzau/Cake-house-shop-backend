import api from "@/api";

interface BackendCake {
  id: number;
  name: string;
  size: string;
  price: number;
  description: string;
  quantity: number;
  imageBase64: string | null;
  category: { id: number; name: string } | null;
  flavors: { id: number; name: string }[];
  allergens: { id: number; name: string }[];
}

function adaptCake(cake: BackendCake) {
  return {
    id: cake.id,
    title: cake.name,
    quantity: cake.quantity,
    category: cake.category?.name ?? "",
    flavor: cake.flavors?.map((f) => f.name).join(", ") ?? "",
    price: cake.price,
    discountedPrice: 0,
    rating: 0,
    images: cake.imageBase64
      ? [`data:image/jpeg;base64,${cake.imageBase64}`]
      : [],
    brand: "",
    sizes: cake.size ? [{ id: 1, label: cake.size }] : [],
    description: cake.description ?? "",
  };
}

export const getProducts = async () => {
  const response = await api.get("/cakes");
  return response.data.map(adaptCake);
};

export const getNewArrivalProducts = async () => {
  const response = await api.get("/cakes/new-arrivals");
  return response.data.map(adaptCake);
};

export const getTopRatedProducts = async () => {
  const response = await api.get("/cakes/top-rated");
  return response.data.map(adaptCake);
};

export const getBestSellerProducts = async () => {
  const response = await api.get("/cakes/best-seller");
  return response.data.map(adaptCake);
};

export const getProductById = async (id: number) => {
  const response = await api.get(`/cakes/${id}`);
  return adaptCake(response.data);
};

export const getSearchProducts = async (searchText: string) => {
  const response = await api.get(`/cakes/search?q=${searchText}`);
  return response.data.map(adaptCake);
};

export const getFilteredProducts = async (filters: {
  category?: string;
  flavors?: string[];
  tags?: string[];
  sizes?: string[];
}) => {
  const params = new URLSearchParams();

  if (filters.category) {
    params.append("category", filters.category);
  }

  if (filters.flavors && filters.flavors.length > 0) {
    filters.flavors.forEach((flavor) => params.append("flavors", flavor));
  }

  if (filters.sizes && filters.sizes.length > 0) {
    filters.sizes.forEach((size) => params.append("sizes", size));
  }

  const response = await api.get(`/cakes/filter?${params.toString()}`);
  return response.data.map(adaptCake);
};
