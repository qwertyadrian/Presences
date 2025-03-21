const presence = new Presence({
		clientId: "700405996677365842"
	}),
	strings = presence.getStrings({
		playing: "presence.playback.playing",
		paused: "presence.playback.paused",
		browsing: "presence.activity.browsing",
		episode: "presence.media.info.episode"
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "anvlogo",
			details: (await strings).browsing,
			startTimestamp: Math.floor(Date.now() / 1000)
		},
		path = window.location.pathname;
	if (path.endsWith("/equipe"))
		presenceData.details = "Vendo os membros da equipe";

	if (path.startsWith("/top")) presenceData.details = "Vendo o top animes";
	else if (path.endsWith("/doramas"))
		presenceData.details = "Vendo a lista de doramas";
	else if (path.endsWith("/filmes"))
		presenceData.details = "Vendo a lista de filmes";
	else if (path.endsWith("/lancamentos"))
		presenceData.details = "Vendo a lista de lançamentos";
	else if (path.endsWith("/animes"))
		presenceData.details = "Vendo a lista de animes";
	else if (path.endsWith("/legendado")) {
		const video: HTMLVideoElement = document.querySelector("video");
		presenceData.details = document
			.querySelectorAll(".active h1")[0]
			.textContent.replace(" - Episodio ", "")
			.replace(/[0-9]/g, "");
		presenceData.state = (await strings).episode.replace(
			"{0}",
			document
				.getElementById("current_episode_name")
				.textContent.match(/\d+/g)[0]
		);
		if (!video.paused) {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(video.currentTime, video.duration);
			presenceData.smallImageKey = "play";
			presenceData.smallImageText = (await strings).playing;
		} else if (document.querySelector("video").currentTime > 0) {
			presenceData.smallImageKey = "pause";
			presenceData.smallImageText = (await strings).paused;
		}
	}
	presence.setActivity(presenceData, true);
});
