const presence = new Presence({
		clientId: "796446671617130567"
	}),
	timeS = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			smallImageKey: "teaching",
			smallImageText: "OpenClassrooms"
		},
		webpath = window.location.pathname.toLowerCase();

	// Home page
	if (webpath === "/fr/" || webpath === "/en/")
		presenceData.details = "Home page";
	// Dashboard
	else if (
		webpath.includes("/fr/dashboard") ||
		webpath.includes("/en/dashboard")
	) {
		// Courses or paths
		if (
			webpath.includes("/fr/dashboard/courses") ||
			webpath.includes("/en/dashboard/courses")
		) {
			presenceData.details = "Dashboard";
			presenceData.state = `Browsing: ${
				document
					.getElementsByClassName("Mui-selected")[0]
					.getElementsByTagName("span")[0].textContent
			}`;
			presenceData.largeImageKey = "favicon";
		} else if (
			webpath === "/fr/dashboard/paths" ||
			webpath === "/en/dashboard/paths"
		) {
			presenceData.details = "Dashboard";
			presenceData.state = `Browsing: ${
				document.getElementsByClassName("jss326")[1].textContent
			}`;
			presenceData.largeImageKey = "favicon";
		}
		// Courses page
	} else if (
		webpath === "/fr/courses" ||
		webpath === "fr/courses/" ||
		webpath.includes("/fr/search") ||
		webpath.includes("/en/search")
	) {
		presenceData.details = "Courses main page";
		presenceData.state = "Looking for a course";
		presenceData.largeImageKey = "favicon";
		// Paths page
	} else if (webpath === "/en/paths" || webpath === "/fr/paths") {
		presenceData.details = "Paths main page";
		presenceData.state = "Looking for a path";
		presenceData.largeImageKey = "favicon";
		// Main page of a selected path
	} else if (webpath.includes("/fr/paths") || webpath.includes("/en/paths")) {
		presenceData.details = "Looking for a path";
		presenceData.state = `Looking at ${document.title.replace(
			" - OpenClassrooms",
			""
		)}`;
		presenceData.largeImageKey = "favicon";
		// Reading a course
	} else if (
		webpath.includes("/fr/courses") ||
		webpath.includes("/en/courses")
	) {
		// Check if the user is reading the first chapter or not
		if (
			document.body.contains(
				document.getElementsByClassName("breadcrumb__item")[3]
			)
		) {
			// If the user is reading the second chapter or more, there is a chapter name
			const courseClass = document.getElementsByClassName("breadcrumb__item");
			presenceData.details = `Reading: ${
				courseClass[2].getElementsByTagName("span")[0].textContent
			}`;
			presenceData.state = `Chapter: ${courseClass[3].textContent}`;
			presenceData.largeImageKey = "favicon";
		} else if (
			!document.body.contains(
				document.getElementsByClassName("breadcrumb__item")[3]
			)
		) {
			// If the user is reading the first chapter, there is no default "chapter name" so we set it manually
			presenceData.details = `Reading: ${
				document.getElementsByClassName("breadcrumb__item")[2].textContent
			}`;
			presenceData.state = "Chapter: First chapter";
			presenceData.largeImageKey = "favicon";
		}
		presenceData.largeImageKey = "favicon";
	} else {
		presenceData.details = "Browsing:";
		presenceData.state = document.title.replace(" - OpenClassrooms", "");
		presenceData.largeImageKey = "logopurp";
	}
	presenceData.startTimestamp = timeS;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
