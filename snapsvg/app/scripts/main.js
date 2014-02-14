var s = Snap("#viz");

var boundingRect = s.node.getBoundingClientRect();
var center = {
	x: boundingRect.width/2,
	y: boundingRect.height/2
}
var bcDest = {x: 150, y: 150};
var scDest = {x: 400, y: 400};

var connector = s.line(center.x, center.y, center.x, center.y);
var bigCircle = s.circle(center.x, center.y, 100);
var smallCircle = s.circle(center.x, center.y, 50);
var smallCircleLabel = s.text(50, 50, "Snap");
smallCircleLabel.attr({"color":"white"});
var smallCircleGroup = s.group(smallCircle, smallCircleLabel);

connector.attr({
	fill:"none",
	stroke:"#0000ff",
	strokeWidth:3
});

setTimeout(function() {
	Snap.animate(1, 30, function (val) {
	    var percent = val/30;
	    smallCircle.attr({cx: center.x + ((scDest.x-center.x)*percent), cy: center.y + ((scDest.y-center.y)*percent)});
	    bigCircle.attr({cx: center.x + ((bcDest.x-center.x)*percent), cy: center.y + ((bcDest.y-center.y)*percent)});
		connector.attr({x1: parseInt(bigCircle.attr('cx')),
				y1: parseInt(bigCircle.attr('cy')),
				x2: parseInt(smallCircle.attr('cx')),
				y2: parseInt(smallCircle.attr('cy'))});
	}, 1550, mina.bounce);
}, 1000);

// var connector = s.line(150, 150, 400, 400);
// var bigCircle = s.circle(150, 150, 100);
// var smallCircle = s.circle(400, 400, 50);


bigCircle.drag(function(dx, dy, x, y, moveevent){

	bigCircle.attr({cx: bcDest.x+dx,cy: bcDest.y+dy });
	connector.attr({x1: scDest.x+dx, y1: scDest.y+dy});

});

var dragcontext = {};
smallCircle.drag(function(dx, dy, x, y, moveevent){
	smallCircle.attr({cx: this.startx + dx, cy: this.starty + dy });
	connector.attr({x2: this.startx + dx, y2: this.starty + dy});

}, function(x, y, startevent){
	this.startx = parseInt(smallCircle.attr('cx'));
	this.starty = parseInt(smallCircle.attr('cy'));
}, function(endevent){
	;;
}, dragcontext, dragcontext, dragcontext);

function translate(element, properties, deltas){
	if(Array.isArray(properties) && Array.isArray(deltas) && properties.length == deltas.length){
		properties.forEach(function(e, i, a){
			var updateobj = {};
			updateobj[e] = parseInt(element.attr(e)) + deltas[i];
			element.attr(updateobj);
		});
	}
}
