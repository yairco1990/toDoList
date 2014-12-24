$.win.open();

function cleanText(e) {
	console.log(e);
	$.textField.value = "";
}

function doClick(e) {
	console.log(e);
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
		text : $.textField.getValue().fontsize(8)
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
		id: "delrow",
		myrow : row, // customProperty
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
			fontSize : 22,
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
	});
};

$.tableView.addEventListener('click', function(event) {
	if(event.source.id == "delrow"){
		console.log(event);
		$.tableView.deleteRow(event.index);
	}	
});

$.addButton.addEventListener("click", addTask);


