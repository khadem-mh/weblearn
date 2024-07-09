import Index from "./Pages/Index/Index"
import CategoryCourses from "./Pages/CategoryCourses/CategoryCourses"
import CategoryArticles from "./Pages/CategoryArticles/CategoryArticles"
import AllCourses from "./Pages/AllCourses/AllCourses"
import CourseInfo from "./Pages/CourseInfo/CourseInfo"
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo"
import Lesson from "./Pages/Lesson/Lesson"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import ContactUs from "./Pages/ContactUs/ContactUs"
import SearchGlobal from "./Pages/SearchGlobal/SearchGlobal"
import Page404 from "./Pages/Page404/Page404"
//import pages my account
import MyAccount from "./Pages/MyAccount/Components/Account/MyAccount"
import PageFirstAccount from "./Pages/MyAccount/Pages/PageFirstAccount/PageFirstAccount";
import MyCourses from "./Pages/MyAccount/Pages/MyCourses/MyCourses";
import DetailsAccount from "./Pages/MyAccount/Pages/DetailsAccount/DetailsAccount";
import Tickets from "./Pages/MyAccount/Pages/Tickets/Tickets";
import AddTicket from "./Pages/MyAccount/Pages/AddTicket/AddTicket";
//admin panel
import AdminPanel from "./Pages/Admin/index"
import AdminPanelMenus from "./Pages/Admin/Pages/Menus/Menus"
import AdminPanelArticles from "./Pages/Admin/Pages/Articles/Articles"
import AdminPanelHome from "./Pages/Admin/Pages/Home/Home"
import AdminPanelCourses from "./Pages/Admin/Pages/Courses/Courses"
import AdminPanelUsere from "./Pages/Admin/Pages/Users/Users"
import AdminPanelComments from "./Pages/Admin/Pages/Comments/Comments"
import AdminPanelOrders from "./Pages/Admin/Pages/Orders/Orders"
import AdminPanelOffs from "./Pages/Admin/Pages/Offs/Offs"
import AdminPanelCategories from "./Pages/Admin/Pages/Categories/Categories"
import AdminPanelContacts from "./Pages/Admin/Pages/Contacts/Contacts"
import AdminPanelSessions from "./Pages/Admin/Pages/Sessions/Sessions"
import Page404admin from "./Pages/Admin/Pages/Page404-admin/Page404-admin"

const routes = [
    //Routes Main
    { path: '/', element: <Index /> },
    { path: 'course-info/:course', element: <CourseInfo /> },
    { path: 'article-info/:name', element: <ArticleInfo /> },
    { path: 'all-articles/page/:count', element: <CategoryArticles /> },
    { path: ':category/page/:count', element: <CategoryCourses /> },
    { path: 'all-courses/page/:count', element: <AllCourses /> },
    { path: 'lesson/:courseNmae/:idSession', element: <Lesson /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: 'contactus', element: <ContactUs /> },
    { path: 'search/:val', element: <SearchGlobal /> },
    //Route Account
    {
        path: 'my-account/*', element: <MyAccount children={< PageFirstAccount />} />, children: [
            { path: 'my-courses', element: <MyAccount children={< MyCourses />} /> },
            { path: 'details-account', element: <MyAccount children={< DetailsAccount />} /> },
            { path: 'tickets', element: <MyAccount children={< Tickets />} /> },
            { path: 'add-ticket', element: <MyAccount children={< AddTicket />} /> },
            { path: '*', element: < Page404 /> },
        ]
    },
    {
        path: 'p-admin/*', element: <AdminPanel />, children: [
            { path: '', element: <AdminPanelHome /> },
            { path: 'courses', element: <AdminPanelCourses /> },
            { path: 'sessions', element: <AdminPanelSessions /> },
            { path: 'categories', element: <AdminPanelCategories /> },
            { path: 'users', element: <AdminPanelUsere /> },
            { path: 'comments', element: <AdminPanelComments /> },
            { path: 'orders', element: <AdminPanelOrders /> },
            { path: 'offs', element: <AdminPanelOffs /> },
            { path: 'contacts', element: <AdminPanelContacts /> },
            { path: 'menus', element: <AdminPanelMenus /> },
            { path: 'articles', element: <AdminPanelArticles /> },
            { path: '*', element: <Page404admin /> },
        ]
    },
    { path: '/*', element: <Page404 /> },
]

export default routes