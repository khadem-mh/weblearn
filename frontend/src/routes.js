import { lazy } from "react"

const Index = lazy(() => import("./Pages/Index/Index"))
const CategoryCourses = lazy(() => import("./Pages/CategoryCourses/CategoryCourses"))
const CategoryArticles = lazy(() => import("./Pages/CategoryArticles/CategoryArticles"))
const AllCourses = lazy(() => import("./Pages/AllCourses/AllCourses"))
const CourseInfo = lazy(() => import("./Pages/CourseInfo/CourseInfo"))
const ArticleInfo = lazy(() => import("./Pages/ArticleInfo/ArticleInfo"))
const Lesson = lazy(() => import("./Pages/Lesson/Lesson"))
const Login = lazy(() => import("./Pages/Login/Login"))
const Register = lazy(() => import("./Pages/Register/Register"))
const ContactUs = lazy(() => import("./Pages/ContactUs/ContactUs"))
const SearchGlobal = lazy(() => import("./Pages/SearchGlobal/SearchGlobal"))
const Page404 = lazy(() => import("./Pages/Page404/Page404"))
//lazy(() => import()) pages my account
const MyAccount = lazy(() => import("./Pages/MyAccount/Components/Account/MyAccount"))
const PageFirstAccount = lazy(() => import("./Pages/MyAccount/Pages/PageFirstAccount/PageFirstAccount"))
const MyCourses = lazy(() => import("./Pages/MyAccount/Pages/MyCourses/MyCourses"))
const DetailsAccount = lazy(() => import("./Pages/MyAccount/Pages/DetailsAccount/DetailsAccount"))
const Tickets = lazy(() => import("./Pages/MyAccount/Pages/Tickets/Tickets"))
const AddTicket = lazy(() => import("./Pages/MyAccount/Pages/AddTicket/AddTicket"))
//admin panel
const AdminPanel = lazy(() => import("./Pages/Admin/index"))
const AdminPanelMenus = lazy(() => import("./Pages/Admin/Pages/Menus/Menus"))
const AdminPanelArticles = lazy(() => import("./Pages/Admin/Pages/Articles/Articles"))
const AdminPanelHome = lazy(() => import("./Pages/Admin/Pages/Home/Home"))
const AdminPanelCourses = lazy(() => import("./Pages/Admin/Pages/Courses/Courses"))
const AdminPanelUsere = lazy(() => import("./Pages/Admin/Pages/Users/Users"))
const AdminPanelComments = lazy(() => import("./Pages/Admin/Pages/Comments/Comments"))
const AdminPanelOrders = lazy(() => import("./Pages/Admin/Pages/Orders/Orders"))
const AdminPanelOffs = lazy(() => import("./Pages/Admin/Pages/Offs/Offs"))
const AdminPanelCategories = lazy(() => import("./Pages/Admin/Pages/Categories/Categories"))
const AdminPanelContacts = lazy(() => import("./Pages/Admin/Pages/Contacts/Contacts"))
const AdminPanelSessions = lazy(() => import("./Pages/Admin/Pages/Sessions/Sessions"))
const AdminPanelTickets = lazy(() => import("./Pages/Admin/Pages/Tickets/Tickets"))
const AdminPanelDiscount = lazy(() => import("./Pages/Admin/Pages/Discounts/Discounts"))
const Page404admin = lazy(() => import("./Pages/Admin/Pages/Page404-admin/Page404-admin"))

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
            { path: 'tickets', element: <AdminPanelTickets /> },
            { path: 'discounts', element: <AdminPanelDiscount /> },
            { path: '*', element: <Page404admin /> },
        ]
    },
    { path: '/*', element: <Page404 /> },
]

export default routes