import App from '../../App';
import Login from '../../view/Login'
import Register from '../../view/Register'
import Board from '../../view/Board'
import Category from '../../view/Category'

const routes = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/register",
        compoent: Register
    },
    {
        path: "/board",
        component: Board,
    },
    {
        path: "/category",
        component: Category,
    },
    {
        path: "/user"
    },
    {
        component: App,
        path: "/"
        // routes: [
        //     {
        //         path: "/board",
        //         component: Board,
        //     },
        //     {
        //         path: "/category",
        //         component: Category,
        //     }
        // ]
    }
];

export default routes
