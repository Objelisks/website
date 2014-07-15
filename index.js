var linksData = [
	{
		name: "Home",
		url: "#home",
		build: buildHome
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
var currentPage = "Home";
sessionStorage['pages'] = sessionStorage['pages'] || {};

function buildHeader() {
	var header = body.append('section');
	var links = header.selectAll('a').data(linksData);
	links.enter().append('a')
		.text(function(d) { return d.name; })
		.attr('href', function(d) { return d.url; })
		.style(linkStyle)
		.on('click', function(d) {
		  // Get the content of the page as a dom element
		  var content;
		  if(sessionStorage['pages'][d.name]) {
		    // If the page has been loaded previously, we can just get it from store
		    content = sessionStorage['pages'][d.name];
		  } else {
		    // Otherwise, build the page fresh.
		    content = d.build();
		  }

		  // Display the content
		});
}

function buildCurrentPage() {
  // Get the fragment
  // Build the page
}

buildHeader();
buildCurrentPage();