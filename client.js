const Discord = require('discord.js');
const client = new Discord.Client();
var version = ('1.0');
const prefix = '!';
const fs = require('fs');
const config = require("./config.json");

client.commands = new Discord.Collection();

client.once('ready', () => {
    console.log('logbot startup ' + version);
});

client.on('message', message => {
    if(message.content.startsWith(prefix));

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        message.channel.send(`Reached API in (${Date.now() - message.createdTimestamp} ms)`);
        console.log(`executed command latency (${Date.now() - message.createdTimestamp}ms)`);
    }
});

client.on('message', message => {
    fs.appendFile('log.txt' , message.createdTimestamp + ' ' + message.channel.name + message.author.tag + ': ' + message.content + ('\r\n') , function (err) {
        if (err) throw err;
        console.log('Saved message');
    });
    console.log('(' + message.createdAt + ' ' + message.channel.name + ') ' + message.author.tag + ': ' + message.content);
});

client.on('messageDelete', message => {
    console.log(`A message by ${message.author.tag} was deleted in ${message.channel.name} : ` + message.content);
    fs.appendFile('log.txt' , `A message by ${message.author.tag} was deleted in ${message.channel.name} : ` + message.content + ('\r\n') , function (err) {
        if (err) throw err;
        console.log('Saved delete');
    });
});

client.on('messageUpdate', message => {
    console.log(`A message by ${message.author.tag} was edited in ${message.channel.name} : ` + message.content);
    fs.appendFile('log.txt' , `A message by ${message.author.tag} was edited in ${message.channel.name} : ` + message.content + ('\r\n') , function (err) {
        if (err) throw err;
        console.log('Saved edit');
    });
});

client.login(config.token);
