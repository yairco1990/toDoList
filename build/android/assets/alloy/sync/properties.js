function S4(){return(65536*(1+Math.random())|0).toString(16).substring(1)}function guid(){return S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()}function Sync(e,t,i){var r=t.config.adapter.collection_name?t.config.adapter.collection_name:"default",n=new RegExp("^("+r+")\\-(.+)$"),o=null;if("read"===e)if(i.parse){var s=[];_.each(TAP.listProperties(),function(e){var t=e.match(n);null!==t&&s.push(TAP.getObject(e))}),o=s}else{var a=TAP.getObject(r+"-"+t.id);t.set(a),o=t.toJSON()}else"create"===e||"update"===e?(t.id||(t.id=guid(),t.set(t.idAttribute,t.id)),TAP.setObject(r+"-"+t.id,t.toJSON()||{}),o=t.toJSON()):"delete"===e&&(TAP.removeProperty(r+"-"+t.id),t.clear(),o=t.toJSON());o?(_.isFunction(i.success)&&i.success(o),"read"===e&&t.trigger("fetch")):_.isFunction(i.error)&&i.error(o)}var Alloy=require("alloy"),_=require("alloy/underscore")._,TAP=Ti.App.Properties;module.exports.sync=Sync,module.exports.beforeModelCreate=function(e){return e=e||{},e.columns=e.columns||{},e.defaults=e.defaults||{},("undefined"==typeof e.columns.id||null===e.columns.id)&&(e.columns.id="String"),e};