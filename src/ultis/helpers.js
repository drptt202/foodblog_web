import moment from 'moment';

const helpers = {
    getEndPointAPI: function () {
        return process.env.REACT_APP_API_ENDPOINT
    },

    generateFullImage: function (string){
        return string ? (process.env.REACT_APP_BASE_URL + string) : null;
    },

    getAuthUserId: function (){
        let userId = parseInt(localStorage.getItem('authUserId'));
        return userId ? parseInt(userId) : null;
    },

    getNow: function (format = 'HH:mm:ss') {
        return moment().format(format);
    },

    redirectForce: function (url, isBlank = false) {
        isBlank ? window.open(url, '_blank') : window.open(url)
    },

    makeUUID: function(length = 10) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        
        return result;
    }
}
export default helpers;
