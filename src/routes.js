
import Dashboard from "views/Dashboard.js";
import TableList from "views/TableList.js";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin"
  },
];
export default routes;


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
//     rtlName: "ملف تعريفي للمستخدم",
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