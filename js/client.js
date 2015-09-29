///<reference path="entities.ts"/>
var Client;
(function (Client) {
    var SniptClient = (function () {
        function SniptClient(username, apikey, containerSelector) {
            this.username = username;
            this.apikey = apikey;
            this.containerSelector = containerSelector;
            this.username = username;
            this.apikey = apikey;
            this.containerSelector = containerSelector;
            this.host = "https://snipt.net/api";
            this.scope = "private";
        }
        SniptClient.prototype.GetAllPosts = function () {
            var _this = this;
            var myPosts = null;
            var requestUrl = this.host;
            requestUrl += '/';
            requestUrl += this.scope;
            requestUrl += '/snipt'; // Refacto here
            requestUrl += '/?';
            requestUrl += 'username=';
            requestUrl += this.username;
            requestUrl += '&api_key=';
            requestUrl += this.apikey;
            requestUrl += '&format=json';
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (ev) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    myPosts = response.objects;
                    _this.CreatePostsElements(myPosts);
                }
            };
            xhr.open('GET', requestUrl, true);
            xhr.send(null);
        };
        SniptClient.prototype.CreatePostsElements = function (posts) {
            var postRowContainer = document.createElement("div");
            postRowContainer.classList.add('row');
            var addedPosts = 0;
            for (var key in posts) {
                if (posts.hasOwnProperty(key)) {
                    var element = posts[key];
                    if (!element.blog_post) {
                        continue;
                    }
                    var container = document.createElement("div");
                    container.classList.add("post-resume");
                    container.classList.add("col-lg-5");
                    container.classList.add("col-lg-offset-1");
                    container.classList.add("col-sm-6");
                    var title = document.createElement("h3");
                    title.innerHTML = element.title;
                    container.appendChild(title);
                    var resume = document.createElement("p");
                    resume.innerHTML = element.code.length < 137 ? element.code : element.code.slice(0, 137);
                    resume.innerHTML += '...';
                    container.appendChild(resume);
                    var linkToPost = document.createElement("a");
                    linkToPost.href = element.full_absolute_url;
                    linkToPost.innerHTML = "Leer más";
                    container.appendChild(linkToPost);
                    if (addedPosts < 2) {
                        postRowContainer.appendChild(container);
                        addedPosts++;
                    }
                    else {
                        document.querySelector(this.containerSelector).appendChild(postRowContainer);
                        postRowContainer = document.createElement("div");
                        postRowContainer.classList.add('row');
                        postRowContainer.appendChild(container);
                        addedPosts = 1;
                    }
                }
            }
            // Agrego el último contenedor por si quedó con menos de 2 elementos
            document.querySelector(this.containerSelector).appendChild(postRowContainer);
        };
        return SniptClient;
    })();
    Client.SniptClient = SniptClient;
})(Client || (Client = {}));

//# sourceMappingURL=dist/maps/client.js.map