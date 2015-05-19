!function(){var a;a=function(){function a(a){var b,c,d,e,f,g,h,i,j,k,l,m,n;for(this.current=ko.observable(null),this.routes=[],c=0,e=a.length;e>c;c++){if(j=a[c],!j)throw this.errorMessages.invalidRoute;if(!j.name)throw this.errorMessages.invalidRouteName;if(!j.url)throw this.errorMessages.invalidRouteUrl;if(h=/:([a-z][a-z0-9]+)/gi,n=("/"===j.url[0]?j.url:"/"+j.url).trim(),l="^"+n.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")+"\\/?(#.*)?(\\?.*)?$",l=l.replace(h,"([a-z0-9]+)"),i=j.url.match(h),g=j.name.trim(),!g)throw this.errorMessages.invalidRouteName;if(!n)throw this.errorMessages.invalidRouteUrl;for(j.component&&ko.components.register(g,j.component),m={component:g,parameters:i?i.map(function(a){return a.slice(1)}):[],regex:new RegExp(l,"i")},k=this.routes,d=0,f=k.length;f>d;d++){if(b=k[d],b.component===m.component)throw this.errorMessages.routesWithDuplicateName;if(b.regex.toString()===m.regex.toString())throw this.errorMessages.routesWithDuplicateUrl}this.routes.push(m)}}return a.prototype.errorMessages={invalidRoute:"Invalid route",invalidRouteName:"Route has no name",invalidRouteUrl:"Route has an invalid URL",routesWithDuplicateName:"Multiple routes added with the same name",routesWithDuplicateUrl:"Multiple routes added with the same URL"},a.prototype.go=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;if(r=this.routes.filter(function(b){return b.regex.test(a)})[0]){if(l={},m={},c=null,r.parameters.length)for(i=a.match(r.regex).slice(1),f=e=0,p=r.parameters.length-1;p>=0?p>=e:e>=p;f=p>=0?++e:--e)l[r.parameters[f]]=i[f];if(d=a.indexOf("#")+1,n=a.indexOf("?")+1,d>0&&(1>n&&(c=a.slice(d)),n>d&&(c=a.slice(d,+(n-2)+1||9e9))),n>0)for(o=a.slice(n).split("&"),g=0,h=o.length;h>g;g++)k=o[g],b=k.indexOf("="),j=null,s=null,b>0?(q=k.split("="),j=q[0],s=q[1]):j=k,m[j]?s&&("array"==typeof m[j]?m[j].push(s):m[j]=[m[j],s]):m[j]=s;return this.current({component:r.component,parameters:l,hash:c,query:m})}return this.current(null)},a}();var b;b=function(a){var b;return b=function(){function b(){this.router=null,this.baseUrl=location.protocol+"//"+location.host}return b.prototype.init=function(b,c){if(this.router)throw"Router has already been initialised";return this.router=new Router(b),this.router.go(location.pathname),c||(c=document.body),c.setAttribute("data-bind","component: { name: current().compoent, params: { params: current().parameters, hash: current().hash, query: current().query } }"),document.body.addEventListener("click",function(a){return function(b){return"a"===b.target.tagName.toLowerCase()&&b.target.href.slice(0,a.baseUrl.length)===a.baseUrl?(a.go(b.target.href.slice(a.baseUrl.length)),b.stopPropagation(),b.preventDefault()):void 0}}(this),!1),a.applyBindings(this.router)},b.prototype.go=function(a){if(!this.router)throw"Router has not been initialised";return history.pushState(null,null,a),this.router.go(a)},b}(),a.singlePage?void 0:a.singlePage=new b};"function"==typeof define&&define.amd;if(amdAvailble&&define(["knockout"],b),ko)b(ko);else if(!amdAvailble)throw"Unable to find knockout"}();