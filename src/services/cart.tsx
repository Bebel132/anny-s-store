import api from "./api";

export const cartService = {
    list: (params : string) =>
        api.get(`/odata/CartItems?$expand=Product&$expand=Cart&$filter=Cart/UserId eq ${params}`).then(res => res.data),
    retrieve: (userId: string) =>
        api.get(`/odata/Carts?filter=UserId eq ${userId}`).then(res => res.data),
    put: (data: any) =>
        api.put(`/api/CartItems/${data.Id}`, data),
    post: (data: any) =>
        api.post(`/api/CartItems`, data),
};