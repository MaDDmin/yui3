YUI.add("app-base",function(c){var g=c.Lang,i=c.Object,a=c.PjaxBase,d=c.Router,b=c.View,e=c.ClassNameManager.getClassName,h=c.config.win,f;f=c.Base.create("app",c.Base,[b,d,a],{views:{},initializer:function(k){k||(k={});var j={};function l(m,n){j[n]=c.merge(j[n],m);}i.each(this.views,l);i.each(k.views,l);this.views=j;this._viewInfoMap={};this.after("activeViewChange",c.bind("_afterActiveViewChange",this));if(!this.get("serverRouting")){this._pjaxBindUI();}},createView:function(m,l){var k=this.getViewInfo(m),n=(k&&k.type)||b,o,j;o=g.isString(n)?i.getValue(c,n.split(".")):n;j=new o(l);this._viewInfoMap[c.stamp(j,true)]=k;return j;},getViewInfo:function(j){if(g.isString(j)){return this.views[j];}return j&&this._viewInfoMap[c.stamp(j,true)];},render:function(){var k=this.get("container"),j=this.get("viewContainer"),l=this.get("activeView"),n=l&&l.get("container"),m=k.compareTo(j);k.addClass(f.CSS_CLASS);j.addClass(f.VIEWS_CSS_CLASS);if(l&&!j.contains(n)){j.appendChild(n);}if(!k.contains(j)&&!m){k.appendChild(j);}return this;},showView:function(j,m,l,o){var k,n;l||(l={});if(o){l.callback=o;}else{if(g.isFunction(l)){l={callback:l};}}if(g.isString(j)){k=this.getViewInfo(j);if(k&&k.preserve&&k.instance){j=k.instance;this._viewInfoMap[c.stamp(j,true)]=k;}else{j=this.createView(j,m);n=true;}}if(l.update&&!n){j.setAttrs(m);}if("render" in l){l.render&&j.render();}else{if(n){j.render();}}return this._set("activeView",j,{options:l});},_attachView:function(k,l){if(!k){return;}var m=this.getViewInfo(k),j=this.get("viewContainer");k.addTarget(this);m&&(m.instance=k);j[l?"prepend":"append"](k.get("container"));},_destroyContainer:function(){var k=this.get("container"),j=this.get("viewContainer"),l=k.compareTo(j);if(c.one("body").compareTo(k)){this.detachEvents();k&&k.removeClass(f.CSS_CLASS);if(l){k&&k.removeClass(f.VIEWS_CSS_CLASS);}else{j&&j.remove(true);}return;}j&&j.remove(true);!l&&k&&k.remove(true);},_detachView:function(j){if(!j){return;}var k=this.getViewInfo(j)||{};if(k.preserve){j.remove();}else{j.destroy({remove:true});delete this._viewInfoMap[c.stamp(j,true)];if(j===k.instance){delete k.instance;}}j.removeTarget(this);},_getViewContainer:function(j){if(!j&&!this._viewContainer){j=this._viewContainer=this.create();this._set("viewContainer",j);}return j;},_getURL:function(){var j=c.getLocation().toString();return this._html5?j:this._upgradeURL(j);},_initHtml5:function(){if(this.get("serverRouting")===false){return false;}else{return d.html5;}},_isChildView:function(j,m){var l=this.getViewInfo(j),k=this.getViewInfo(m);if(l&&k){return this.getViewInfo(l.parent)===k;}return false;},_isParentView:function(j,m){var k=this.getViewInfo(j),l=this.getViewInfo(m);if(k&&l){return this.getViewInfo(l.parent)===k;}return false;},_navigate:function(k,j){k=this._upgradeURL(k);j||(j={});if(!this.get("serverRouting")){"force" in j||(j.force=true);}return a.prototype._navigate.call(this,k,j);},_save:function(j,k){if(this.get("serverRouting")&&!this.get("html5")){if(!this._hasSameOrigin(j)){c.error("Security error: The new URL must be of the same origin as the current URL.");return this;}j=this._joinURL(j||"");if(k){h&&h.location.replace(j);}else{h&&(h.location=j);}return this;}return d.prototype._save.apply(this,arguments);},_uiSetActiveView:function(p,n,m){m||(m={});var o=m.callback,j=this._isChildView(p,n),l=!j&&this._isParentView(p,n),k=!!m.prepend||l;if(p===n){return o&&o.call(this,p);}this._attachView(p,k);this._detachView(n);o&&o.call(this,p);},_upgradeURL:function(k){if(!this._hasSameOrigin(k)){return k;}var l=(k.match(/#(.*)$/)||[])[1]||"",j=c.HistoryHash.hashPrefix;if(j&&l.indexOf(j)===0){l=l.replace(j,"");}if(l&&l.charAt(0)==="/"){k=this._resolveURL(this._joinURL(l));}return k;},_afterActiveViewChange:function(j){this._uiSetActiveView(j.newVal,j.prevVal,j.options);}},{ATTRS:{activeView:{value:null,readOnly:true},container:{valueFn:function(){return c.one("body");}},html5:{valueFn:"_initHtml5"},linkSelector:{value:"a"},serverRouting:{value:undefined,writeOnce:"initOnly"},viewContainer:{getter:"_getViewContainer",setter:c.one,writeOnce:true}},CSS_CLASS:e("app"),VIEWS_CSS_CLASS:e("app","views"),_NON_ATTRS_CFG:["views"]});c.namespace("App").Base=f;c.App=c.mix(c.Base.create("app",c.App.Base,[]),c.App,true);},"@VERSION@",{requires:["classnamemanager","pjax-base","router","view"]});