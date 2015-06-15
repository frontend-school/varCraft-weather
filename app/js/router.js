window.varCraft = window.varCraft || {};
window.varCraft.router = window.varCraft.router || {};



window.varCraft.router = (function(namespace){
        function add(routeId, page, verify){
                    if(typeof routeId === "string" && typeof verify == "function"){
                        for (var i = 0; i < this.routes.length; i++) {
                            if(this.routes[i].routeId === routeId) {
                                console.log("[main Router]: Route ", routeId, "is already exist ");
                                return ;
                            }
                        }
                        this.routes.push({routeId: routeId, page: page, verify: verify});
                    }
                }

        function check(route){
            for (var i = 0; i < this.routes.length; i++) {
                if(this.routes[i].routeId === route) {
                    return i;
                }
            }
           //console.log("[main Router]: Route ", route, " doesn't exist");
           return;
        }


        function switchRoute(newRoute){
            var routeNum = this._check(newRoute);

            if(this.routes[routeNum] === this.routes[this.curRoute]){
                return;
            }

            if(this.routes[routeNum]){
                if(this.routes[routeNum].verify()){
                    location.hash = this.routes[routeNum].routeId;
                    console.log("[router]: we switched to", newRoute);
                    namespace.dom.addClass(this.routes[this.curRoute].page, "hide");
                    namespace.dom.removeClass(this.routes[routeNum].page, "hide");
                    this.curRoute = routeNum;

                    return true;
                }
                else{
                  console.log("[router]: you have no rights to switch into route: ", this.routes[routeNum] );
                  location.hash = this.routes[this.curRoute].routeId;
                  return false;
                }
            }
            else{
                console.log("[router]: such route doesn't exist: ", newRoute);
                location.hash = this.routes[this.curRoute].routeId;
                return false;
            }
        }

        function listen(){
            var self = this;

            function fn(){
                var match = window.location.href.match(/#(.*)$/);
                var newHash = match ? match[1] : '';
                newHash = newHash.toString().replace(/#/, '');

                //console.log("[hash] changed to", newHash);
                switchRoute.call(self, newHash);
            }

            clearInterval(self.interval);
            self.interval = setInterval(fn, 50);

        }

        return {
            routes: [],
            curRoute: 0,
            _add: add,
            _check: check,
            _switchRoute: switchRoute,
            _listen: listen
        };


})(window.varCraft);