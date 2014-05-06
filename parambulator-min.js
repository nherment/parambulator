(function(){"use strict";function e(e){var r=e.rule.spec;h.isArray(r)||(r=[""+r]);var t=[];return r.forEach(function(r){r.match(/[*?]/)?t=t.concat(h.keys(m(r).on(e.point))):t.push(r)}),t}function r(){return!0}function t(){return!1}function n(e){return h.isUndefined(e)||h.isNull(e)}function a(e){var r={rules:e.rules,point:e.point,msgs:e.msgs,log:e.log,parents:e.parents,util:e.util};return r}function u(e,r){var t=r||"top level";return 0<e.length&&(t=h.map(e,function(e){return e.prop}).join("."),r&&(t=r+"."+t)),t}function i(){var e=[];return function(r,t){return h.contains(e,t)?"[CIRCULAR-REFERENCE]":(e.push(t),t)}}function o(){var e=arguments[0],r=arguments[1],t=arguments[2];if(t||(r=arguments[0],t=arguments[1],e=r.rule.name),!t)throw new Error("Parambulator: ctxt.util.fail: callback undefined");if(!r)return t(new Error("Parambulator: ctxt.util.fail: ctxt undefined"));var n={property:r.prop,value:r.value||JSON.stringify(r.point,i()),point:r.point,rule:r.rule,parentpath:r.util.formatparents(r.parents),json:function(e){return JSON.stringify(e,i())}},a=r.msgs[e]||e;h.isFunction(a)?a=a(n,r):(a=r.util.msgmods(a),a=h.template(a,n));var u=new Error(a);return u.parambulator={parents:r.parents,code:e,point:r.point,rule:r.rule},t(u)}function p(e){var r=[];for(var t in e){var n=t;0==t.indexOf("__")&&(n=t.substring(2),e[n]=e[t],delete e[t]),r.push(n)}return r}function l(r,t){function n(e,r,t){var a=[],u="object";for(var i in e){var o=e[i];if("default$"==i){var p={};p.pathnames=r,p.pathtypes=t.splice(1,t.length),p.defaultvalue=o,f.push(p)}"type$"==i&&(u=o),h.isObject(o)&&!h.isArray(o)&&a.push(i)}for(var l in a){o=e[a[l]];var s=r.slice();s.push(a[l]);var c=t.slice();c.push(u),n(o,s,c)}}function l(e,r){var n=t&&t.rules?t.rules[e]:null;if(n||(n=w[e]),n){var a={func:n,name:e,spec:r};return a}throw new Error("Parambulator: Unknown rule: "+e)}function s(e){var r=[],t=p(e);return t.forEach(function(t){var n=e[t];if("list$"==t)for(var a=0;a<n.length;a++){var u={};u[n[a][0]]=n[a][1],r.push(s(u)[0])}else if("prop$"==t){var i=s(n.rules),o=l("descend$",{prop:n.name,rules:i});r.push(o)}else if(t.match(/\$$/)){var o=l(t,n,e);r.push(o)}else if("**"==t){var i=s(n),o=l("recurse$",{prop:t,rules:i});r.push(o)}else if(h.isObject(n)&&!h.isArray(n)){h.each(n,function(a,u){if(u.match(/\$$/)&&h.isBoolean(a)&&a){var i=l(u,t,e);r.push(i),delete n[u]}});var i=s(n),o=l("iterate$",{prop:t,rules:i});r.push(o)}else if(h.isString(n))if(n.match(/\$/)){var p=n.split(/\s*,\s*/);h.each(p,function(e){r.push(l(e,t))})}else r.push(l("descend$",{prop:t,rules:[l("wild$",n)]}));else if(h.isNumber(n))r.push(l("descend$",{prop:t,rules:[l("eq$",n)]}));else{if(!h.isBoolean(n))throw new Error("Parambulator: Unrecognized rule specification: "+n);r.push(l("descend$",{prop:t,rules:[l("eq$",n)]}))}}),r}var c={};t=t||{};var f=[];if(h.isString(r)&&(r=v(r)),!r||!h.isObject(r)||h.isArray(r))throw new Error("Parambulator: spec argument is not an object");if(t&&(T.ownprefs&&T.ownprefs.validate(t,function(e){if(e)throw e}),t.valid&&T)){var m=T({"**":t.valid});m.validate(r,function(e){if(e)throw e})}var d=s(r);n(r,[],[]),c.toString=function(){return util.inspect(d,{depth:null})};var g=h.extend({},x,t?t.msgs:null);return c.validate=function(r,n){function p(e,t){function n(r){if(r<a.length){var u=a[r];if(!e.point)return n(r+1);e.rule=u;var o=JSON.stringify(u.spec,i());e.log.push("rule:"+u.name+":exec:"+o),u.func(e,function(a){return a?(e.log.push("rule:"+u.name+":fail:"+o),t(a,{log:e.log})):(e.log.push("rule:"+u.name+":pass:"+o),void n(r+1))})}else t(null,{log:e.log})}if(h.isUndefined(r))return o("no_input$",e,t);var a=e.rules;n(0)}function l(e,r){for(var t in f){var n=f[t],a=e.point;for(var u in n.pathnames){var i=n.pathnames[u];if(h.has(a,i))a=a[i];else if(u==n.pathnames.length-1)a[i]=n.defaultvalue;else{var o,p=n.pathtypes[u];if("object"==p)o={};else{if("array"!=p)return void e.util.fail("default$",e,r);o=[]}a[i]=o,a=o}}}r()}var s,c=t.callbackmaker?t.callbackmaker(n):n||function(){},m=function(e){s=e,c.apply(null,$(arguments))},v={rules:d,point:r,msgs:g,log:[],parents:[]};return v.util={formatparents:function(){var e=$(arguments);return e[1]=t&&t.topname&&!e[1]?t.topname:e[1],u.apply(null,e)},msgmods:function(e){return(t.msgprefix||"")+e+(t.msgsuffix||"")},fail:o,proplist:e,execrules:p,clone:a},l(v,function(e){e?m(e,{log:v.log}):p(v,function(e){m(e,{log:v.log})})}),s},c}var s=this,c=s.parambulator,f="undefined"!=typeof require,h=s._,m=s.gex,v=s.jsonic;if("undefined"==typeof h){if(!f)throw new Error("parambulator requires underscore, see http://underscorejs.org");h=require("underscore")}if("undefined"==typeof m){if(!f)throw new Error("parambulator requires gex, see http://github.com/rjrodger/gex");m=require("gex")}if("undefined"==typeof v){if(!f)throw new Error("parambulator requires jsonic, see http://github.com/rjrodger/jsonic");v=require("jsonic")}var $=function(){return Array.prototype.slice.call(arguments[0],arguments[1])},d=function(e,r){return r=r||"quantrule",function(r,t){r.prop=null;var n=r.util.proplist(r),a=0;return n.forEach(function(e){a+=r.point[e]?1:0}),e(a)?t():(r.value=""+n,r.util.fail(r,t))}},g=function(e){return function(r,t){var n=r.rule.spec,a=r.point;if(!h.isUndefined(a)){var u=h.isObject(a)?Object.keys(a).length:a.length;if(!h.isUndefined(u)&&!e(u,n))return r.util.fail(r,t)}return t()}},y=function(e,r,t){return t=t||"childrule",function(t,n){for(var a=t.util.proplist(t),u=0;u<a.length;u++){var o=a[u];t.prop=o;var p=t.point[o];if(!e(t,o,p))return t.value=p,t.util.fail(t,n)}return 0!=a.length||r()?void n():(t.prop=JSON.stringify(t.rule.spec,i()),t.util.fail(t,n))}},b=function(e){return function(r,t){var n=r.point,a=r.rule.spec;return h.isUndefined(n)||e(n,a)?t():r.util.fail(r,t)}},w={atmostone$:d(function(e){return 1>=e},"atmostone$"),exactlyone$:d(function(e){return 1==e},"exactlyone$"),atleastone$:d(function(e){return e>=1},"atleastone$"),required$:y(function(e,r,t){return!h.isUndefined(t)},t,"required$"),notempty$:y(function(e,r,t){return!h.isUndefined(t)&&!h.isNull(t)&&""!=t},r,"notempty$"),string$:y(function(e,r,t){return n(t)||h.isString(t)},r,"string$"),integer$:y(function(e,r,t){return n(t)||h.isNumber(t)&&t===(0|t)},r,"integer$"),number$:y(function(e,r,t){return n(t)||h.isNumber(t)},r,"number$"),boolean$:y(function(e,r,t){return n(t)||h.isBoolean(t)},r,"boolean$"),date$:y(function(e,r,t){return n(t)||h.isDate(t)},r,"date$"),array$:y(function(e,r,t){return n(t)||h.isArray(t)},r,"array$"),object$:y(function(e,r,t){return n(t)||h.isObject(t)&&!h.isArray(t)},r,"object$"),function$:y(function(e,r,t){return n(t)||h.isFunction(t)},r,"function$"),lt$:b(function(e,r){return r>e}),lte$:b(function(e,r){return r>=e}),gt$:b(function(e,r){return e>r}),gte$:b(function(e,r){return e>=r}),min$:b(function(e,r){return e>=r}),max$:b(function(e,r){return r>=e}),uniq$:function(e,r){for(var t=e.point,n={},a=0;a<t.length;a++){if(h.has(n,t[a]))return e.util.fail(e,r);n[t[a]]=1}return r()},only$:function(e,r){var t=e.util.proplist(e);for(var n in e.point)if(!h.include(t,n))return e.prop=n,e.util.fail(e,r);return r()},wild$:function(e,r){var t=e.point;return h.isUndefined(t)||m(e.rule.spec).on(t)?r():e.util.fail(e,r)},eq$:function(e,r){var t=e.point;return h.isUndefined(t)||e.rule.spec===t?r():e.util.fail(e,r)},minlen$:g(function(e,r){return e>=r}),maxlen$:g(function(e,r){return r>=e}),re$:function(e,r){var t=e.point;if(!h.isUndefined(t)){t=""+t;var n=e.rule.spec,a=void 0,u=/^\/(.*)\/(\w*)$/.exec(e.rule.spec);u&&(n=u[1],a=u[2]);var i=new RegExp(n,a);if(!i.exec(t))return e.util.fail(e,r)}return r()},type$:function(e,r){var t=e.util.proplist(e),n={string:h.isString,number:h.isNumber,integer:function(e){return h.isNumber(e)&&e===(0|e)},"boolean":h.isBoolean,date:h.isDate,array:h.isArray,object:function(e){return h.isObject(e)&&!h.isArray(e)&&!h.isDate(e)},"function":function(e){return h.isFunction(e)}},a=0;return t.forEach(function(r){var t=n[r.toLowerCase()];t&&(a+=t(e.point))}),a?r():e.util.fail(e,r)},format$:function(e,r){var t=e.util.proplist(e),n={datetime:function(e){return/\d{4}-(0[1-9]|1[1-2])-([0-2]\d|3[0-1])T([0-1]\d|2[0-4]):[0-5]\d:[0-5]\dZ/.test(e)},date:function(e){return/\d{4}-[0-1][0-2]-[0-2]\d/.test(e)},time:function(e){return/([0-1]\d|2[0-4]):[0-5]\d:[0-5]\dZ/.test(e)},utcmillisec:h.isNumber,re:h.isRegExp},a=0;return t.forEach(function(r){var t=n[r.toLowerCase()];t&&(a+=t(e.point))}),a?r():e.util.fail(e,r)},default$:function(e,r){return r()},enum$:function(e,r){var t=e.point,n=e.rule.spec,a=[];h.isArray(t)?a=t:a[0]=t;var u=0;return a&&a.forEach(function(e){u+=-1==n.indexOf(e)}),u?e.util.fail(e,r):r()},iterate$:function(e,r){function t(u){if(u<n.length){var i=n[u],o=e.util.clone(a);o.parents=a.parents.concat({prop:e.prop,point:e.point}),o.prop=i,o.point=a.point?a.point[i]:null,o.util.execrules(o,function(e){return e?r(e):void t(u+1)})}else r()}var n=[e.rule.spec.prop];h.isObject(e.point)&&(n=h.isArray(e.point)?m(e.rule.spec.prop).on(h.range(e.point.length)):h.keys(m(e.rule.spec.prop).on(e.point)));var a=e.util.clone(e);a.rules=e.rule.spec.rules,t(0)},recurse$:function(e,r){function t(r,n,a){function u(e,r){if(!(e<i.length))return r(null);var a=i[e],p=o.util.clone(o);p.prop=a,p.point=n[a],p.parents="$"!=a?p.parents.concat({prop:o.prop,point:o.point}):p.parents,p.util.execrules(p,function(n){return n?r(n):void t(a,p.point,function(t){return t?r(t):void u(e+1,r)})})}if(!h.isObject(n))return a(null);var i=h.keys(n),o=e.util.clone(e);o.rules=e.rule.spec.rules,o.parents="$"!=r?o.parents.concat({prop:o.prop,point:o.point}):o.parents,u(0,a)}var n=e.util.clone(e);n.point={$:e.point},t("$",n.point,r)},descend$:function(e,r){var t=e.util.clone(e),n=e.rule.spec.prop;t.rules=e.rule.spec.rules,t.parents=t.parents.concat({prop:t.prop,point:t.point}),t.prop=n,t.point=e.point[n],t.util.execrules(t,function(e){return e?r(e):void r(null)})}},x={no_input$:"There is no input parameter",atmostone$:"At most one of these properties can be used at a time: '<%=value%>'  (parent: <%=parentpath%>).",exactlyone$:"Exactly one of these properties must be used: '<%=value%>' (parent: <%=parentpath%>).",atleastone$:"At least one of these properties is required: '<%=value%>' (parent: <%=parentpath%>).",required$:"The property '<%=property%>' is missing and is always required (parent: <%=parentpath%>).",notempty$:"The property '<%=property%>' requires a value (parent: <%=parentpath%>).",string$:"The property '<%=property%>', with current value: '<%=value%>', must be a string (parent: <%=parentpath%>).",integer$:"The property '<%=property%>', with current value: '<%=value%>', must be a integer (parent: <%=parentpath%>).",number$:"The property '<%=property%>', with current value: '<%=value%>', must be a number (parent: <%=parentpath%>).",boolean$:"The property '<%=property%>', with current value: '<%=value%>', must be a boolean (parent: <%=parentpath%>).",date$:"The property '<%=property%>', with current value: '<%=value%>', must be a date (parent: <%=parentpath%>).",array$:"The property '<%=property%>', with current value: '<%=value%>', must be a array (parent: <%=parentpath%>).",object$:"The property '<%=property%>', with current value: '<%=value%>', must be a object (parent: <%=parentpath%>).",function$:"The property '<%=property%>', with current value: '<%=value%>', must be a function (parent: <%=parentpath%>).",only$:"The property '<%=property%>' is not recognised here. Recognised properties are: <%=rule.spec%> (parent: <%=parentpath%>).",wild$:"The value <%=value%> does not match the expression '<%=rule.spec%>' (parent: <%=parentpath%>).",re$:"The value <%=value%> does not match the regular expression <%=rule.spec%> (parent: <%=parentpath%>).",type$:"The value <%=value%> is not of type '<%=rule.spec%>' (parent: <%=parentpath%>).",format$:"The value <%=value%> is not of format '<%=rule.spec%>' (parent: <%=parentpath%>).",minlen$:"The property '<%=property%>', with current value: '<%=value%>', must have minimum length '<%=rule.spec%>' (parent: <%=parentpath%>).",maxlen$:"The property '<%=property%>', with current value: '<%=value%>', must have maximum length '<%=rule.spec%>' (parent: <%=parentpath%>).",eq$:"The value <%=value%> does not equal '<%=rule.spec%>' (parent: <%=parentpath%>).",lt$:"The value <%=value%> is not less than '<%=rule.spec%>' (parent: <%=parentpath%>).",lte$:"The value <%=value%> is not less than or equal with '<%=rule.spec%>' (parent: <%=parentpath%>).",gt$:"The value <%=value%> is not greater than '<%=rule.spec%>' (parent: <%=parentpath%>).",gte$:"The value <%=value%> is not not greater than or equal with '<%=rule.spec%>' (parent: <%=parentpath%>).",min$:"The value <%=value%> is not not greater than or equal with '<%=rule.spec%>' (parent: <%=parentpath%>).",max$:"The value <%=value%> is not less than or equal with '<%=rule.spec%>' (parent: <%=parentpath%>).",uniq$:"The value <%=value%> has duplicate elements.",enum$:"The value <%=value%> must be one of '<%=rule.spec%>' (parent: <%=parentpath%>)."},T=function(){var e=$(arguments);return l.apply(this,e)};T.ownparams=new l({"**":{strings$:["required$","notempty$","atmostone$","exactlyone$","atleastone$"],list$:[["prop$",{name:"wild$",rules:{type$:"string"}}],["prop$",{name:"type$",rules:{type$:["string","array"]}}],["prop$",{name:"format$",rules:{type$:["string","array"]}}],["prop$",{name:"re$",rules:{type$:"string"}}],["prop$",{name:"type$",rules:{enum$:["string","number","integer","boolean","date","array","object"]}}],["prop$",{name:"format$",rules:{enum$:["datetime","date","time","utcmillisec","re"]}}],["prop$",{name:"minlen$",rules:{type$:"number"}}],["prop$",{name:"maxlen$",rules:{type$:"number"}}],["prop$",{name:"enum$",rules:{type$:"array"}}],["prop$",{name:"list$",rules:{type$:"array"}}],["prop$",{name:"uniq$",rules:{type$:"array"}}]]}},{__ownparams__:!0,rules:{strings$:function(e,r){var t=e.rule.spec;h.isArray(t)||(t=[""+t]);for(var n=0;n<t.length;n++){var a=t[n],u=e.point[a];if(!h.isUndefined(u))if(h.isString(u));else{if(!h.isArray(u))return e.prop=a,e.util.fail(e,r);for(var i=0;i<u.length;i++)if(!h.isString(u[i]))return e.prop=a,e.util.fail(e,r)}}r(null)}},msgs:{strings$:"The <%=property%> rule needs a string or array of strings (property: <%=parentpath%>)."},topname:"spec"}),T.ownprefs=new l({object$:["valid","rules","msgs"],string$:["topname","msgprefix","msgsuffix"],function$:["callbackmaker"],only$:["valid","rules","msgs","topname","msgprefix","msgsuffix","callbackmaker"]},{topname:"prefs"}),T.Parambulator=l,s.parambulator=T,T.noConflict=function(){return s.previous_parambulator=c,self},"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=T),exports.parambulator=T):s.parambulator=T}).call(this);
//# sourceMappingURL=parambulator-min.map