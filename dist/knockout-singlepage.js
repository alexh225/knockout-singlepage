!function(){var a;a=function(a){var b,c,d,e,f,g,h,i,j,k,l;if(b={hash:null,query:{}},d=a.indexOf("#")+1,i=a.indexOf("?")+1,d>0&&(1>i&&(b.hash=a.slice(d)),i>d&&(b.hash=a.slice(d,+(i-2)+1||9e9))),i>0)for(j=a.slice(i).split("&"),e=0,f=j.length;f>e;e++)h=j[e],c=h.indexOf("="),g=null,l=null,c>0?(k=h.split("="),g=k[0],l=k[1]):g=h,b.query[g]?l&&("array"==typeof b.query[g]?b.query[g].push(l):b.query[g]=[b.query[g],l]):b.query[g]=l;return b};var b;b=function(){function a(a){var b,c,d,e;if(!a.name)throw this.errors.invalidRouteName;if(!a.url)throw this.errors.invalidRouteUrl;if(b=a.name.trim(),e=("/"===a.url[0]?a.url:"/"+a.url).trim(),d="^"+e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")+"\\/?(#.*)?(\\?.*)?$",d=d.replace(this.parameterRegex,"([a-z0-9]+)"),c=a.url.match(this.parameterRegex),!b)throw this.errors.invalidRouteName;if(!e)throw this.errors.invalidRouteUrl;this.component=b,this.parameters=c?c.map(function(a){return a.slice(1)}):[],this.regex=new RegExp(d,"i")}return a.prototype.errors={invalidRouteName:"Route has no name",invalidRouteUrl:"Route has an invalid URL"},a.prototype.parameterRegex=/:([a-z][a-z0-9]+)/gi,a.prototype.clashesWith=function(a){return a.component===this.component||a.regex.toString()===this.regex.toString()},a.prototype.matches=function(a){return this.regex.test(a)},a.prototype.extractParameters=function(a){var b,c,d,e,f;if(e={},this.parameters.length)for(d=a.match(this.regex).slice(1),c=b=0,f=this.parameters.length-1;f>=0?f>=b:b>=f;c=f>=0?++b:--b)e[this.parameters[c]]=d[c];return e},a}();var c;c=function(){function a(a){this.routes=[],a&&this.add(a)}return a.prototype.errors={invalidRoute:"Invalid route",duplicateRoute:"Route clashes with existing route"},a.prototype.add=function(a){var c,d,e,f;if(Array.isArray(a)){for(f=[],c=0,d=a.length;d>c;c++)e=a[c],f.push(this.add(e));return f}if(!a)throw this.errors.invalidRoute;if(e=new b(a),this.routes.filter(function(a){return e.clashesWith(a)}).length)throw this.errors.duplicateRoute;return a.component&&ko.components.register(e.component,a.component),this.routes.push(e)},a.prototype.get=function(a){var b,c;return b=this.routes.filter(function(b){return b.matches(a)})[0],c=null,b&&(c={component:b.component,parameters:b.extractParameters(a)}),c},a}();var d;d=function(b){var d;return d=function(){function d(){this.router=null,this.baseUrl=location.protocol+"//"+location.host,this.viewModel={component:b.observable(null),parameters:b.observable(null),hash:b.observable(null),query:b.observable}}return d.prototype.init=function(a,d){if(this.router)throw"Router has already been initialised";return this.router=new c(a),this.router.go(location.pathname),d||(d=document.body),d.setAttribute("data-bind","component: { name: component(), params: { params: parameters(), hash: hash(), query: query() } }"),document.body.addEventListener("click",function(a){return function(b){return"a"===b.target.tagName.toLowerCase()&&b.target.href.slice(0,a.baseUrl.length)===a.baseUrl?(a.go(b.target.href.slice(a.baseUrl.length)),b.stopPropagation(),b.preventDefault()):void 0}}(this),!1),b.applyBindings(this.viewModel)},d.prototype.go=function(b){var c,d;if(!this.router)throw"Router has not been initialised";return d=this.router.get(b),d?(history.pushState(null,null,b),c=a(b),this.viewModel.hash(c.hash),this.viewModel.query(c.query),this.viewModel.parameters(d.parameters),this.viewModel.component(d.compoent)):void 0},d}(),b.singlePage?void 0:b.singlePage=new d};var e="function"==typeof define&&define.amd;if(e&&define(["knockout"],d),"undefined"!=typeof ko)d(ko);else if(!e)throw"Unable to find knockout"}();