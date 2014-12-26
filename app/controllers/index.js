$.win.open();

//database addition
var db = Titanium.Database.install('\db\RowData.db', 'version6');
db.execute('CREATE TABLE IF NOT EXISTS Tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT);');
var sql = db.execute('SELECT * FROM Tasks');
while (sql.isValidRow()) {
	reloadFromDatabase(sql.fieldByName('task'));
	sql.next();
}
//

function reloadFromDatabase(myText) {
	var row = Ti.UI.createTableViewRow({
		height : "80"
	});
	var label = Ti.UI.createLabel({
		text : myText,
		height : Titanium.UI.SIZE,
		width : Titanium.UI.SIZE,
		color : "black",
		layout : 'vertical',
	});
	var DoneCheckbox = Ti.UI.createButton({
		title : 'Done',
		top : 8,
		right : 10,
		width : 70,
		height : 30,
		borderColor : '#666',
		borderWidth : 2,
		borderRadius : 3,
		backgroundColor : 'green',
		backgroundImage : 'none',
		color : '#fff',
		font : {
			fontSize : 23,
			fontWeight : 'bold'
		}
	});
	var DeleteCheckbox = Ti.UI.createButton({
		id : "delrow",
		myrow : row,
		mylabel : label,
		title : 'Delete',
		bottom : 8,
		right : 10,
		width : 70,
		height : 30,
		borderColor : '#666',
		borderWidth : 2,
		borderRadius : 3,
		backgroundColor : 'red',
		backgroundImage : 'none',
		color : '#fff',
		font : {
			fontSize : 19,
			fontWeight : 'bold'
		}
	});
	var imageShow = "/appicon.png";
	if ($.dishes.image == '/Vdishes.png')
		imageShow = "/dishes.png";
	else if ($.laundery.image == '/Vlaundery.png')
		imageShow = "/laundery.png";
	var image = Ti.UI.createView({
		backgroundImage : imageShow,
		width : "70",
		height : "70",
		left : "5"
	});
	row.add(DoneCheckbox);
	row.add(DeleteCheckbox);
	row.add(image);
	row.add(label);
	$.tableView.appendRow(row);
	DoneCheckbox.addEventListener("click", function(event) {
		row.backgroundColor = "#abce12";
		var lineView = Titanium.UI.createView({
			width : label.getSize().width,
			height : 1,
			backgroundColor : label.color ? label.color : 'black',
		});
		row.add(lineView);
	});
};

var alreadyClicked = false;
function cleanText(e) {
	if (alreadyClicked == false) {
		$.textField.value = "";
		alreadyClicked = true;
	}
}

function doClick(e) {
	if (e.source.id == "dishes") {
		if (e.source.image != '/Vdishes.png')
			e.source.image = '/Vdishes.png';
		if ($.laundery.image != '/laundery.png')
			$.laundery.image = '/laundery.png';
	} else {
		if (e.source.image != '/Vlaundery.png')
			e.source.image = '/Vlaundery.png';
		if ($.dishes.image != '/dishes.png')
			$.dishes.image = '/dishes.png';
	}
}

var addTask = function(e) {
	var row = Ti.UI.createTableViewRow({
		height : "80"
	});
	var label = Ti.UI.createLabel({
		text : $.textField.getValue(),
		height : Titanium.UI.SIZE,
		width : Titanium.UI.SIZE,
		color : "black",
		layout : 'vertical',
	});
	var DoneCheckbox = Ti.UI.createButton({
		title : 'Done',
		top : 8,
		right : 10,
		width : 70,
		height : 30,
		borderColor : '#666',
		borderWidth : 2,
		borderRadius : 3,
		backgroundColor : 'green',
		backgroundImage : 'none',
		color : '#fff',
		font : {
			fontSize : 23,
			fontWeight : 'bold'
		}
	});
	var DeleteCheckbox = Ti.UI.createButton({
		id : "delrow",
		myrow : row,
		mylabel : label,
		title : 'Delete',
		bottom : 8,
		right : 10,
		width : 70,
		height : 30,
		borderColor : '#666',
		borderWidth : 2,
		borderRadius : 3,
		backgroundColor : 'red',
		backgroundImage : 'none',
		color : '#fff',
		font : {
			fontSize : 19,
			fontWeight : 'bold'
		}
	});
	var imageShow = "/appicon.png";
	if ($.dishes.image == '/Vdishes.png')
		imageShow = "/dishes.png";
	else if ($.laundery.image == '/Vlaundery.png')
		imageShow = "/laundery.png";
	var image = Ti.UI.createView({
		backgroundImage : imageShow,
		width : "70",
		height : "70",
		left : "5"
	});
	row.add(DoneCheckbox);
	row.add(DeleteCheckbox);
	row.add(image);
	row.add(label);
	$.tableView.appendRow(row);
	DoneCheckbox.addEventListener("click", function(event) {
		row.backgroundColor = "#abce12";
		var lineView = Titanium.UI.createView({
			width : label.getSize().width,
			height : 1,
			backgroundColor : label.color ? label.color : 'black',
		});
		row.add(lineView);
	});
	var db = Titanium.Database.open('version6');
	db.execute('INSERT INTO Tasks (task) VALUES (?)', $.textField.getValue());
	db.close();
	$.textField.value = "";
};

$.tableView.addEventListener('click', function(event) {
	if (event.source.id == "delrow") {
		$.tableView.deleteRow(event.index);
		var db = Titanium.Database.open('version6');
		db.execute('DELETE FROM Tasks WHERE task = (?)', event.source.mylabel.getText());
		db.close();
	}
});

$.addButton.addEventListener("click", addTask);

$.deleteAllButton.addEventListener("click", function(e) {
	var rd = [];
	$.tableView.data = rd;
	var db = Titanium.Database.open('version6');
	db.execute('DELETE FROM Tasks');
	db.close();
});

