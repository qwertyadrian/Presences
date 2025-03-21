const presence = new Presence({
		clientId: "918904479888334968"
	}),
	browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "scrap-logo",
		startTimestamp: browsingStamp
	};

	if (document.location.pathname === "/")
		presenceData.details = "Viewing Main page";
	else if (document.location.pathname.includes("/stats")) {
		presenceData.details = "Viewing the site stats";
		presenceData.state = "Trade-stats for the past 12 hours";
	} else if (document.location.pathname.includes("/partswap")) {
		presenceData.details = "MvM Part Swap";
		presenceData.state = "Trading MvM Parts";
	} else if (document.location.pathname.includes("/itemvalues"))
		presenceData.details = "Checking Item Values for Premium";
	else if (document.location.pathname.includes("/games")) {
		presenceData.details = "Steam Game Trading";
		presenceData.state = "Viewing the games price info";
	} else if (document.location.pathname.includes("/tips"))
		presenceData.details = "Viewing Tips page";
	else if (document.location.pathname.includes("/twitch")) {
		presenceData.details = "Getting more information about";
		presenceData.state = "Scrap.TF Twitch Raffle Bot";
	} else if (document.location.pathname.includes("/support"))
		presenceData.details = "Viewing Live Support page";
	else if (document.location.pathname.includes("/inventory"))
		presenceData.details = "Viewing thier site inventory";
	else if (document.location.pathname.includes("/deposit"))
		presenceData.details = "Depositing items into their site inventory";
	else if (document.location.pathname.includes("/devices"))
		presenceData.details = "Generating a new key for Scrap.tf chat service";
	else if (document.location.pathname.includes("/search"))
		presenceData.details = "Searching for an item";
	else if (document.location.pathname.includes("/notices"))
		presenceData.details = "Viewing all of their notifications";
	else if (document.location.pathname.includes("/collection"))
		presenceData.details = "Viewing their profile collection";
	else if (document.location.pathname.includes("/settings"))
		presenceData.details = "Changing their profile settings";
	else if (document.location.pathname.includes("/rules"))
		presenceData.details = "Reading the Rules";
	else if (document.location.pathname.includes("/about"))
		presenceData.details = "Reading more about Scrap.tf";
	else if (document.location.pathname.includes("/help")) {
		if (document.location.pathname.includes("all"))
			presenceData.details = "Searching through Resources";
		else if (document.location.pathname.includes("kb")) {
			const title = document.querySelector("#helpcenter-content > h4");
			presenceData.details = "Reading a help thread";
			presenceData.state = `"${title.textContent}"`;
		} else presenceData.details = "Viewing Help Center";
	} else if (document.location.pathname.includes("/megaraffle")) {
		if (document.location.pathname.includes("/history")) {
			const title = document.querySelector(
				"#pid-viewmegaraffle > div.bots-container.flat-slate > div > div.megaraffle-summary > span"
			);
			presenceData.details = "Viewing history of a Megaraffle";
			presenceData.state = `The raffle has ended ${title.textContent}`;
		} else presenceData.details = "Visiting the Megaraffle page";
	} else if (document.location.pathname.includes("/profile")) {
		const title = document.querySelector(
				"#dynamic-height-slate > div > div > div.col-md-9 > div > div > div.profile-upper > div.rev-banking-background.profile-background > div > div.profile-summary.col-md-6 > h1 > span > span"
			),
			perm = document.querySelector(
				"#dynamic-height-slate > div > div > div.col-md-9 > div > div > div.profile-upper > div.rev-banking-background.profile-background > div > div.profile-summary.col-md-6 > h3 > b"
			);
		presenceData.details = "Visiting a profile";
		presenceData.state = `[${perm.textContent}] ${title.textContent}`;
	} else if (document.location.pathname.includes("/terms")) {
		const title = document.querySelector(
			"#dynamic-height-slate > div > div.panel-body > p:nth-child(1) > small"
		);
		presenceData.details = "Reading ToS";
		presenceData.state = title.textContent;
	} else if (document.location.pathname.includes("/premium")) {
		const title = document
			.querySelector("#premium-balance")
			.textContent.replace("You've Donated ", " ");
		presenceData.details = "Visiting the Premium page";
		presenceData.state = `${title} Donated`;
	} else if (document.location.pathname.includes("/keys")) {
		const sellp = document.querySelector(
				"#pid-keys > div.welcome > div > div > div.col-md-9.bank-welcome.keys-welcome > h3:nth-child(2) > span"
			),
			buyp = document.querySelector(
				"#pid-keys > div.welcome > div > div > div.col-md-9.bank-welcome.keys-welcome > h3:nth-child(4) > span"
			);
		presenceData.details = "Key Trading";
		presenceData.state = `Buy price: ${buyp.textContent} | Sell price: ${sellp.textContent}`;
	} else if (document.location.pathname.includes("/sell")) {
		presenceData.details = "Selling Items";
		if (document.location.pathname.includes("/weapons"))
			presenceData.state = "Trading with Weapons";
		else if (document.location.pathname.includes("/hats"))
			presenceData.state = "Trading with Hats";
		else if (document.location.pathname.includes("/items"))
			presenceData.state = "Trading with Items";
		else if (document.location.pathname.includes("/stranges"))
			presenceData.state = "Trading with Stranges";
		else if (document.location.pathname.includes("/killstreaks"))
			presenceData.state = "Trading with Killstreak Kits";
		else if (document.location.pathname.includes("/gifts"))
			presenceData.state = "Trading with Steam Games";
		else if (document.location.pathname.includes("/cards"))
			presenceData.state = "Trading with Steam Trade Cards";
		else if (document.location.pathname.includes("/skins"))
			presenceData.state = "Trading with Warpaints/Skins";
		else if (document.location.pathname.includes("/unusuals"))
			presenceData.state = "Trading with Unusuals";
		else if (document.location.pathname.includes("/incinerator"))
			presenceData.state = "Incinerating Items FOR FREE!";
		else if (document.location.pathname.includes("/all"))
			presenceData.state = "Choosing items from the entire backpack";
	} else if (document.location.pathname.includes("/buy")) {
		if (document.location.pathname.includes("/weapons"))
			presenceData.details = "Buying Weapons";
		else if (document.location.pathname.includes("/hats"))
			presenceData.details = "Buying Hats";
		else if (document.location.pathname.includes("/items"))
			presenceData.details = "Buying Items";
		else if (document.location.pathname.includes("/stranges"))
			presenceData.details = "Buying Stranges";
		else if (document.location.pathname.includes("/killstreaks"))
			presenceData.details = "Buying Killstreak Kits";
		else if (document.location.pathname.includes("/gifts"))
			presenceData.details = "Buying Steam Games";
		else if (document.location.pathname.includes("/cards"))
			presenceData.details = "Buying Steam Trade Cards";
		else if (document.location.pathname.includes("/skins"))
			presenceData.details = "Buying Warpaints/Skins";
		else if (document.location.pathname.includes("/unusuals"))
			presenceData.details = "Buying Unusuals";
	} else if (document.location.pathname.includes("/raffles")) {
		if (document.location.pathname.includes("puzzle")) {
			const pze = document.querySelector(
					"#main-container > div.panel.panel-info > div.panel-body.raffle-list-body > div.raffle-list-header > div:nth-child(2) > h1"
				),
				pzw = document.querySelector(
					"#main-container > div.panel.panel-info > div.panel-body.raffle-list-body > div.raffle-list-header > div:nth-child(3) > h1"
				);
			presenceData.details = "Viewing Puzzle Raffles page";
			presenceData.state = `${pze.textContent} Puzzles Solved | ${pzw.textContent} Raffles Won`;
		} else if (document.location.pathname.includes("create"))
			presenceData.details = "Creating a Raffle";
		else if (document.location.pathname.includes("history")) {
			const title = document.querySelector(
				"#dynamic-height-slate > div > div.panel-body.raffle-header-border > div > div > h1"
			);
			if (document.location.pathname.includes("/public")) {
				presenceData.details = "Viewing their own Public raffle history";
				presenceData.state = `${title.textContent} raffles entered`;
			} else if (document.location.pathname.includes("/puzzle")) {
				presenceData.details = "Viewing their own Puzzle raffle history";
				presenceData.state = `${title.textContent} raffles entered`;
			} else if (document.location.pathname.includes("/private")) {
				presenceData.details = "Viewing their own Private raffle history";
				presenceData.state = `${title.textContent} raffles entered`;
			} else {
				presenceData.details = "Viewing their own raffle history";
				presenceData.state = `${title.textContent} raffles entered`;
			}
		} else if (document.location.pathname.includes("tipped")) {
			const title = document.querySelector(
				"#dynamic-height-slate > div > div.panel-body.raffle-header-border > div > div > h1"
			);
			if (document.location.pathname.includes("/public")) {
				presenceData.details = "Viewing their Tipped Public raffle history";
				presenceData.state = `${title.textContent} Tips Given`;
			} else if (document.location.pathname.includes("/puzzle")) {
				presenceData.details = "Viewing their Tipped Puzzle raffle history";
				presenceData.state = `${title.textContent} Tips Given`;
			} else if (document.location.pathname.includes("/private")) {
				presenceData.details = "Viewing their Tipped Private raffle history";
				presenceData.state = `${title.textContent} Tips Given`;
			} else {
				presenceData.details = "Viewing their Tipped raffle history";
				presenceData.state = `${title.textContent} Tips Given`;
			}
		} else if (document.location.pathname.includes("won")) {
			const title = document.querySelector(
					"#dynamic-height-slate > div > div.panel-body.raffle-header-border > div > div > h1"
				),
				item = document.querySelector(
					"#dynamic-height-slate > div > div.panel-body.raffle-header-border > div > div:nth-child(2) > h1"
				);
			if (document.location.pathname.includes("/public")) {
				presenceData.details = "Viewing history of Public raffles won";
				presenceData.state = `${title.textContent} Raffles Won | ${item.textContent} Items Won`;
			} else if (document.location.pathname.includes("/puzzle")) {
				presenceData.details = "Viewing history of Puzzle raffles won";
				presenceData.state = `${title.textContent} Raffles Won | ${item.textContent} Items Won`;
			} else if (document.location.pathname.includes("/private")) {
				presenceData.details = "Viewing history of Private raffles won";
				presenceData.state = `${title.textContent} Raffles Won | ${item.textContent} Items Won`;
			} else {
				presenceData.details = "Viewing history of raffles won";
				presenceData.state = `${title.textContent} Raffles Won | ${item.textContent} Items Won`;
			}
		} else if (document.location.pathname.includes("mine")) {
			const title = document.querySelector(
					"#dynamic-height-slate > div > div.panel-body.raffle-header-border > div > div > h1"
				),
				item = document.querySelector(
					"#dynamic-height-slate > div > div.panel-body.raffle-header-border > div > div:nth-child(2) > h1"
				);
			if (document.location.pathname.includes("/public")) {
				presenceData.details = "Viewing their Public created raffle history";
				presenceData.state = `${title.textContent} Raffles Created | ${item.textContent} Items Raffled`;
			} else if (document.location.pathname.includes("/puzzle")) {
				presenceData.details = "Viewing their Puzzle created raffle history";
				presenceData.state = `${title.textContent} Raffles Created | ${item.textContent} Items Raffled`;
			} else if (document.location.pathname.includes("/private")) {
				presenceData.details = "Viewing their Private created raffle history";
				presenceData.state = `${title.textContent} Raffles Created | ${item.textContent} Items Raffled`;
			} else {
				presenceData.details = "Viewing their created raffle history";
				presenceData.state = `${title.textContent} Raffles Created | ${item.textContent} Items Raffled`;
			}
		} else if (document.location.pathname.includes("raffles/")) {
			const title = document.querySelector(
				"#main-container > div > div.well.raffle-well > div:nth-child(1) > h3"
			);
			presenceData.details = "Visiting a raffle page";
			presenceData.state = `"${title.textContent}"`;
		} else {
			const re = document.querySelector(
					"#main-container > div.panel.panel-info > div.panel-body.raffle-list-body > div.raffle-list-header > div:nth-child(2) > h1"
				),
				rw = document.querySelector(
					"#main-container > div.panel.panel-info > div.panel-body.raffle-list-body > div.raffle-list-header > div:nth-child(3) > h1"
				);
			presenceData.details = "Viewing Public Raffles page";
			presenceData.state = `${re.textContent} Raffles Entered | ${rw.textContent} Raffles Won`;
		}
	} else if (document.location.pathname.includes("/auctions")) {
		if (document.location.pathname.includes("/create"))
			presenceData.details = "Creating an Automated Auction";
		else if (document.location.pathname.includes("/joined")) {
			const title = document
				.querySelector(
					"#dynamic-height-slate > div > div.panel-body.text-center"
				)
				.textContent.replace("You have joined a total of ", " ");
			presenceData.details = "Viewing their joined auctions";
			presenceData.state = `${title.replace(
				".\n\nAll Auctions\nJoined Auctions\nMy Auctions\nWon Auctions",
				" "
			)} joined`;
		} else if (document.location.pathname.includes("/mine")) {
			const title = document
				.querySelector(
					"#dynamic-height-slate > div > div.panel-body.text-center"
				)
				.textContent.replace("You have won a total of ", " ");
			presenceData.details = "Viewing their created auctions";
			presenceData.state = `${title.replace(
				".\n\nAll Auctions\nJoined Auctions\nMy Auctions\nWon Auctions",
				" "
			)} won`;
		} else if (document.location.pathname.includes("/won")) {
			const title = document
				.querySelector(
					"#dynamic-height-slate > div > div.panel-body.text-center"
				)
				.textContent.replace("You have won a total of ", " ");
			presenceData.details = "Viewing auctions they've won";
			presenceData.state = `${title.replace(
				".\n\nAll Auctions\nJoined Auctions\nMy Auctions\nWon Auctions",
				" "
			)} won`;
		} else if (document.location.pathname.includes("auctions/")) {
			const title = document.querySelector(
				"#main-container > div > div.well.auction-well > div:nth-child(1) > h3"
			);
			presenceData.details = "Viewing an Auction page";
			presenceData.state = `"${title.textContent}"`;
		} else {
			const title = document
				.querySelector(
					"#main-container > div:nth-child(2) > div.panel-body > div.text-center"
				)
				.textContent.replace(" Steam API Availability: 100%\n", " ");
			presenceData.details = "Viewing Public auctions";
			presenceData.state = title.replace(
				"\n\nAll Auctions\nEntered Auctions\nMy Auctions",
				" "
			);
		}
	} else if (
		document.location.pathname !== "/sell/weapons" &&
		document.location.pathname !== "/buy/weapons" &&
		document.location.pathname.includes("weapons")
	) {
		if (document.location.pathname.includes("weapons/")) {
			const title = document
				.querySelector(
					"#main-container > div.welcome-overlay-well.well > div.well-padding > div.pull-left.well-title"
				)
				.textContent.replace("Weapon Trading ", " ");
			presenceData.details = "Trading Weapons with a Bot";
			presenceData.state = `Viewing ${title}`;
		} else presenceData.details = "Weapon Trading";
	} else if (
		document.location.pathname !== "/sell/hats" &&
		document.location.pathname !== "/buy/hats" &&
		document.location.pathname.includes("hats")
	) {
		if (document.location.pathname.includes("hats/")) {
			const title = document
				.querySelector(
					"#main-container > div.welcome-overlay-well.well > div.well-padding > div.pull-left.well-title"
				)
				.textContent.replace("Hat Trading ", " ");
			presenceData.details = "Trading Hats with a Bot";
			presenceData.state = `Viewing ${title}`;
		} else presenceData.details = "Hat Trading";
	} else if (
		document.location.pathname !== "/sell/items" &&
		document.location.pathname !== "/buy/items" &&
		document.location.pathname.includes("items")
	) {
		if (document.location.pathname.includes("items/")) {
			const title = document
				.querySelector(
					"#main-container > div.welcome-overlay-well.well > div.well-padding > div.pull-left.well-title"
				)
				.textContent.replace("Item Trading ", " ");
			presenceData.details = "Trading Items with a Bot";
			presenceData.state = `Viewing ${title}`;
		} else {
			(presenceData.details = "Item Trading"),
				(presenceData.state = "Viewing item pricelist");
		}
	} else if (
		document.location.pathname !== "/sell/unusuals" &&
		document.location.pathname !== "/buy/unusuals" &&
		document.location.pathname.includes("unusuals")
	)
		presenceData.details = "Unusual Trading";
	else if (
		document.location.pathname !== "/sell/skins" &&
		document.location.pathname !== "/buy/skins" &&
		document.location.pathname.includes("skins")
	) {
		if (document.location.pathname.includes("skins/")) {
			const title = document
				.querySelector(
					"#main-container > div.welcome-overlay-well.well > div.well-padding > div.pull-left.well-title"
				)
				.textContent.replace("Skin + War Paint Trading ", " ");
			presenceData.details = "Trading Warpaints/Skins with a Bot";
			presenceData.state = `Viewing ${title}`;
		} else presenceData.details = "Skin & War Paint Trading";
	} else if (
		document.location.pathname !== "/sell/killstreaks" &&
		document.location.pathname !== "/buy/killstreaks" &&
		document.location.pathname.includes("killstreaks")
	) {
		if (document.location.pathname.includes("killstreaks/")) {
			const title = document
				.querySelector(
					"#main-container > div.welcome-overlay-well.well > div.well-padding > div.pull-left.well-title"
				)
				.textContent.replace("Killstreak Kits ", " ");
			presenceData.details = "Trading Killstreaks with a Bot";
			presenceData.state = `Viewing ${title}`;
		} else presenceData.details = "Killstreak Kit Trading";
	} else if (
		document.location.pathname !== "/sell/stranges" &&
		document.location.pathname !== "/buy/stranges" &&
		document.location.pathname.includes("stranges")
	) {
		if (document.location.pathname.includes("stranges/")) {
			const title = document
				.querySelector(
					"#main-container > div.welcome-overlay-well.well > div.well-padding > div.pull-left.well-title"
				)
				.textContent.replace("Strange Trading ", " ");
			presenceData.details = "Trading Strange Items with a Bot";
			presenceData.state = `Viewing ${title}`;
		} else presenceData.details = "Strange Items Trading";
	} else if (
		document.location.pathname !== "/sell/cards" &&
		document.location.pathname !== "/buy/cards" &&
		document.location.pathname.includes("cards")
	) {
		if (document.location.pathname.includes("cards/")) {
			const title = document
				.querySelector(
					"#main-container > div.welcome-overlay-well.well > div.well-padding > div.pull-left.well-title"
				)
				.textContent.replace("Steam Trading Cards ", " ");
			presenceData.details = "Trading Cards with a Bot";
			presenceData.state = `Viewing ${title}`;
		} else presenceData.details = "Card Trading";
	} else if (
		document.location.pathname !== "/sell/incinerator" &&
		document.location.pathname.includes("incinerator")
	) {
		if (document.location.pathname.includes("incinerator/")) {
			const title = document.querySelector(
				"#main-container > div.welcome-overlay-well.well > div.well-padding > div.pull-left.well-title"
			);
			presenceData.details = "Viewing incinerated items";
			presenceData.state = `Viewing ${title}`;
		} else presenceData.details = "Item Incinerator";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
