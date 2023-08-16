// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAhubiRs1sSVE1MeSq8AQ5Ds50LRDaUMB0',
	authDomain: 'masstodon.firebaseapp.com',
	projectId: 'masstodon',
	storageBucket: 'masstodon.appspot.com',
	messagingSenderId: '380314695830',
	appId: '1:380314695830:web:eb9c55f10936ad5f8faab7',
	measurementId: 'G-46MG7C7G9L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const fireauth = getAuth();
