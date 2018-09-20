import Vue from 'vue';
import Router from 'vue-router';

import Hello from '@/components/Hello';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import firebase from 'firebase';


Vue.use(Router);

let router = new Router({
  routes: [
     {
		path: '*',
		redirect: '/login'
    },
    {
		path: '/',
		redirect: '/login'
    },
    {
		path: '/login',
		name: 'Login',
		component: Login,     	
    },
    {
		path: '/hello',
		name: 'Hello',
		component: Hello
    },
    {
    	path: '/sign-up',
    	name: 'Signup',
      	component: Signup,
      	meta: {
      		requiresAuth: true
      	}
    }
  ]
});

router.beforeEach((to, from, next) => {
	let ifLoggedIn = firebase.auth().currentUser;
	let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	let pageNeedsLogin = !(to.path === "/sign-up" || to.path === "/login");

	if(ifLoggedIn){
		if(pageNeedsLogin){
			next();
		}else{
			next('hello');
		}
	}else{
		if(pageNeedsLogin){
			next('login');
		}else{
			next();
		}
	}


});

export default router;
