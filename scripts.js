// load navbar
fetch("/navbar.html")
	.then((response) => response.text())
	.then((data) => {
		document.getElementById("navbar").innerHTML = data;
		addNavbarListeners(); // call after navbar loads
		loadPage("home"); // default page to load
	});

// load page content into main
function loadPage(page) {
	fetch(`/pages/${page}.html`)
		.then((response) => response.text())
		.then((content) => {
			document.getElementById("main-content").innerHTML = content;
		});
}

// attach click listeners to navbar links
function addNavbarListeners() {
	document.querySelectorAll("#navbar a").forEach((link) => {
		link.addEventListener("click", (event) => {
			// if the link has data-passthrough, don't load a new page (for resume - open in new tab)
			if (event.target.hasAttribute("data-passthrough")) return;

			event.preventDefault();
			const page = event.target.getAttribute("data-page");
			loadPage(page);
		});
	});
}
