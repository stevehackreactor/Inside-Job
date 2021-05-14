"use strict";
exports.__esModule = true;
require("./App.css");
var Crawler_js_1 = require("./components/Crawler.js");
var Sidebar_js_1 = require("./components/Sidebar.js");
var react_1 = require("react");
var axios = require('axios');
function App() {
    var _a = react_1.useState(''), site = _a[0], setSite = _a[1];
    var _b = react_1.useState(''), job = _b[0], setJob = _b[1];
    var _c = react_1.useState({}), bList = _c[0], setBList = _c[1];
    var handleSiteChange = function (e) {
        setSite(e.target.value);
    };
    var handleJobChange = function (e) {
        setJob(e.target.value);
    };
    react_1.useEffect(function () {
        axios
            .get('http://localhost:3003/blacklist/')
            .then(function (response) {
            var newBList = {};
            response.data.forEach(function (word) {
                newBList[word.word] = true;
            });
            setBList(newBList);
        });
    }, []);
    var titleWord = 'INSIDE-JOB'.split('');
    return className = "App" >
        id;
    "main-title" >
        { titleWord: titleWord, : .map(function (letter) { return ({ letter: letter } < /span>); }) }
        < /h1>
        < Sidebar_js_1["default"] /  >
        id;
    "crawl-meta" >
        id;
    "crawl-location";
    onChange = { handleSiteChange: handleSiteChange };
    placeholder = "Job Website" >
        /textarea>
        < textarea;
    id = "crawl-job";
    onChange = { handleJobChange: handleJobChange };
    placeholder = "Job Name" >
        /textarea>
        < Crawler_js_1["default"];
    site = { site: site };
    job = { job: job };
    bList = { bList: bList } /  >
        /div>
        < /div>;
    ;
}
exports["default"] = App;
