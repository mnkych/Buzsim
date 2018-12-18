var axios = require('axios');
axios.defaults.baseURL =  process.env.REACT_APP_DB_SERVICE
export default axios