import {createBrowserHistory} from 'history';

// A singleton history object for easy API navigation
let historyCommon = createBrowserHistory();
//historyCommon = createBrowserHistory({ basename: '/food-blog-web' });
export default historyCommon;