import App from '../../App.js';
import Login from '../../view/Login'

const routes = [
    {
        path: "/login",
        component: Login,
    },
    {
        component: App,
        path: "/",
        routes: [
            // {
            //     path: "/a",
            //     component: A,
            // },
            // {
            //     path: "/b",
            //     component: B,
            // }
        ]
    }
];

export default routes
