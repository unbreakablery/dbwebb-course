import m from 'mithril';

const auth = {
    apiKey: "23369a444534d2765cdbc52396c07348",
    url: "https://lager.emilfolino.se/v2/auth/login",
    email: "",
    password: "",
    token: "",
    login: function() {
        return m.request({
            method: "POST",
            url: auth.url,
            body: {
                api_key: auth.apiKey,
                email: auth.email,
                password: auth.password
            }
        }).then(function(result) {
            auth.email = "";
            auth.password = "";

            auth.token = result.data.token;

            return m.route.set("/");
        });
    }
};

export { auth };
