//Problem: No user interaction causes change to application
//Solution: When user interacts, cause changes appropriately
var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

//When clicking on control list items
$(".controls").on("click", "li", function(){
	//Deselect the sibling elements
	$(this).siblings().removeClass("selected");
	//Select clicked element
	$(this).addClass("selected");
	//Cache current color
	color = $(this).css("background-color");
});
	
//When "New Color" is pressed
$("#revealColorSelect").click(function(){
	//Show or hide color select panel
	changeColor();
	$("#colorSelect").toggle();
});

//Update the new color span
function changeColor () {
	var r = $("#red").val();
	var g = $("#green").val();
	var b = $("#blue").val();
	$("#newColor").css("background-color", "rgb(" + r  + "," + g + "," + b + ")");
}

//When color sliders change
$("input[type=range]").on("input", changeColor);

//When "Add Color" is pressed
$("#addNewColor").click(function(){
	//Append the color to the controls ul
	var $newColor = $("<li></li>");
	$newColor.css("background-color", $("#newColor").css("background-color"));
	$(".controls ul").append($newColor);
	//Select the new color
	$newColor.click();
});

//On mouse events on the canvas
$canvas.mousedown(function(e){
	lastEvent = e;
	mouseDown = true;
}).mousemove(function(e){
	//Draw lines
	if(mouseDown) {
		context.beginPath();
		context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
		context.lineTo(e.offsetX, e.offsetY);
		context.strokeStyle = color;
		context.stroke();
		lastEvent = e;
	}
}).mouseup(function(){
	mouseDown = false;
}).mouseleave(function(){
	$canvas.mouseup();
});







