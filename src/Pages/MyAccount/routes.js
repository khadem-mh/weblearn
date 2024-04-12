import MyAccount from "./MyAccount";
import Index from "./Index/Index";
import MyCourses from "./MyCourses/MyCourses";
import DetailsAccount from "./DetailsAccount/DetailsAccount";
import Tickets from "./Tickets/Tickets";
import Page404 from "../Page404/Page404";

const routesAccount = [
    { path: '/my-account', element: <MyAccount children={< Index />} /> },
    { path: '/my-account/my-courses', element: <MyAccount children={< MyCourses />} /> },
    { path: '/my-account/details-account', element: <MyAccount children={< DetailsAccount />} /> },
    { path: '/my-account/tickets', element: <MyAccount children={< Tickets />} /> },
    { path: '/my-account/*', element: < Page404 /> },
]
export default routesAccount