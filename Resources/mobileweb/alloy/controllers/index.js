function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function cleanText(e) {
        console.log(e);
        $.textField.value = "";
    }
    function doClick(e) {
        console.log(e);
        if ("dishes" == e.source.id) {
            "/Vdishes.png" != e.source.image && (e.source.image = "/Vdishes.png");
            "/laundery.png" != $.laundery.image && ($.laundery.image = "/laundery.png");
        } else {
            "/Vlaundery.png" != e.source.image && (e.source.image = "/Vlaundery.png");
            "/dishes.png" != $.dishes.image && ($.dishes.image = "/dishes.png");
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.headerView = Ti.UI.createView({
        top: "50",
        height: "Ti.UI.SIZE",
        id: "headerView"
    });
    $.__views.win.add($.__views.headerView);
    $.__views.textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: "13",
        left: "10",
        right: "300",
        value: "Enter your task.",
        textAlign: "left",
        height: "65",
        font: {
            fontSize: 50,
            fontWeight: "bold"
        },
        id: "textField"
    });
    $.__views.headerView.add($.__views.textField);
    cleanText ? $.__views.textField.addEventListener("click", cleanText) : __defers["$.__views.textField!click!cleanText"] = true;
    $.__views.addButton = Ti.UI.createButton({
        right: "10",
        top: "10",
        height: "70",
        width: "80",
        title: "Add!",
        id: "addButton"
    });
    $.__views.headerView.add($.__views.addButton);
    $.__views.dishes = Ti.UI.createImageView({
        image: "/dishes.png",
        width: "70",
        height: "70",
        right: "110",
        top: "10",
        id: "dishes"
    });
    $.__views.headerView.add($.__views.dishes);
    doClick ? $.__views.dishes.addEventListener("click", doClick) : __defers["$.__views.dishes!click!doClick"] = true;
    $.__views.laundery = Ti.UI.createImageView({
        image: "/laundery.png",
        width: "70",
        height: "70",
        right: "200",
        top: "10",
        id: "laundery"
    });
    $.__views.headerView.add($.__views.laundery);
    doClick ? $.__views.laundery.addEventListener("click", doClick) : __defers["$.__views.laundery!click!doClick"] = true;
    $.__views.__alloyId0 = Ti.UI.createView({
        height: "2",
        backgroundColor: "#abce12",
        top: "5",
        id: "__alloyId0"
    });
    $.__views.win.add($.__views.__alloyId0);
    $.__views.tableView = Ti.UI.createTableView({
        top: "5",
        id: "tableView"
    });
    $.__views.win.add($.__views.tableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.win.open();
    var addTask = function() {
        var row = Ti.UI.createTableViewRow({
            height: "80"
        });
        var label = Ti.UI.createLabel({
            text: $.textField.getValue().fontsize(8)
        });
        var DoneCheckbox = Ti.UI.createButton({
            title: "Done",
            top: 8,
            right: 10,
            width: 70,
            height: 30,
            borderColor: "#666",
            borderWidth: 2,
            borderRadius: 3,
            backgroundColor: "green",
            backgroundImage: "none",
            color: "#fff",
            font: {
                fontSize: 23,
                fontWeight: "bold"
            }
        });
        var DeleteCheckbox = Ti.UI.createButton({
            id: "delrow",
            myrow: row,
            title: "Delete",
            bottom: 8,
            right: 10,
            width: 70,
            height: 30,
            borderColor: "#666",
            borderWidth: 2,
            borderRadius: 3,
            backgroundColor: "red",
            backgroundImage: "none",
            color: "#fff",
            font: {
                fontSize: 22,
                fontWeight: "bold"
            }
        });
        var imageShow = "/appicon.png";
        "/Vdishes.png" == $.dishes.image ? imageShow = "/dishes.png" : "/Vlaundery.png" == $.laundery.image && (imageShow = "/laundery.png");
        var image = Ti.UI.createView({
            backgroundImage: imageShow,
            width: "70",
            height: "70",
            left: "5"
        });
        row.add(DoneCheckbox);
        row.add(DeleteCheckbox);
        row.add(image);
        row.add(label);
        $.tableView.appendRow(row);
        DoneCheckbox.addEventListener("click", function() {
            row.backgroundColor = "#abce12";
        });
    };
    $.tableView.addEventListener("click", function(event) {
        if ("delrow" == event.source.id) {
            console.log(event);
            $.tableView.deleteRow(event.index);
        }
    });
    $.addButton.addEventListener("click", addTask);
    __defers["$.__views.textField!click!cleanText"] && $.__views.textField.addEventListener("click", cleanText);
    __defers["$.__views.dishes!click!doClick"] && $.__views.dishes.addEventListener("click", doClick);
    __defers["$.__views.laundery!click!doClick"] && $.__views.laundery.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;