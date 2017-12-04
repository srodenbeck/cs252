import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-theme.css';
import App from './App2';
//import registerServiceWorker from './registerServiceWorker';


let RenderComponent = () =>
	ReactDOM.render(
    	    <App/>,
	  document.getElementById('crypt')
	);


window.RenderComponent = RenderComp
