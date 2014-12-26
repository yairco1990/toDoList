function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function reloadFromDatabase(myText) {
        var row = Ti.UI.createTableViewRow({
            height: "80"
        });
        var label = Ti.UI.createLabel({
            text: myText,
            height: Titanium.UI.SIZE,
            width: Titanium.UI.SIZE,
            color: "black",
            layout: "vertical"
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
                fontSize: 19,
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
            var lineView = Titanium.UI.createView({
                width: label.getSize().width,
                height: 1,
                backgroundColor: label.color ? label.color : "black"
            });
            row.add(lineView);
        });
    }
    function cleanText() {
        if (false == alreadyClicked) {
            $.textField.value = "";
            alreadyClicked = true;
        }
    }
    function doClick(e) {
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
    $.__views.__alloyId0 = Ti.UI.createView({
        height: "75",
        backgroundColor: "#848484",
        id: "__alloyId0"
    });
    $.__views.win.add($.__views.__alloyId0);
    $.__views.textField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: "8",
        left: "10",
        right: "100",
        value: "Enter your task",
        textAlign: "left",
        height: "62",
        font: {
            fontSize: 30,
            fontWeight: "bold"
        },
        id: "textField"
    });
    $.__views.__alloyId0.add($.__views.textField);
    cleanText ? $.__views.textField.addEventListener("click", cleanText) : __defers["$.__views.textField!click!cleanText"] = true;
    $.__views.addButton = Ti.UI.createButton({
        backgroundColor: "white",
        right: "10",
        top: "7",
        height: "70",
        width: "80",
        title: "Add!",
        id: "addButton"
    });
    $.__views.__alloyId0.add($.__views.addButton);
    $.__views.ChooseImage = Ti.UI.createView({
        backgroundColor: "#848484",
        height: "75",
        id: "ChooseImage"
    });
    $.__views.win.add($.__views.ChooseImage);
    $.__views.dishes = Ti.UI.createImageView({
        image: "/dishes.png",
        width: "70",
        height: "70",
        right: "110",
        top: "3",
        id: "dishes"
    });
    $.__views.ChooseImage.add($.__views.dishes);
    doClick ? $.__views.dishes.addEventListener("click", doClick) : __defers["$.__views.dishes!click!doClick"] = true;
    $.__views.laundery = Ti.UI.createImageView({
        image: "/laundery.png",
        width: "70",
        height: "70",
        right: "200",
        top: "3",
        id: "laundery"
    });
    $.__views.ChooseImage.add($.__views.laundery);
    doClick ? $.__views.laundery.addEventListener("click", doClick) : __defers["$.__views.laundery!click!doClick"] = true;
    $.__views.deleteAllButton = Ti.UI.createButton({
        height: "50",
        width: Titanium.UI.FILL,
        title: "Click to delete all",
        id: "deleteAllButton"
    });
    $.__views.win.add($.__views.deleteAllButton);
    $.__views.__alloyId1 = Ti.UI.createView({
        height: "2",
        backgroundColor: "#abce12",
        top: "2",
        id: "__alloyId1"
    });
    $.__views.win.add($.__views.__alloyId1);
    $.__views.tableView = Ti.UI.createTableView({
        top: "5",
        id: "tableView"
    });
    $.__views.win.add($.__views.tableView);
    $.__views.__alloyId2 = Ti.UI.createView({
        height: "5",
        backgroundColor: "#848484",
        id: "__alloyId2"
    });
    $.__views.win.add($.__views.__alloyId2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.win.open();
    var db = Titanium.Database.install("dbRowData.db", "version6");
    db.execute("CREATE TABLE IF NOT EXISTS Tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT);");
    var sql = db.execute("SELECT * FROM Tasks");
    while (sql.isValidRow()) {
        alert(sql.fieldByName("id"));
        reloadFromDatabase(sql.fieldByName("task"));
        sql.next();
    }
    var alreadyClicked = false;
    var addTask = function() {
        var row = Ti.UI.createTableViewRow({
            height: "80"
        });
        var label = Ti.UI.createLabel({
            text: $.textField.getValue(),
            height: Titanium.UI.SIZE,
            width: Titanium.UI.SIZE,
            color: "black",
            layout: "vertical"
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
            mylabel: label,
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
                fontSize: 19,
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
            var lineView = Titanium.UI.createView({
                width: label.getSize().width,
                height: 1,
                backgroundColor: label.color ? label.color : "black"
            });
            row.add(lineView);
        });
        var db = Titanium.Database.open("version6");
        db.execute("INSERT INTO Tasks (task) VALUES (?)", $.textField.getValue());
        db.close();
        $.textField.value = "";
    };
    $.tableView.addEventListener("click", function(event) {
        if ("delrow" == event.source.id) {
            console.log(event);
            $.tableView.deleteRow(event.index);
            var db = Titanium.Database.open("version6");
            db.execute("DELETE FROM Tasks WHERE id = (?)", "yair");
            db.close();
        }
    });
    $.addButton.addEventListener("click", addTask);
    $.deleteAllButton.addEventListener("click", function() {
        var rd = [];
        $.tableView.data = rd;
        var db = Titanium.Database.open("version6");
        db.execute("DELETE FROM Tasks");
        db.close();
    });
    __defers["$.__views.textField!click!cleanText"] && $.__views.textField.addEventListener("click", cleanText);
    __defers["$.__views.dishes!click!doClick"] && $.__views.dishes.addEventListener("click", doClick);
    __defers["$.__views.laundery!click!doClick"] && $.__views.laundery.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;