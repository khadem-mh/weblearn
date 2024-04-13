import Index from "./Pages/Index/Index"
import CategoryCourses from "./Pages/CategoryCourses/CategoryCourses"
import CategoryArticles from "./Pages/CategoryArticles/CategoryArticles"
import CourseInfo from "./Pages/CourseInfo/CourseInfo"
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo"
import Lesson from "./Pages/Lesson/Lesson"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import Page404 from "./Pages/Page404/Page404"
//import pages my account
import PageFirstAccount from "./Pages/MyAccount/PageFirstAccount/PageFirstAccount";
import MyCourses from "./Pages/MyAccount/MyCourses/MyCourses";
import DetailsAccount from "./Pages/MyAccount/DetailsAccount/DetailsAccount";
import Tickets from "./Pages/MyAccount/Tickets/Tickets";


const routes = [
    //Routes Main
    { path: '/', element: <Index /> },
    { path: '/course-info', element: <CourseInfo /> },
    { path: '/article-info', element: <ArticleInfo /> },
    { path: '/category-articles', element: <CategoryArticles /> },
    { path: '/category-courses', element: <CategoryCourses /> },
    { path: '/lesson', element: <Lesson /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    //Route Account
    {
        path: '/my-account/*', element: < PageFirstAccount />, children: [
            { path: 'my-courses', element: < MyCourses /> },
            { path: 'details-account', element: < DetailsAccount /> },
            { path: 'tickets', element: < Tickets /> },
            { path: '*', element: < Page404 /> },
        ]
    },
    { path: '/*', element: <Page404 /> },
]


export default routes