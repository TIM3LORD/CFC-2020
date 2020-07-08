/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import NoteIcon from "@material-ui/icons/EventNote";
import PersonAdd from "@material-ui/icons/PersonAdd";
import LoginIcon from "@material-ui/icons/Person";
import ListIcon from "@material-ui/icons/List";
import GroupIcon from "@material-ui/icons/Group";
import SearchIcon from "@material-ui/icons/Search";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import RegistrationPage from "views/Registration/Registration.js";
import LoginPage from "views/Login/Login.js";
import JobPostingsPage from "views/JobPostings/JobPostings.js";
import ProductListingPage from "views/ProductListing/ProductListing.js";
import ApplicantPage from "views/Applicants/Applicants.js";
import ProductsPage from "views/Products/Products.js";
import JobSearchPage from "views/JobSearch/JobSearch.js";
import Icons from "views/Icons/Icons.js";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/jobposting",
    name: "Job Postings",
    rtlName: "لوحة القيادة",
    icon: NoteIcon,
    component: JobPostingsPage,
    layout: "/admin"
  },
  {
    path: "/registration",
    name: "Register",
    rtlName: "لوحة القيادة",
    icon: PersonAdd,
    component: RegistrationPage,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    rtlName: "لوحة القيادة",
    icon: LoginIcon,
    component: LoginPage,
    layout: "/admin"
  },
  {
    path: "/productlisting",
    name: "Product Listing",
    rtlName: "لوحة القيادة",
    icon: ListIcon,
    component: ProductListingPage,
    layout: "/admin"
  },
  {
    path: "/applicants",
    name: "Shortlisted Applicants",
    rtlName: "لوحة القيادة",
    icon: GroupIcon,
    component: ApplicantPage,
    layout: "/admin"
  },
  {
    path: "/products",
    name: "Product Search",
    rtlName: "لوحة القيادة",
    icon: SearchIcon,
    component: ProductsPage,
    layout: "/admin"
  },
  {
    path: "/jobsearch",
    name: "Job Search",
    rtlName: "لوحة القيادة",
    icon: SearchIcon,
    component: JobSearchPage,
    layout: "/admin"
  }
];

export default dashboardRoutes;
