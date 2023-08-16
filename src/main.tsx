import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'reflect-metadata';
import App from './App.tsx';
import './index.css';
import store from './stores/store.ts';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
