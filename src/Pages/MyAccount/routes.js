import Index from "./Index/Index";
import MyCourses from "./MyCourses/MyCourses";
import DetailsAccount from "./DetailsAccount/DetailsAccount";
import Tickets from "./Tickets/Tickets";

const routes = [
    { path: '/my-account', element: < Index /> },
    { path: '/my-account/my-courses', element: < MyCourses /> },
    { path: '/my-account/details-account', element: < DetailsAccount /> },
    { path: '/my-account/tickets', element: < Tickets /> },

]
export default routes