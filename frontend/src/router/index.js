import Vue from 'vue';
import VueRouter from 'vue-router';
// User routing
const Home=()=>import('../views/home.vue');
const login=()=>import('../views/login.vue');
const bookSearch=()=>import('../components/content/bookSearch.vue');
const myLend=()=>import('../views/homeChild/mylend.vue');
const myInfo=()=>import('../views/homeChild/myInfo.vue');


// Admin routing
const admin=()=>import('../views/admin.vue');
const lendBook=()=>import('../views/adminChild/lendBook.vue');
const addBook=()=>import('../views/adminChild/addBook.vue');
const addStudent=()=>import('../views/adminChild/addStudent.vue');
const allStudent=()=>import('../views/adminChild/allStudent.vue');
const bookManage=()=>import('../views/adminChild/bookManage.vue');
const returnBook=()=>import('../views/adminChild/returnBook.vue');
Vue.use(VueRouter);

// Solve the problem of repeated jump route error reporting
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
};
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch(err => err);
};


const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/home',
    component: Home,
    children:[
      {
        path:'',
        redirect:'mylend'
      },
      {
        path:'mylend',
        component:myLend
      },
      {
        path:'booksearch',
        component:bookSearch
      },{
        path:'myInfo',
        component:myInfo
      }
    ]
  },
  {
    path: '/admin',
    component:admin,
    children:[
      {
        path:'',
        redirect:'lendbook'
      },
      {
        path:'booksearch',
        component:bookSearch
      },
      {
        path:'lendbook',
        component:lendBook
      },
      {
        path:'addbook',
        component:addBook
      },
      {
        path:'addstudent',
        component:addStudent
      },
      {
        path:'allstudent',
        component:allStudent
      },
      {
        path:'bookmanage',
        component:bookManage
      },
      {
        path:'returnbook',
        component:returnBook
      },
      
    ]
  },{
    path:'/login',
    component:login
  }
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
