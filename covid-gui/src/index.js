import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import CovidDashboard from "./Dashboard";
require("jspolyfill-array.prototype.findIndex");
require("es6-object-assign").polyfill();
require("es6-promise").polyfill();

var sAgent = window.navigator.userAgent;
var Idx = sAgent.indexOf("MSIE");

// If IE, return version number.
if (Idx > 0)
    alert('IE 10 or older does not very well with React, please use a modern browser (Chrome, Firefox, Edge, etc)');
// If IE 11 then look for Updated user agent string.
else if (!!navigator.userAgent.match(/Trident\/7\./)) {
    alert('IE 11 does not work very well with React, please use a modern browser (Chrome, Firefox, Edge, etc)');
}

ReactDOM.render(<CovidDashboard/>, document.getElementById('root'));
serviceWorker.unregister();
