import Vue from 'vue' 
import Router from 'vue-router'
import store from '../store'
 
const DashboardLayout = () => import( '../components/dashboardLayout.vue') 
 
function loadView(view) { 
    return () => import( `../components/dashboardContents/${view}.vue`) 
} 
 
const routes = [    
    {      
        path: '/',       
        component: DashboardLayout,       
        children: [        
            {           
                name: 'employeesController',           
                path: '/employee',           
                component: loadView('employeesController'),
                meta: { 
                    requiresAuth: true,
                    role: "Owner"
                }        
            },
            {
                name: 'petsizesController',           
                path: '/petsize',           
                component: loadView('petsizesController')  
            },
            {
                name: 'pettypesController',
                path: '/pettype',
                component: loadView('pettypesController')
            },
            {
                nama: 'Login',
                path: '/login',
                component: loadView('loginController')
            },
            {
                name: 'LandingController',
                path: '',
                component: loadView('landingController')
            },
            {
                name: 'productController',
                path: '/product',
                component: loadView('productController'),
                meta: { 
                    requiresAuth: true
                }
            },
            {
                name: 'servicesController',
                path: '/service',
                component: loadView('servicesController')
            },
            {
                name: 'suppliersController',
                path: '/supplier',
                component: loadView('suppliersController')
            }
        ],     
    },   
]  
Vue.use(Router) 
               
const router = new Router({mode: 'history', routes: routes}) 

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {

        if(store.getters.employeeRole === to.meta.role) {
            next()
            console.log()
            return
        }

        next('/')
        return
      }
      next('/login') 
    } else {
      next() 
    }
  })
            
export default router 