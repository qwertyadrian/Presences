const browsingTimestamp = Math.floor(Date.now() / 1000),
	presence = new Presence({
		clientId: "629653820405710848"
	});
presence.on("UpdateData", () => {
	const urlParams = new URLSearchParams(window.location.search),
		presenceData: PresenceData = {
			largeImageKey: "lg",
			startTimestamp: browsingTimestamp
		};
	if (document.location.pathname === "/") presenceData.details = "Home";
	else if (
		document.location.pathname.startsWith("/search") &&
		urlParams.has("q")
	) {
		presenceData.details = `Searching for ${urlParams.get("q")}`;
		presenceData.state =
			document.getElementsByClassName("result-count")[0].textContent;

		presenceData.smallImageKey = "search";
	} else if (
		document.location.pathname.startsWith("/images") &&
		urlParams.has("q")
	) {
		presenceData.details = "Ecosia Images";
		presenceData.state = `Searching for ${urlParams.get("q")}`;

		presenceData.smallImageKey = "search";
	} else if (
		document.location.pathname.startsWith("/news") &&
		urlParams.has("q")
	) {
		presenceData.details = "Ecosia News";
		presenceData.state = `Searching for ${urlParams.get("q")}`;

		presenceData.smallImageKey = "search";
	} else if (
		document.location.pathname.startsWith("/videos") &&
		urlParams.has("q")
	) {
		presenceData.details = "Ecosia Videos";
		presenceData.state = `Searching for ${urlParams.get("q")}`;

		presenceData.smallImageKey = "search";
	}
	presence.setActivity(presenceData);
});
