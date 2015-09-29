///<reference path="entities.ts" />
///<reference path="promise.ts" />
var SimpleSniptClient = (function () {
    function SimpleSniptClient(username, apiKey) {
        this.username = username;
        this.apiKey = apiKey;
        this.username = username;
        this.apiKey = apiKey;
        this.host = "https://snipt.net/api";
        this.scope = "private";
    }
    SimpleSniptClient.prototype.getAllBlogPostsAsync = function () {
        var resultPromise = new MPromise();
        var requestUrl = this.host;
        requestUrl += '/';
        requestUrl += this.scope;
        requestUrl += '/snipt'; // Refacto here
        requestUrl += '/?';
        requestUrl += 'username=';
        requestUrl += this.username;
        requestUrl += '&api_key=';
        requestUrl += this.apiKey;
        requestUrl += '&format=json';
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (ev) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var posts = [];
                var elementsToRemove;
                for (var p in response.objects) {
                    if (response.objects.hasOwnProperty(p)) {
                        var element = response.objects[p];
                        if (element.blog_post) {
                            posts.push(element);
                        }
                    }
                }
                resultPromise.validate(posts);
            }
        };
        xhr.onerror = function (ev) {
            resultPromise.reject(new Error("Error ejecutando la petición HTTP"));
        };
        xhr.open('GET', requestUrl, true);
        xhr.send(null);
        return resultPromise;
    };
    return SimpleSniptClient;
})();

//# sourceMappingURL=dist/maps/sniptclient.js.map