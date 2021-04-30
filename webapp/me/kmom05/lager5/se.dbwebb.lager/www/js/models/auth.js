import m from 'mithril';

const auth = {
    apiKey: "23369a444534d2765cdbc52396c07348",
    url: "https://lager.emilfolino.se/v2/auth/",
    email: "",
    password: "",
    token: "",
    message: "",
    login: function() {
        return m.request({
            method: "POST",
            url: auth.url + "login",
            body: {
                api_key: auth.apiKey,
                email: auth.email,
                password: auth.password
            }
        }).then(function(result) {
            auth.email = "";
            auth.password = "";

            auth.token = result.data.token;
            auth.message = result.data.message;

            return m.route.set("/");
        }).catch(function(reason) {
            auth.message = reason.response.errors.detail;
        });
    },
    register: function() {
        return m.request({
            method: "POST",
            url: auth.url + "register",
            body: {
                api_key: auth.apiKey,
                email: auth.email,
                password: auth.password
            }
        }).then(function(result) {
            auth.token = "";
           
            auth.login();
        }).catch(function(reason) {
            auth.message = reason.response.errors.detail;
        });;
    }
};

export { auth };
