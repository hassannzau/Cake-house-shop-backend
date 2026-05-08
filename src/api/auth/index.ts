import api from "@/api";

export const loginApi = async (email: string, password: string) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const registerApi = async (
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  const response = await api.post("/register", {
    fullName,
    email,
    password,
    confirmPassword,
  });
  return response.data;
};
