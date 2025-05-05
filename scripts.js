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
			addNavbarListeners(); // reattach listeners to new content
			attachBackButtonListener(); // attach back button if present
			window.scrollTo(0, 0); // scroll to top of page
		});
}

// attach click listeners to navbar links
function addNavbarListeners() {
	document.querySelectorAll("a[data-page]").forEach((link) => {
		link.addEventListener("click", (event) => {
			// if the link has data-passthrough, don't load a new page (for resume - open in new tab)
			if (event.target.hasAttribute("data-passthrough")) return;

			event.preventDefault(); // stop from navigating to href
			const link = event.target.closest("a[data-page]");
			const page = link?.getAttribute("data-page");
			if (page) loadPage(page);
		});
	});
	// attach handlers to project cards (when page loads or changes)
	document.querySelectorAll(".project-link").forEach((link) => {
		link.addEventListener("click", (event) => {
			event.preventDefault(); // stop from navigating to href
			const page = link.getAttribute("data-page");
			if (page) loadPage(page);
		});
	});
}

// go back to main projects page if back button clicked
function attachBackButtonListener() {
	const backBtn = document.getElementById("back-to-projects");
	if (backBtn) {
		backBtn.addEventListener("click", (e) => {
			e.preventDefault();
			loadPage("projects");
		});
	}
}

// resize iframe heights to stretch to frame contents
function resizeIframe(iframe) {
	iframe.style.height =
		iframe.contentWindow.document.body.scrollHeight + "px";
}
