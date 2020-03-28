import axios from 'axios';

export const axiosHandler = {
  methods: {
    sendAxios: function(payLoadObj, settingsObj) {
      var axiosUrl = settingsObj.url,
      axiosMethod = settingsObj.method,
      data = payLoadObj,
      //need this to avoid CORS error
      headerObj = {};
      console.log(settingsObj);
      //send the request
      axios({
        method: axiosMethod,
        url: axiosUrl,
        headers: headerObj,

        data: data
      })
      //done call (promise)
      .then((result) => {
        console.log(result);
        settingsObj.callBack(result);
      })
      //catch errors
      .catch((error) => {
        console.log(error);
      });


    }
  }
};