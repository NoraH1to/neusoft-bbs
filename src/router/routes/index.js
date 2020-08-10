import Index from '../../view/Index'
import Login from '../../view/Login'
import Register from '../../view/Register'
import Board from '../../view/Board'
import Category from '../../view/Category'
import Error from '../../view/Error'
import FindPassword from '../../view/FindPassword'
import Test from '../../view/Test'

const routes = [
    {
        path: '/test',
        component: Test,
    },
    {
        path: '/login',
        component: Login,
        permissionGroupList: [['noLogin']],
        backUrl: '/',
    },
    {
        path: '/register',
        component: Register,
        permissionGroupList: [['noLogin']],
        backUrl: '/',
    },
    {
        path: '/find-password',
        component: FindPassword,
        permissionGroupList: [['noLogin']],
        backUrl: '/',
    },
    {
        path: '/error',
        component: Error,
    },
    {
        component: Index,
        path: '/',
        routes: [
            {
                path: '/category',
                component: Category,
                routes: [
                    {
                        path: '/board',
                        component: Board,
                    },
                ],
            },
        ],
    },
]

export default routes
