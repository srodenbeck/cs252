import React from 'react'
import ReactDOM from 'react-dom'
import App2 from './App2';


let RenderComponent = () =>
	ReactDOM.render(
    	    <App2 />,
	  document.getElementById('container')
	);


window.RenderComponent = RenderComponent;
