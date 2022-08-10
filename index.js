// https://discord.com/oauth2/authorize?scope=bot&client_id=943524139900207134&permissions=1644971818967

const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client();

const getAllowed = () => (
	fs.readFileSync("allowed.txt", "utf8").trim().split("\n").map(
		(line) => line.trim().toLowerCase()
	)
);

const log = (line) => fs.appendFileSync("log.txt", `${line}\n`);

client.on("ready", () => {
	console.log(`Connected as ${client.user.tag}`);
});

client.on("guildMemberAdd", (member) => {
	const isAllowed = getAllowed().includes(member.user.tag.toLowerCase());

	if (!isAllowed) {
		member.kick();
	}

	log(`${isAllowed ? "Allowed" : "Kicked"}: ${member.user.id} ${member.user.tag}`);
});

client.login(process.env.QSIS_DISCORD_TOKEN);
