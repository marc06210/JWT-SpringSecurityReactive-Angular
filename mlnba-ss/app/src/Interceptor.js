import fetchIntercept from 'fetch-intercept';
 
export const unregister = fetchIntercept.register({
    request: function (url, config) {
        const token = window.sessionStorage.getItem("jwt");
        console.log('fetch token: ' + token)
        // Modify the url or config here
        if(config==null) {
            config = {
                headers : {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }
        }

        if(token!=null) {
            config.headers.Authorization = 'Bearer ' + token
        }
        return [url, config];
    },
 
    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        console.log('here error')
        return Promise.reject(error);
    },
 
    response: function (response) {
        // Modify the reponse object
        console.log('here response');
        if(response.status===401) {
            window.location.href = response.url;
            return response;
        }
        return response;
    },
 
    responseError: function (error) {
        // Handle an fetch error
        console.log('here response error');
        return Promise.reject(error);
    }
});