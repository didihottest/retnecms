import Index from "./views/Index";
import Posts from "./views/Posts";
import Users from "./views/Users";

let routes = [
    {
        path: "admin/index",
        component: () => Index,
        layout: "/admin"
    },
    {
        path: "admin/posts/index",
        component: () => Posts,
        layout: "/admin"
    },
    {
        path: "admin/users/index",
        component: () => Users,
        layout: "/admin"
    }
]

export default routes;