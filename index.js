// https://discord.com/oauth2/authorize?scope=bot&client_id=943524139900207134&permissions=1644971818967

const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client();

const getAllowed = () => (
	fs.readFileSync("allowed.txt", "utf8").trim().split("\n").map(
		(line) => line.trim()
	)
);

client.on("ready", () => {
	console.log(`Connected as ${client.user.tag}`);
});

client.on("guildMemberAdd", (member) => {
	if (!getAllowed().includes(member.user.tag)) {
		member.kick();
	}
});

client.login(process.env.QSIS_DISCORD_TOKEN);
