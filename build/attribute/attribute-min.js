YUI.add("attribute",function(C){C.State=function(){this.data={};};C.State.prototype={add:function(O,Y,b){var a=this.data;a[Y]=a[Y]||{};a[Y][O]=b;},addAll:function(O,a){var Y;for(Y in a){if(a.hasOwnProperty(Y)){this.add(O,Y,a[Y]);}}},remove:function(O,Y){var a=this.data;if(a[Y]&&(O in a[Y])){delete a[Y][O];}},removeAll:function(O,a){var Y=this.data;C.each(a||Y,function(c,b){if(C.Lang.isString(b)){this.remove(O,b);}else{this.remove(O,c);}},this);},get:function(O,Y){var a=this.data;return(a[Y]&&O in a[Y])?a[Y][O]:undefined;},getAll:function(O){var a=this.data,Y;C.each(a,function(c,b){if(O in a[b]){Y=Y||{};Y[b]=c[O];}},this);return Y;}};var I=C.Object,J=C.EventTarget,U=".",S="Change",L="getter",K="setter",M="readOnly",V="writeOnce",Z="validator",G="value",N="valueFn",E="broadcast",Q="lazyAdd",X="added",B="initializing",H="initValue",T="published",R="defaultValue",A="lazy",P="isLazyAdd",F,W={};W[M]=1;W[V]=1;W[L]=1;W[E]=1;function D(){this._ATTR_E_FACADE={};J.call(this,{emitFacade:true});this._conf=new C.State();}D.INVALID_VALUE={};F=D.INVALID_VALUE;D._ATTR_CFG=[K,L,Z,G,N,V,M,Q,E];D.prototype={addAttr:function(a,Y,c){var O=this._conf;c=(Q in Y)?Y[Q]:c;if(c&&!this.attrAdded(a)){O.add(a,A,Y||{});O.add(a,X,true);}else{if(!this.attrAdded(a)||O.get(a,P)){Y=Y||{};var d,b=(G in Y);if(b){d=Y.value;delete Y.value;}Y.added=true;Y.initializing=true;O.addAll(a,Y);if(b){this.set(a,d);}O.remove(a,B);}}return this;},attrAdded:function(O){return !!this._conf.get(O,X);},modifyAttr:function(a,Y){if(this.attrAdded(a)){if(this._isLazyAttr(a)){this._addLazyAttr(a);}var b,O=this._conf;for(b in Y){if(W[b]&&Y.hasOwnProperty(b)){O.add(a,b,Y[b]);if(b===E){O.remove(a,T);}}}}},removeAttr:function(O){this._conf.removeAll(O);},get:function(b){var e=b,a=this._conf,c,O,d;if(b.indexOf(U)!==-1){c=b.split(U);b=c.shift();}if(this._tCfgs&&this._tCfgs[b]){var Y={};Y[b]=this._tCfgs[b];delete this._tCfgs[b];this._addAttrs(Y,this._tVals);}if(this._isLazyAttr(b)){this._addLazyAttr(b);}d=a.get(b,G);O=a.get(b,L);d=(O)?O.call(this,d,e):d;d=(c)?I.getValue(d,c):d;return d;},_isLazyAttr:function(O){return this._conf.get(O,A);},_addLazyAttr:function(a){var Y=this._conf;var O=Y.get(a,A);Y.add(a,P,true);Y.remove(a,A);this.addAttr(a,O);},set:function(O,a,Y){return this._setAttr(O,a,Y);},reset:function(O){if(O){if(this._isLazyAttr(O)){this._addLazyAttr(O);}this.set(O,this._conf.get(O,H));}else{var Y=this._conf.data.added;C.each(Y,function(a,b){this.reset(b);},this);}return this;},_set:function(O,a,Y){return this._setAttr(O,a,Y,true);},_setAttr:function(Y,c,O,a){var e=true,h=this._conf,f=h.data,d,g,i,b;if(Y.indexOf(U)!==-1){g=Y;i=Y.split(U);Y=i.shift();}if(this._isLazyAttr(Y)){this._addLazyAttr(Y);}d=(!f.value||!(Y in f.value));if(!this.attrAdded(Y)){}else{if(!d&&!a){if(h.get(Y,V)){e=false;}if(h.get(Y,M)){e=false;}}if(e){b=this.get(Y);if(i){c=I.setValue(C.clone(b),i,c);if(c===undefined){e=false;}}if(e){if(h.get(Y,B)){this._setAttrVal(Y,g,b,c);}else{this._fireAttrChange(Y,g,b,c,O);}}}}return this;},_fireAttrChange:function(b,f,e,a,d){var O=b+S,Y=this._conf,c;if(!Y.get(b,T)){this.publish(O,{queuable:false,defaultFn:this._defAttrChangeFn,silent:true,broadcast:Y.get(b,E)});Y.add(b,T,true);}c=(d)?C.merge(d):this._ATTR_E_FACADE;c.type=O;c.attrName=b;c.subAttrName=f;c.prevVal=e;c.newVal=a;this.fire(c);},_defAttrChangeFn:function(O){if(!this._setAttrVal(O.attrName,O.subAttrName,O.prevVal,O.newVal)){O.stopImmediatePropagation();}else{O.newVal=this._conf.get(O.attrName,G);}},_setAttrVal:function(j,i,d,c){var f=true,h=this._conf,a=h.get(j,Z),e=h.get(j,K),g=h.get(j,B),Y=i||j,b;if(a){var O=a.call(this,c,Y);if(!O&&g){c=h.get(j,R);O=true;}}if(!a||O){if(e){b=e.call(this,c,Y);if(b===F){f=false;}else{if(b!==undefined){c=b;}}}if(f){if(!i&&c===d){f=false;}else{if(h.get(j,H)===undefined){h.add(j,H,c);}h.add(j,G,c);}}}else{f=false;}return f;},setAttrs:function(Y){for(var O in Y){if(Y.hasOwnProperty(O)){this.set(O,Y[O]);}}return this;},getAttrs:function(b){var e={},c,Y,O,d,a=(b===true);b=(b&&!a)?b:I.keys(this._conf.data.added);for(c=0,Y=b.length;c<Y;c++){O=b[c];d=this.get(O);if(!a||this._conf.get(O,G)!=this._conf.get(O,H)){e[O]=this.get(O);}}return e;},addAttrs:function(O,Y,a){if(O){this._tCfgs=O;this._tVals=this._splitAttrVals(Y);this._addAttrs(O,this._tVals,a);this._tCfgs=this._tVals=null;}return this;},_addAttrs:function(Y,a,b){var O,c,d;for(O in Y){if(Y.hasOwnProperty(O)){c=Y[O];c.defaultValue=c.value;d=this._getAttrInitVal(O,c,this._tVals);if(d!==undefined){c.value=d;}if(this._tCfgs[O]){delete this._tCfgs[O];}this.addAttr(O,c,b);}}},_splitAttrVals:function(b){var d={},c={},e,O,a,Y;if(b){for(Y in b){if(b.hasOwnProperty(Y)){if(Y.indexOf(U)!==-1){e=Y.split(U);O=e.shift();a=c[O]=c[O]||[];a[a.length]={path:e,value:b[Y]};}else{d[Y]=b[Y];}}}return{simple:d,complex:c};}else{return null;}},_getAttrInitVal:function(f,d,h){var Y=(d.valueFn)?d.valueFn.call(this):d.value,O,a,c,b,j,g,e;if(!d.readOnly&&h){O=h.simple;if(O&&O.hasOwnProperty(f)){Y=O[f];}a=h.complex;if(a&&a.hasOwnProperty(f)){e=a[f];for(c=0,b=e.length;c<b;++c){j=e[c].path;g=e[c].value;I.setValue(Y,j,g);}}}return Y;}};C.mix(D,J,false,null,1);C.Attribute=D;},"@VERSION@",{requires:["event-custom"]});