import Index from "./Pages/Index/Index"
import Category from "./Pages/Category/Category"
import CourseInfo from "./Pages/CourseInfo/CourseInfo"
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo"
import Page404 from "./Pages/Page404/Page404"

const routes = [
    { path: '/', element: <Index/>},
    { path: '/course-info', element: <CourseInfo/>},
    { path: '/article-info', element: <ArticleInfo/>},
    { path: '/category-info', element: <Category/>},
    { path: '/*', element: <Page404/>},
]

export default routes