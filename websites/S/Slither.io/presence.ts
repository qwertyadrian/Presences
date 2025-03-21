const presence = new Presence({
	clientId: "630783537221468182"
});

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "slitherlogo"
	};

	if (document.querySelector('[style="opacity: .8; font-weight: bold;"]')) {
		presenceData.details = `Length: ${
			document.querySelector('[style="opacity: .8; font-weight: bold;"]')
				.textContent
		}`;
		presenceData.state = `Rank: ${
			document.querySelector('[style="opacity: .35;"]').textContent
		}`;
	}

	presence.setActivity(presenceData);
});
