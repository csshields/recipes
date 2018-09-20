// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from 'firebase';
import FirebaseConfig from '../firebaseConfig';

Vue.config.productionTip = false

//let app;

firebase.initializeApp(FirebaseConfig)
firebase.auth().onAuthStateChanged(function(user) {

    /* eslint-disable no-new */
    new Vue({
		el: '#app',
		template: '<App/>',
		components: { App },
		router
    });

});