function __processArg(t,e){var i=null;return t&&(i=t[e]||null,delete t[e]),i}function Controller(){function t(t){console.log(t),i.textField.value=""}function e(t){console.log(t),"dishes"==t.source.id?("/Vdishes.png"!=t.source.image&&(t.source.image="/Vdishes.png"),"/laundery.png"!=i.laundery.image&&(i.laundery.image="/laundery.png")):("/Vlaundery.png"!=t.source.image&&(t.source.image="/Vlaundery.png"),"/dishes.png"!=i.dishes.image&&(i.dishes.image="/dishes.png"))}require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="index",arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var i=this,r={},s={};i.__views.win=Ti.UI.createWindow({backgroundColor:"white",layout:"vertical",id:"win"}),i.__views.win&&i.addTopLevelView(i.__views.win),i.__views.headerView=Ti.UI.createView({top:"50",height:"Ti.UI.SIZE",id:"headerView"}),i.__views.win.add(i.__views.headerView),i.__views.textField=Ti.UI.createTextField({borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,top:"13",left:"10",right:"300",value:"Enter your task.",textAlign:"left",height:"65",font:{fontSize:50,fontWeight:"bold"},id:"textField"}),i.__views.headerView.add(i.__views.textField),t?i.__views.textField.addEventListener("click",t):s["$.__views.textField!click!cleanText"]=!0,i.__views.addButton=Ti.UI.createButton({right:"10",top:"10",height:"70",width:"80",title:"Add!",id:"addButton"}),i.__views.headerView.add(i.__views.addButton),i.__views.dishes=Ti.UI.createImageView({image:"/dishes.png",width:"70",height:"70",right:"110",top:"10",id:"dishes"}),i.__views.headerView.add(i.__views.dishes),e?i.__views.dishes.addEventListener("click",e):s["$.__views.dishes!click!doClick"]=!0,i.__views.laundery=Ti.UI.createImageView({image:"/laundery.png",width:"70",height:"70",right:"200",top:"10",id:"laundery"}),i.__views.headerView.add(i.__views.laundery),e?i.__views.laundery.addEventListener("click",e):s["$.__views.laundery!click!doClick"]=!0,i.__views.__alloyId0=Ti.UI.createView({height:"2",backgroundColor:"#abce12",top:"5",id:"__alloyId0"}),i.__views.win.add(i.__views.__alloyId0),i.__views.tableView=Ti.UI.createTableView({top:"5",id:"tableView"}),i.__views.win.add(i.__views.tableView),r.destroy=function(){},_.extend(i,i.__views),i.win.open();var n=function(){var t=Ti.UI.createTableViewRow({height:"80"}),e=Ti.UI.createLabel({text:i.textField.getValue().fontsize(8)}),r=Ti.UI.createButton({title:"Done",top:8,right:10,width:70,height:30,borderColor:"#666",borderWidth:2,borderRadius:3,backgroundColor:"green",backgroundImage:"none",color:"#fff",font:{fontSize:23,fontWeight:"bold"}}),s=Ti.UI.createButton({id:"delrow",myrow:t,title:"Delete",bottom:8,right:10,width:70,height:30,borderColor:"#666",borderWidth:2,borderRadius:3,backgroundColor:"red",backgroundImage:"none",color:"#fff",font:{fontSize:22,fontWeight:"bold"}}),n="/appicon.png";"/Vdishes.png"==i.dishes.image?n="/dishes.png":"/Vlaundery.png"==i.laundery.image&&(n="/laundery.png");var o=Ti.UI.createView({backgroundImage:n,width:"70",height:"70",left:"5"});t.add(r),t.add(s),t.add(o),t.add(e),i.tableView.appendRow(t),r.addEventListener("click",function(){t.backgroundColor="#abce12"})};i.addButton.addEventListener("click",n),s["$.__views.textField!click!cleanText"]&&i.__views.textField.addEventListener("click",t),s["$.__views.dishes!click!doClick"]&&i.__views.dishes.addEventListener("click",e),s["$.__views.laundery!click!doClick"]&&i.__views.laundery.addEventListener("click",e),_.extend(i,r)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;