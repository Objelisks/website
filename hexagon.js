var Tween = createjs.Tween;
var Ease = createjs.Ease;
paper.install(window);

var colors = {
  background: "#4B6385",
  text: "#7EA8E0",
  color1: "#B5775D",
  color2: "#AE62BD",
  color3: "#509C67",
  color4: "#918D4A"
};

var pages = {};

var persistentPageData = {
  links: [
  ]
};

// note to self: redo lsystembot to look more like this
function generateLSystemPath(lsystem, rules, angle, iter, color) {
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
  for(var i=0; i<iter; i++) {
    next = replace(next, rules);
  }

  var designsegments = [];
  var cmds = next.split('');
  var currentPoint = new Point(0, 0);
  var movement = new Point(0, -10);
  var stack = [];
  var translations = {
    'F': function(path) { currentPoint = currentPoint.add([movement.x, movement.y]); path.lineTo(currentPoint); },
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

  path.strokeColor = color;
  path.strokeWidth = 1;
  path.fitBounds(new Rectangle(-600, -600, 1200, 1200));
  path.smooth();
  return path;
}

function makeLink(text, pos) {
  var link = new PointText();
  link.position.x = pos.x;
  link.position.y = pos.y;
  link.content = text;
  link.fontFamily = "open-sans-condensed";
  link.fontSize = "32pt";
  link.fillColor = colors.text;
  link.justification = "center";
  link.onClick = function() {
    switchTo(pages[text]);
  };
  return link;
}

function makeLayer(path, linkLocations) {
  var layer = new Layer();
  layer.addChild(path);
  layer.data.linkLocations = linkLocations;
  layer.visible = false;
  layer.position = new Point(0, 0);
  layer.applyMatrix = false;
  return layer;
}

function switchTo(page) {
  Object.keys(pages).forEach(function(pageKey) {
    pages[pageKey].visible = false;
  });
  page.visible = true;
  persistentPageData.links.forEach(function(link, i) {
    var targetPos = page.data.linkLocations[i];
    link.position = targetPos;
    //Tween.get(link.position, {override:true}).to({x: targetPos.x, y: targetPos.y}, 300.0, Ease.cubicInOut);
  });
  page.addChildren(persistentPageData.links);
  if(project.activeLayer !== page) {
    Tween.get(project.activeLayer).to({opacity: 0.0}, 300.0);
    page.opacity = 0.0;
    Tween.get(page).to({opacity: 1.0}, 300.0);
  }
  page.activate();
  page.position.x = view.bounds.center.x;
  page.position.y = view.bounds.center.y;
}

function init() {
  persistentPageData.links.push(makeLink("home", new Point(-200, -140)));
  persistentPageData.links.push(makeLink("projects", new Point(200, -160)));
  persistentPageData.links.push(makeLink("unknown", new Point(-200, 180)));
  persistentPageData.links.push(makeLink("contact", new Point(200, 160)));

  pages.home = makeLayer(generateLSystemPath("CCCC", {
    "F": "FFCFFFCCCF",
    "C": "C-FFF-CCFCCCFFFFF-F-CF+CFFC[F+-F-FF]F"
  }, 90, 3, colors.color1), [
    new Point(-200, -150),
    new Point(200, -170),
    new Point(-200, 170),
    new Point(200, 150)
  ]);

  pages.projects = makeLayer(generateLSystemPath("FFF", {
      "F": "F-F-F--F-F+FF[+-F+FF-FFF]F+FY++",
      "Y": "-"
  }, 90, 3, colors.color2), [
    new Point(-340, -230),
    new Point(-470, -150),
    new Point(-415, -70),
    new Point(-560, 30)
  ]);

  pages.unknown = makeLayer(generateLSystemPath("FF", {
      "F": "UUUFUFF-F[UFF+F-F-+UUF+FUFF[--]+UU]FF",
      "U": "FFFFF+FUU"
  }, 45, 3, colors.color3), [
    new Point(280, -230),
    new Point(200, -150),
    new Point(260, -30),
    new Point(340, 40)
  ]);

  pages.contact = makeLayer(generateLSystemPath("FFAFAF", {
      "F": "FFF+A+FA-F+++FFFF-F-AFAAF+-+",
      "A": "AFFFAF+FFFFAF+-FFA"
  }, 60, 3, colors.color4), [
    new Point(200, -230),
    new Point(420, -230),
    new Point(420, -140),
    new Point(420, -50)
  ]);

  view.onFrame = function(event) {
    //Tween.tick(event.delta);
  }
  view.onResize = function(event) {
    project.activeLayer.position.x = view.bounds.center.x;
    project.activeLayer.position.y = view.bounds.center.y;
  }
}

function setupCanvas() {
  paper.setup('canvas');
  document.getElementById('canvas').style.background = colors.background;
  document.getElementById('canvas').style.width = '100%';
  document.getElementById('canvas').style.height = '100%';
}


window.onload = function() {
  createjs.Ticker.framerate = 60;
  setupCanvas();
  init();
  switchTo(pages.home);
  view.draw();
}