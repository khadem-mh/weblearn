import Index from "./Pages/Index/Index"
import CategoryCourses from "./Pages/CategoryCourses/CategoryCourses"
import CategoryArticles from "./Pages/CategoryArticles/CategoryArticles"
import AllCourses from "./Pages/AllCourses/AllCourses"
import CourseInfo from "./Pages/CourseInfo/CourseInfo"
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo"
import Lesson from "./Pages/Lesson/Lesson"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import Page404 from "./Pages/Page404/Page404"
//import pages my account
import MyAccount from "./Pages/MyAccount/Components/Account/MyAccount"
import PageFirstAccount from "./Pages/MyAccount/Pages/PageFirstAccount/PageFirstAccount";
import MyCourses from "./Pages/MyAccount/Pages/MyCourses/MyCourses";
import DetailsAccount from "./Pages/MyAccount/Pages/DetailsAccount/DetailsAccount";
import Tickets from "./Pages/MyAccount/Pages/Tickets/Tickets";
import AddTicket from "./Pages/MyAccount/Pages/AddTicket/AddTicket";


const routes = [
    //Routes Main
    { path: '/', element: <Index /> },
    { path: 'course-info/:course', element: <CourseInfo /> },
    { path: 'article-info/:name', element: <ArticleInfo /> },
    { path: 'all-articles/page/:count', element: <CategoryArticles /> },
    { path: ':category/page/:count', element: <CategoryCourses /> },
    { path: 'all-courses/page/:count', element: <AllCourses /> },
    { path: 'lesson', element: <Lesson /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
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
    { path: '/*', element: <Page404 /> },
]

export default routes