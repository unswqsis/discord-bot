// https://discord.com/oauth2/authorize?scope=bot&client_id=943524139900207134&permissions=1644971818967

const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client();

const getAllowed = () => (
	fs.readFileSync("allowed.txt", "utf8").trim().split("\n").map(
		(line) => line.trim()
	)
);

const getChannel = (guild, n) => (
	guild.channels.cache.filter((channel) => (
		channel.type === "text"
	)).find((channel) => (
		channel.position === n
	))
);

const getWelcomeChannel = (guild) => (
	guild.systemChannel ? guild.systemChannel : getChannel(guild, 0)
);

client.on("ready", () => {
	console.log(`Connected as ${client.user.tag}`);
});

client.on("message", async (message) => {
	count = 0;
	setInterval(async () => {
		const invite = await getWelcomeChannel(message.guild).createInvite({
			maxAge: 0,
			maxUses: 1,
			unique: true
		});

		console.log(invite.url);

		count++;
		if (count >= Number(process.argv[2])) process.exit(0);
	}, 5000);
});

//client.on("guildMemberAdd", (member) => {
//	if (!getAllowed().includes(member.user.tag)) {
//		member.kick();
//	}
//});

client.login(process.env.QSIS_DISCORD_TOKEN);
