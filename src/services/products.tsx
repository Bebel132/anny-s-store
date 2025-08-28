import api from "./api";

export const productsService = {
    list: (params : string) =>
        api.get(`/odata/Products?$count=true&${params}`).then(res => res.data)
}