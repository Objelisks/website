// center design

// symbols
//  home
//  projects
//  experiment
//  contact


// website
//  links: request json from server api

// architecture
//  server:
//   get('key') -> {json}
//   send('key', {value}) -> newValue

// get('projects')
// get('contactinfo')

var colors = [
  0x3F6C8F, // light blue
  0x243542, // dark blue
  0x4F3332, // dark red
  0x747533 // dark yellow
];

var home = new PointText(new Point(-200, -200));
home.content = "home";
home.fontFamily = "asul";
home.fontSize = "32pt";
home.fillColor = "#3F6C8F";
home.justification = "center";

var projects = new PointText(new Point(200, -200));
projects.content = "projects";
projects.fontFamily = "asul";
projects.fontSize = "32pt";
projects.fillColor = "#3F6C8F";
projects.justification = "center";

var unknown = new PointText(new Point(-200, 200));
unknown.content = "unknown";
unknown.fontFamily = "asul";
unknown.fontSize = "32pt";
unknown.fillColor = "#3F6C8F";
unknown.justification = "center";

var contact = new PointText(new Point(200, 200));
contact.content = "contact";
contact.fontFamily = "asul";
contact.fontSize = "32pt";
contact.fillColor = "#3F6C8F";
contact.justification = "center";

var hex = new Path.RegularPolygon(new Point(0, 0), 6, 50);
hex.strokeColor = "black";
hex.fillColor = "black";
hex.rotate(90);
hex.strokeJoin = 'round';
hex.strokeWidth = 15;

var center = new Shape.Circle(new Point(0, 0), 1);
center.fillColor = "red";

var scale = 1.0;
var scaleAnimScale = 10.0;
var tick = 0;

function onFrame(event) {
    tick += 0.01;
    scale = 1.0 + Math.sin(tick * 5.0) / 200.0;

    hex.scale(scale);
}

function onResize() {
  project.activeLayer.position = view.center;
}

function grow() {

}