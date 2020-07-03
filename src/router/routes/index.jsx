import App from '../../App.js';
import A from '../../view/A/index.jsx'
import B from '../../view/B/index.jsx'
import C from '../../view/C/index.jsx'

const routes = [
    {
        exact: true,
        path: "/",
        component: App
    },
    {
        path: "/a",
        component: A,
    },
    {
        path: "/b",
        component: B,
    },
    {
        path: "/c",
        component: C,
    }
];

export default routes
