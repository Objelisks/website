var linksData = [
	{
		name: "Home",
		url: "#home"
	},
	{
		name: "Projects",
		url: "#projects"
	},
	{
		name: "Stream",
		url: "#stream"
	},
	{
		name: "Contact",
		url: "#contact"
	},
];

var linkStyle = {
  margin: '2pt',
};

var body = d3.select(document.body);

function buildHeader() {
	var header = body.append('section');
	var links = header.selectAll('a').data(linksData);
	links.enter().append('a')
		.text(function(d) { return d.name; })
		.attr('href', function(d) { return d.url; })
		.style(linkStyle);
}

buildHeader();

body.append('div')
  .attr('id', 'box')
  .style('width', '100px')
  .style('height', '100px')
  .style('top', '100px')
  .style('left', '100px')
  .style('position', 'absolute')
  .style('background-color', 'steelblue');

var boxLeft = 100;
var boxTop = 100;
body.on('click', function() {
  console.log('turning');
  d3.selectAll('#box')
    .transition().duration(250)
    .style('transform', 'rotate(0.25turn)')
    .style('left', function(d) { return boxLeft + 100 + 'px'; });
  boxLeft += 100;
});

d3.select(window).on('mousedown', function() {
  console.log('mousemove');
  var mouseX = d3.event.clientX;
  var mouseY = d3.event.clientY;
  
  var box = d3.selectAll('#box');
  
  var diffX = parseFloat(box.style('left')) - mouseX;
  var diffY = parseFloat(box.style('top')) - mouseY;
  var move = function(dir, n) { return function() {
    var box = d3.select(this);
    var pos = parseFloat(box.style(dir));
    box.style(dir, (pos + n) + 'px');
    console.log(dir + ' ' + box.style(dir) + ' ' + pos + ' ' + n);
    box.style('transform', '');
    box.interrupt();
  }};
  
  var moveEnd;
  
  if(Math.abs(diffX) > Math.abs(diffY)) {
    if(diffX > 100) {
      // go left
      console.log('left');
      box = box.style('transform-origin', '0% 0%');
      moveEnd = move('left', -100);
    } else if(diffX < -100) {
      // go right
      console.log('right');
      box = box.style('transform-origin', '100% 100%');
      moveEnd = move('left', 100);
    }
  } else { 
    if(diffY > 100) {
      // go up
      console.log('up');
      box = box.style('transform-origin', '100% 0%');
      moveEnd = move('top', -100);
    } else if(diffY < -100) {
      // go down
      console.log('down');
      box = box.style('transform-origin', '0% 100%');
      moveEnd = move('top', 100);
    }
  }
  box.transition().duration(1000)
    .style('transform', 'rotate(0.25turn)')
    .each('end', moveEnd);
});