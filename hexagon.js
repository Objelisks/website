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

var lsystem = "CCCC";
var rules = {
  "F": "FFCFFFCCCF",
  "C": "C-FFF-CCFCCCFFFFF-F-CF+CFFC[F+-F-FF]F"
};

var replace = function(str, rules) {
  var out = '', repl;
  str.split('').forEach(function(ch) {
    repl = rules[ch];
    if(repl) {
      out += repl;
    } else {
      out += ch;
    }
  });
  return out;
};

var next = lsystem;
next = replace(next, rules);
next = replace(next, rules);
next = replace(next, rules);
console.log(next);

var designsegments = [];
var cmds = next.split('');
var currentPoint = new Point(0, 0);
var movement = new Point(0, -10);
var angle = 90;
var stack = [];
var translations = {
  'F': function(path) { currentPoint += movement; path.lineTo(currentPoint); },
  '+': function(path) { movement = movement.rotate(angle, new Point(0, 0)); },
  '-': function(path) { movement = movement.rotate(-angle, new Point(0, 0)); },
  '[': function(path) { stack.push(currentPoint); stack.push(movement); },
  ']': function(path) { movement = stack.pop(); currentPoint = stack.pop(); path.moveTo(currentPoint); }
};

var path = new CompoundPath();
path.moveTo(currentPoint);
cmds.forEach(function(cmd) {
  var translation = translations[cmd];
  if(translation) {
    translation(path);
  }
});

path.strokeColor = '#4F3332';
path.strokeWidth = 2;
path.fitBounds(new Rectangle(-600, -600, 1200, 1200));
path.smooth();
//path.translate(new Point(-path.bounds.width/4, -path.bounds.height/4));


var home = new PointText(new Point(-200, -200));
home.content = "home";
home.fontFamily = "open-sans-condensed";
home.fontSize = "32pt";
home.fillColor = "#3F6C8F";
home.justification = "center";

var projects = new PointText(new Point(200, -200));
projects.content = "projects";
projects.fontFamily = "open-sans-condensed";
projects.fontSize = "32pt";
projects.fillColor = "#3F6C8F";
projects.justification = "center";

var unknown = new PointText(new Point(-200, 200));
unknown.content = "unknown";
unknown.fontFamily = "open-sans-condensed";
unknown.fontSize = "32pt";
unknown.fillColor = "#3F6C8F";
unknown.justification = "center";

var contact = new PointText(new Point(200, 200));
contact.content = "contact";
contact.fontFamily = "open-sans-condensed";
contact.fontSize = "32pt";
contact.fillColor = "#3F6C8F";
contact.justification = "center";

var hex = new Path.RegularPolygon(new Point(0, 0), 6, 50);
//hex.strokeColor = "black";
//hex.fillColor = "black";
hex.rotate(90);
hex.strokeJoin = 'round';
hex.strokeWidth = 15;

var scale = 1.0;
var scaleAnimScale = 10.0;
var tick = 0;

function onFrame(event) {
    tick += 0.01;
    scale = 1.0 + Math.sin(tick * 2.0) / 400.0;

    hex.scale(scale);
}

function onResize() {
  project.activeLayer.position = view.center;
}

function grow() {

}