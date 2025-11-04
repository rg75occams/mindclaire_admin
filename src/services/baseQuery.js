import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { CONSTANTS } from "../utils/staticData";

export const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: async (header) => {
        const token = localStorage.getItem("mindclaire-admin");
        const company = localStorage.getItem(CONSTANTS.companyNameLocalStorage);
        if (token) {
            header.set("Authorization", `Bearer ${token}`);
        }
        if (company) {
            header.set("Organization", company);
        }
        return header;
    },
});
