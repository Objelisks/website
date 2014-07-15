website
=======

Personal Website


Home
-
Empty landing page

Projects
-
List of projects generated from config file.
Images, description, title, links.

Stream
-
Simple blog posts. Formats images, video, text.
each post separated by minimal spacing.
layout options: stream, tag cloud, source
tags

Contact
-
Links

Hidden Level
-
Experimental projects


Structure
=========

Entirely written in javascript using d3 to add elements.
On page load
build home page
Links go to fragments and call some build function.
Destroys previous page while saving any changed data to local storage
Save loaded page to local storage to load back faster later.