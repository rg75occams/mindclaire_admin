export const HEADER_TITLE_DEFAULT = "Mindclaire | Admin";
export const DTPAGE_SIZE = [10, 50, 100, 200];
export const CONSTANTS = {
    moduleFontSize: "14px",
    fontSize: "14px",
    iconSize: "24px",
    fontSizeReg: "18px",
    fontSizeMid: "24px",
    fontSizeLarge: "32px",
    fontSizeCompany: "16px",
    fontSizeExLarge: "42px",
    companyNameLocalStorage: "mindclaire-admin",
    tokenLocalStorage: "mindclaire-admin",
    localStorageTheme: "mindclaire-admin_theme_color",
};

export const SA_MENU_LIST = [{
    id: 1,
    title: "Dashboard",
    path: "/admin/dashboard",
    permissions: { create: true, delete: true, edit: true, view: true },
    icon: "RxDashboard",
},
{
    id: 5,
    title: "Blog",
    path: "/admin/blog",
    permissions: { create: true, delete: true, edit: true, view: true },
    icon: "FaBlog",
    children: [
        {
            id: 6,
            title: "View Category",
            path: "/admin/blog/category",
        },
        {
            id: 7,
            title: "Add Category",
            path: "/admin/blog/add-category",
        },
        {
            id: 8,
            title: "View Blog",
            path: "/admin/blog/view-blog",
        },
        {
            id: 9,
            title: "Add Blog",
            path: "/admin/blog/add-blog",
        },
    ],
},
]