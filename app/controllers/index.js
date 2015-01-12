
$.win.open();

var main=$.main;

var menu=Alloy.createController('menu').getView();

$.drawermenu.init({
    menuview:menu,
    mainview:main,
    duration:200,
    parent: $.win
});

var xhr = Titanium.Network.createHTTPClient();
var url = "https://agile-eyrie-7613.herokuapp.com/services/todo";
xhr.open('GET', url);
xhr.onload = function() {
	Ti.API.info("Success?" + this.status);
	Ti.API.info(this.responseText);
	var json = JSON.parse(this.responseText);
	for (var i = 0; i < json.length; i++) {
		loadFromDatabase(json[i]);
	};
};
xhr.send();
xhr.abort();

function loadFromDatabase(json) {
	var row = Ti.UI.createTableViewRow({
		height : "80"
	});
	var label = Ti.UI.createLabel({
		right : "80",
		left : "85",
		text : json.task, //set the text to myText from database
		height : Titanium.UI.SIZE,
		width : Titanium.UI.SIZE,
		color : "black",
		layout : 'vertical',
		font : {
			fontSize : 20,
		}
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
		mylabel : label,
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
	//load the image from database
	var imageShow = json.image;
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
	if (json.done == "true") {
		row.backgroundColor = "#abce12";
		var lineView = Titanium.UI.createView({
			left : "85",
			width : label.getSize().width,
			height : 1,
			backgroundColor : label.color ? label.color : 'black',
		});
		row.add(lineView);
	} else {
		DoneCheckbox.addEventListener("click", function(event) {
			row.backgroundColor = "#abce12";
			var lineView = Titanium.UI.createView({
				left : "85",
				width : label.getSize().width,
				height : 1,
				backgroundColor : label.color ? label.color : 'black',
			});
			row.add(lineView);
		});
	}
};
//check the first click on the textField
var alreadyClicked = false;
function cleanText(e) {
	if (alreadyClicked == false) {
		//zeros the text field
		$.textField.value = "";
		alreadyClicked = true;
	}
}

function doClick(e) {//check what image the user clicked
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
		right : "80",
		left : "85",
		text : $.textField.getValue(),
		height : Titanium.UI.SIZE,
		width : Titanium.UI.SIZE,
		color : "black",
		layout : 'vertical',
		font : {
			fontSize : 20,
		}
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
		mylabel : label, //custom property to know the text of the label
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
	//deafult image
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
	DoneCheckbox.addEventListener("click", function(event) {//if the "done" button clicked
		row.backgroundColor = "#abce12";
		var lineView = Titanium.UI.createView({//add line over the text
			left : "85",
			width : label.getSize().width,
			height : 1,
			backgroundColor : label.color ? label.color : 'black',
		});
		row.add(lineView);
		var xhr = Titanium.Network.createHTTPClient();
		url = "https://agile-eyrie-7613.herokuapp.com/services/doneUpdate";
		xhr.open('POST', url);
		xhr.onload = function() {
			Ti.API.info("Success?" + this.status);
		};
		xhr.send({
			task : $.textField.getValue(),
		});
		xhr.abort();
	});
	var xhr = Titanium.Network.createHTTPClient();
	url = "https://agile-eyrie-7613.herokuapp.com/services/todo";
	xhr.open('POST', url);
	xhr.onload = function() {
		Ti.API.info("Success?" + this.status);
	};
	xhr.send({
		id : null,
		done : false,
		task : $.textField.getValue(),
		image : imageShow
	});
	xhr.abort();
	//zeros the textField
	$.textField.value = "";
};

$.tableView.addEventListener('click', function(event) {//event listener for the delete button of every row
	if (event.source.id == "delrow") {//if clicked on the delete button from the row view
		$.tableView.deleteRow(event.index);
		var xhr = Titanium.Network.createHTTPClient();
		url = "https://agile-eyrie-7613.herokuapp.com/services/delete";
		xhr.open('POST', url);
		xhr.onload = function() {
			Ti.API.info("Success?" + this.status);
		};
		xhr.send({
			task : event.source.mylabel.getText()
		});
		xhr.abort();
	}
});

//add task button event listener
$.addButton.addEventListener("click", addTask);

$.deleteAllButton.addEventListener("click", function(e) {
	var rd = [];
	// delete all the data of the tableView by set is data to an empty array
	$.tableView.data = rd;
});

/*
 * $.win.open();

 //database addition
 var db = Titanium.Database.install('\db\RowData.db', 'version8');
 db.execute('CREATE TABLE IF NOT EXISTS Tasks(task TEXT, image TEXT, done TEXT);');
 var sql = db.execute('SELECT * FROM Tasks');
 while (sql.isValidRow()) {
 loadFromDatabase(sql.fieldByName('task'), sql.fieldByName('image'), sql.fieldByName('done'));
 sql.next();
 }
 //

 function loadFromDatabase(myText, myImage, done) {
 var row = Ti.UI.createTableViewRow({
 height : "80"
 });
 var label = Ti.UI.createLabel({
 right : "80",
 left : "85",
 text : myText, //set the text to myText from database
 height : Titanium.UI.SIZE,
 width : Titanium.UI.SIZE,
 color : "black",
 layout : 'vertical',
 font : {
 fontSize : 20,
 }
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
 mylabel : label,
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
 //load the image from database
 var imageShow = myImage;
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
 if (done == "true") {
 row.backgroundColor = "#abce12";
 var lineView = Titanium.UI.createView({
 left : "85",
 width : label.getSize().width,
 height : 1,
 backgroundColor : label.color ? label.color : 'black',
 });
 row.add(lineView);
 } else {
 DoneCheckbox.addEventListener("click", function(event) {
 row.backgroundColor = "#abce12";
 var lineView = Titanium.UI.createView({
 left : "85",
 width : label.getSize().width,
 height : 1,
 backgroundColor : label.color ? label.color : 'black',
 });
 row.add(lineView);
 var db = Titanium.Database.open('version8');
 db.execute('UPDATE Tasks SET done = "true" WHERE task = (?)', event.source.mylabel.getText());
 db.close();
 });
 }
 };

 //check the first click on the textField
 var alreadyClicked = false;
 function cleanText(e) {
 if (alreadyClicked == false) {
 //zeros the text field
 $.textField.value = "";
 alreadyClicked = true;
 }
 }

 function doClick(e) {//check what image the user clicked
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
 right : "80",
 left : "85",
 text : $.textField.getValue(),
 height : Titanium.UI.SIZE,
 width : Titanium.UI.SIZE,
 color : "black",
 layout : 'vertical',
 font : {
 fontSize : 20,
 }
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
 mylabel : label, //custom property to know the text of the label
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
 //deafult image
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
 DoneCheckbox.addEventListener("click", function(event) {//if the "done" button clicked
 row.backgroundColor = "#abce12";
 var lineView = Titanium.UI.createView({//add line over the text
 left : "85",
 width : label.getSize().width,
 height : 1,
 backgroundColor : label.color ? label.color : 'black',
 });
 row.add(lineView);
 var db = Titanium.Database.open('version8');
 //set done "true" in the database to know that I already clicked on the button
 db.execute('UPDATE Tasks SET done = "true" WHERE task = (?)', event.source.mylabel.getText());
 db.close();
 });
 var db = Titanium.Database.open('version8');
 db.execute('INSERT INTO Tasks (task, image) VALUES (?,?)', $.textField.getValue(), imageShow);
 db.close();
 //zeros the textField
 $.textField.value = "";
 };

 $.tableView.addEventListener('click', function(event) {//event listener for the delete button of every row
 if (event.source.id == "delrow") {//if clicked on the delete button from the row view
 $.tableView.deleteRow(event.index);
 var db = Titanium.Database.open('version8');
 db.execute('DELETE FROM Tasks WHERE task = (?)', event.source.mylabel.getText());
 db.close();
 }
 });

 //add task button event listener
 $.addButton.addEventListener("click", addTask);

 $.deleteAllButton.addEventListener("click", function(e) {
 var rd = [];
 // delete all the data of the tableView by set is data to an empty array
 $.tableView.data = rd;
 var db = Titanium.Database.open('version8');
 //delete everything from database
 db.execute('DELETE FROM Tasks');
 db.close();
 });

 */
