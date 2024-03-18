import Index from "./Pages/Index/Index"
import CategoryCourses from "./Pages/CategoryCourses/CategoryCourses"
import CategoryArticles from "./Pages/CategoryArticles/CategoryArticles"
import CourseInfo from "./Pages/CourseInfo/CourseInfo"
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo"
import Page404 from "./Pages/Page404/Page404"

const routes = [
    { path: '/', element: <Index/>},
    { path: '/course-info', element: <CourseInfo/>},
    { path: '/article-info', element: <ArticleInfo/>},
    { path: '/category-articles', element: <CategoryArticles/>},
    { path: '/category-courses', element: <CategoryCourses/>},
    { path: '/*', element: <Page404/>},
]

export default routes