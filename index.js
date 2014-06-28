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

body.append('section').attr('id', 'contact');