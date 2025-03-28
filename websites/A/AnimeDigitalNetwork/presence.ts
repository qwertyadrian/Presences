const presence = new Presence({
		clientId: "808758769424138252"
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused"
	});

presence.on("UpdateData", async () => {
	const video: HTMLVideoElement = document.querySelector("video.vjs-tech"),
		presenceData: PresenceData = {
			largeImageKey: "logo"
		},
		buttons = await presence.getSetting<boolean>("buttons");

	if (document.location.pathname.includes("video") && video) {
		const episode = JSON.parse(
			document.querySelector('[type="application/ld+json"]').textContent
		);
		if (!isNaN(video.duration)) {
			presenceData.details = episode.partOfSeries.name;
			presenceData.smallImageKey = video.paused ? "pause" : "play";
			presenceData.smallImageText = video.paused
				? (await strings).pause
				: (await strings).play;
			[, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video);
			if (buttons) {
				presenceData.buttons = [
					{
						label: "Watch Episode",
						url: document.location.href
					}
				];
			}

			if (video.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else {
			presenceData.details = "Looking at";
			presenceData.state = episode.partOfSeries.name;
			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Page",
						url: document.location.href
					}
				];
			}
		}
	} else if (document.location.pathname.includes("video") && !video) {
		if (
			document.querySelector(
				"#root > div > div > div.sc-pkSvE.kPCOPp > div > div > div.sc-AxjAm.khAjwj.sc-psDXd.iazofB > div > h2 > span"
			)
		)
			presenceData.details = "Browsing...";
		else {
			presenceData.details = "Looking at";
			presenceData.state = JSON.parse(
				document.querySelector('[type="application/ld+json"]').textContent
			).name;
			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Page",
						url: document.location.href
					}
				];
			}
		}
	} else presenceData.details = "Browsing...";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
