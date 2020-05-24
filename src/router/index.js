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
                component: loadView('petsizesController'),
                meta: { 
                    requiresAuth: true,
                    role: "Owner"
                }    
            },
            {
                name: 'pettypesController',
                path: '/pettype',
                component: loadView('pettypesController'),
                meta: { 
                    requiresAuth: true,
                    role: "Owner"
                }  
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
                    requiresAuth: true,
                    role: "Owner"
                }   
            },
            {
                name: 'servicesController',
                path: '/service',
                component: loadView('servicesController'),
                meta: { 
                    requiresAuth: true,
                    role: "Owner"
                }  
            },
            {
                name: 'suppliersController',
                path: '/supplier',
                component: loadView('suppliersController'),
                meta: { 
                    requiresAuth: true,
                    role: "Owner"
                } 
            },
            {
                name: 'serviceDetailController',
                path: '/servicedetail',
                component: loadView('serviceDetailController'),
                meta: { 
                    requiresAuth: true,
                    role: "Owner"
                } 
            },
            {
                name: 'restockController',
                path: '/restock',
                component: loadView('restockController'),
                meta: { 
                    requiresAuth: true,
                    role: "Owner"
                } 
            },
            {
                name: 'customerController',
                path: '/customer',
                component: loadView('customerController'),
                meta: { 
                    requiresAuth: true,
                    role: "CS"
                } 
            },
            {
                name: 'petController',
                path: '/pet',
                component: loadView('petController'),
                meta: { 
                    requiresAuth: true,
                    role: "CS"
                } 
            },
            {
                name: 'transactionProductController',
                path: '/transProduct',
                component: loadView('transactionProductController'),
                meta: { 
                    requiresAuth: true,
                    role: "CS"
                } 
            },
            {
                name: 'transactionServiceController',
                path: '/transService',
                component: loadView('transactionServiceController'),
                meta: { 
                    requiresAuth: true,
                    role: "CS"
                } 
            },
            {
                name: 'transactionProductKSController',
                path: '/transProductKS',
                component: loadView('transactionProductKSController'),
                meta: { 
                    requiresAuth: true,
                    role: "Kasir"
                } 
            },
            {
                name: 'transactionServiceKSController',
                path: '/transServiceKS',
                component: loadView('transactionServiceKSController'),
                meta: { 
                    requiresAuth: true,
                    role: "Kasir"
                } 
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
      }
      next('/login') 
    } else {
      next() 
    }
  })
            
export default router 