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
        // https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
        if(response.ok) {
            return response;
        } else {
            console.log(response);
            if(response!=null && response.status===401) {
                window.location.href = '/login';
                return response;
            }
            return response;
        }
    },
 
    responseError: function (error) {
        // Handle an fetch error
        console.log('here response error');
        return Promise.reject(error);
    }
});