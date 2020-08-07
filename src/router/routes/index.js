import Index from '../../view/Index'
import Login from '../../view/Login'
import Register from '../../view/Register'
import Board from '../../view/Board'
import Category from '../../view/Category'
import BanView from '../../view/BanView'
import Test from '../../view/Test'

const routes = [
    {
        path: '/test',
        component: Test
    },
    {
        path: '/login',
        component: Login,
        permissionGroupList: [['noLogin']],
    },
    {
        path: '/register',
        component: Register,
        permissionGroupList: [['noLogin']],
    },
    {
        path: '/ban',
        component: BanView
    },
    {
        component: Index,
        path: '/',
        permissionGroupList: [['canVisit'], ['noLogin']],
        backUrl: '/ban',
        routes: [
            {
                path: '/category',
                component: Category,
                routes: [
                    {
                        path: '/board',
                        component: Board
                    }
                ]
            }
        ]
    }
]

export default routes
