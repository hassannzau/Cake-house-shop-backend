import api from "@/api";

export const submitContact = (data: { name: string; email: string; message: string }) =>
  api.post("/contact", data).then((r) => r.data);
