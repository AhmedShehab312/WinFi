
import Brands from "views/Brands/Brands.js";
import CompanyProfile from "views/CompanyProfile/CompanyProfile.js";
import Dashboard from "views/Dashboard.js";
import Reports from "views/Reports/Reports.js";
import Admins from "views//Admins/Admins.js";
import Analytics from "views/Analytics/Analytics.js";
import Contacts from "views/Contacts/Contacts.js";
import InvoicesPayments from "views/InvoicesPayments/InvoicesPayments.js";
import InternetManagement from "views/InternetManagement/InternetManagement.js";
import Integration from "views/Integration/Integration.js";
import Branches from "views/Branches/Branches.js";


var SideMenu = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "tim-icons icon-chart-pie-36",
        component: Dashboard,
    },
    {
        name: "Configuration",
        icon: "fa fa-cogs",
        subs: [{
            path: "/CompanyProfile",
            name: "Company Profile",
            icon: "tim-icons icon-single-02",
            component: CompanyProfile,
        },
        {
            path: "/Brands",
            name: "Brands",
            icon: "fa fa-file",
            component: Brands,
        },
        {
            path: "/Branches",
            name: "Branches",
            icon: "fa fa-code-branch",
            component: Branches,
        },
        ]
    },
    {
        path: "/Reports",
        name: "Reports",
        icon: "fa fa-file",
        component: Reports,
    },
    {
        path: "/Admins",
        name: "Admins",
        icon: "fa fa-user",
        component: Admins,
    },
    {
        path: "/Analytics",
        name: "Analytics",
        icon: "fa fa-chart-bar",
        component: Analytics,
    },
    {
        path: "/Contacts",
        name: "Contacts",
        icon: "fa fa-address-book",
        component: Contacts,
    },
    {
        path: "/InvoicesPayments",
        name: "Invoices and Payments",
        icon: "fa fa-database",
        component: InvoicesPayments,
    },
    {
        path: "/InternetManagement",
        name: "Internet Management",
        icon: "fa fa-wifi",
        component: InternetManagement,
    },
    {
        path: "/Integration",
        name: "Integration",
        icon: "fa fa-code",
        component: Integration,
    },

];

export default SideMenu;




// Example how to add sub and subSubs
// {
//   path: "/dashboard",
//   name: "Dashboard",
//   icon: "tim-icons icon-chart-pie-36",
//   component: Dashboard,
//   layout: "/admin",
//   subs: [{
//     path: "/user-profile",
//     name: "User Profile",
// 
//     icon: "tim-icons icon-single-02",
//     component: UserProfile,
//     layout: "/admin",
//     subSubs: [{
//       path: "/tables",
//       name: "Table List",
//       rtlName: "قائمة الجدول",
//       icon: "tim-icons icon-puzzle-10",
//       component: TableList,
//       layout: "/admin"
//     },
//     {
//       path: "/tables",
//       name: "Table List",
//       rtlName: "قائمة الجدول",
//       icon: "tim-icons icon-puzzle-10",
//       component: TableList,
//       layout: "/admin"
//     },
//     {
//       path: "/tables",
//       name: "Table List",
//       rtlName: "قائمة الجدول",
//       icon: "tim-icons icon-puzzle-10",
//       component: TableList,
//       layout: "/admin"
//     }
//     ]
//   }