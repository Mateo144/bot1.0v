const botconfig = require("./botconfig.json");
const moment = require('moment')
const Discord = require("discord.js")
const fs = require('fs');
const os = require('os');
const osutils = require('os-utils');

const prefix = "!"
var nazwabota = "TechFun.site"

const bot = new Discord.Client({disableEveryone: true})
//Info w konsoli o bocie
bot.on("ready", async () => {
    console.log(`${nazwabota} jest online`)
});
Wiatomosc witajaca nowych ludzi
bot.on('guildMemberAdd', member => {
    console.log('Dołaczył na serwer.')
    var embed = new Discord.RichEmbed()
    .setTitle(`${member.user.username} dołączył na serwer!`)
    .setDescription(`Jesteś nasza ${member.guild.memberCount} osobą na serwerze!`)
    .setColor(`#8AA4B7`)    
     member.guild.channels.get('ID KANAŁU Z POWITANIAMI NA SERWER').send(embed)
}
)
Wiadomość o opuszczeniu discorda
bot.on('guildMemberRemove', member => {
    console.log('Opuścił serwer.')
    var liczbaprzed = member.guild.memberCount
    var liczbapo = liczbaprzed+1
    var embed = new Discord.RichEmbed()
    .setTitle(`${member.user.username} opuścił na serwer!`)
    .setDescription(`Był nasza ${liczbapo} osobą na serwerze!`)
    .setColor(`#8AA4B7`)
    member.guild.channels.get('ID KANAŁU Z POZEGNANIEM NA SERVER').send(embed)
}
)


bot.on("message", async message => {
    if (message.author.bot) return;
 
    if (message.content.indexOf(prefix) !== 0) return;
    var args = message.content.slice(prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase()

    //pisanie w imieniu bota o ile masz permisje administratora
    if(command == "say"){
        message.delete() 
         
       if(message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(message.content.slice(prefix.length+3))
       else
       return message.channel.send("Nie posiadasz permisji!")  
    }
    //pisanie w imieniu bota jako embed o ile masz permisje administratora
    if(command == "sayembed"){
        message.delete()
        
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("Nie posiadasz uprawnień..").then(m => m.delete(3000));

        if (args.length < 0)
            return message.reply("Nie masz nic do napisania?").then(m => m.delete(3000));

                var embed = new Discord.RichEmbed()
                .setAuthor(message.member.user.username, message.member.user.avatarURL)
                .setDescription(args.slice(0).join(" "))                
                .setFooter(message.guild.name, message.guild.iconURL)
                .setTimestamp()
                .setColor(5301186);

            message.channel.send(embed)
            
          
        
    
    }
    //pomoc
    if(command == "pomoc"){
        message.delete()

        var embed = new Discord.RichEmbed()
        .setTitle("Pomoc:")
        .setThumbnail(message.guild.iconURL)
        .addField("Komendy:", "__**Ogólne**__\n\n**pomoc**\n**infovps**\n**infouser**\n**infobot**\n**infoserver**\n**propozycja**\n**glosowanie**\n**avatar**\n**ping**\n\n__**Administracyjne**__\n\n**ban**\n**kick**\n**status**\n**say**\n**sayembed**\n**usun**", true)        
        .addField("Funkcja:", "__**_**__\n\n- Wyświetla tą liste\n- Wyświetla informacjie o VPS\n- Wyświetla informacje o używtkowniku\n- Wyświetla informacje o bocie\n- Wyświetla informacje o serwerze discord\n- Utwórz propocyzje\n- Utwórz głosowanie\n- Wyświetla avatar używtkownika\n- Ping bota\n\n__**:**__\n\n- Banowanie używtkownika\n- Kikowanie używtkownika\n- Status bota\n- Pisanie w imieniu bota\n- Pisanie w imieniu bota jako embed\n- Usiwasnie wiadomosci", true)
        .setTimestamp()
        .setColor(`#8AA4B7`)
        .setFooter(message.guild.name, message.guild.iconURL)

        message.channel.send(embed)
    
    }
    //informacje o serwerze discord
    if(command == "infoserver"){
        message.delete()
        
        var embed = new Discord.RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setTitle("Informacje serwera:")        
        .setThumbnail(message.guild.iconURL)
        .addField("Nazwa Serwera:", message.guild.name, true)
        .addField("Właściciel serwera:", message.guild.owner.user.tag, true)                        
        .addField("Data stworzenia na serwer:", message.guild.createdAt, false)
        .addField("Data dołączenia na serwer:", message.guild.joinedAt, false)
        
        
        .setTimestamp()
        .setColor(`#8AA4B7`)
        .setFooter(message.guild.name, message.guild.iconURL)

        return message.channel.send(embed)
    }

    //informacje o Bocie
    if(command == "infobot"){
        message.delete()

        var embed = new Discord.RichEmbed()
        .setTitle("Informacje o bocie:")
        .setDescription("https://TechFun.site")
        .setThumbnail(message.guild.iconURL)
        .addField("Autor:", "Mateo#0947", true)        
        .addField("Strona WWW:", "https://TechFun.site", true)
        .addField("Nazwa Bota:", "Demonstracyjny Bot TechFun.site", false)
        .addField("Data stworzenia bota:", "27.03.2020", false)
        .addField("Wersja:", "1.0", false)
        .setTimestamp()
        .setColor(`#8AA4B7`)
        .setFooter(message.guild.name, message.guild.iconURL)

        return message.channel.send(embed)
    }
    //propozycja na wyswietla sie na kanale na ktorym jest pisane
    if(command == "propozycja"){
        message.delete()

        var wiadomsc = message.content.slice([prefix.length+10])
        var embed = new Discord.RichEmbed()
        .setAuthor(message.member.user.username, message.member.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .addField("Treść propozycji:", wiadomsc, false)
        .setColor(`#8AA4B7`)
        .setTimestamp()
        .setFooter("Jestem za ✅  | Nie mam zdania ➖ | Jestem przeciw ❌")

        message.channel.send(embed).then(async embedMessage => {
            await embedMessage.react('✅')
            await embedMessage.react('➖')
            await embedMessage.react('❌')
            return

        })
        
    }
    //głosowanie na wyswietla sie na kanale na ktorym jest pisane
    if(command == "glosowanie"){
        message.delete()

        var wiadomsc = message.content.slice([prefix.length+10])
        var embed = new Discord.RichEmbed()
        .setAuthor(message.member.user.username, message.member.user.avatarURL)
        .setThumbnail(message.guild.iconURL)
        .addField("**Treść głosowania:**", wiadomsc, false)
        .setColor(`#8AA4B7`)
        .setTimestamp()
        .setFooter("Jestem za ✅  | Nie mam zdania ➖ | Jestem przeciw ❌")

        message.channel.send(embed).then(async embedMessage => {
            await embedMessage.react('✅')
            await embedMessage.react('➖')
            await embedMessage.react('❌')
            return

        })
        
    }
    //Status bota
    if(command == "status"){
        message.delete()
        
        let arg = message.content.split(" ").slice(1);
        let status = arg.join(' ')
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Invalid permissions.").then(msg => msg.delete(10000));
        bot.user.setActivity(status)
        message.channel.send("Status zmieniony").then(msg => msg.delete(10000));  

    }
    //usuwanie wiadomosci
    if(command == "usun"){
        if (!args[0]) return message.reply("Ile wiadomości chcesz usunąc?").then(m => m.delete(3000));
        if (!message.member.hasPermission(8192)) return message.reply("❌ Nie posiadasz permisji do usuwania wiadomości").then(m => m.delete(3000));
        if (!message.guild.me.hasPermission(8192)) return message.reply("❌ Bot nie posiada permisji do kickowania").then(m => m.delete(3000));

        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send("Usunięto "+ args[0] +" wiadomości przez: " + message.author.tag).then(msg => msg.delete(3000));

            
        });
    }
    //Avatar
    if(command == "avatar"){
                
        let msg = await message.channel.send("Ładowanie avataru...");

    let mentionedUser = message.mentions.users.first() || message.author;

        let embed = new Discord.RichEmbed()

        .setImage(mentionedUser.displayAvatarURL)
        .setTitle("Avatar:")
        .setFooter(message.guild.name, message.guild.iconURL + message.author.tag)
        .setDescription("[Avatar URL link]("+mentionedUser.displayAvatarURL+")")
        .setColor(`#8AA4B7`)
        .setTimestamp();
        message.channel.send(embed)


    msg.delete();
    }
    //Ping bota
    if(command == "ping"){
        var embed = new Discord.RichEmbed()
        .setTitle("Ping Bota:")
        .setDescription('Pong`' + Math.floor(Math.round(bot.ping)) + '`ms')
        .setTimestamp()
        .setColor(`#8AA4B7`)
        .setFooter(message.guild.name, message.guild.iconURL);
        message.channel.send(embed)

    message.delete();
    }
    //kikowanie używtkowników
    if(command == "kick"){
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);

        if(!message.member.hasPermission("KICK_MEMBERS")){
            message.channel.send("Niemasz permisji do używania tej komendy!");
        }
        else{
            
            if(!member)
                //you have to type !kick then @username#1234 as an example
                return message.channel.send("Podaj prawidłowego używtkownika tego serwera");
            if(!member.kickable) 
                return message.channel.send("Nie mogę wyrzucic tego użytkownika! Czy mają większą rolę? Czy mam uprawnienia do kikowania?");
    
            // slice(1) removes the first part, which here should be the user mention or ID
            // join(' ') takes all the various parts to make it a single string.
            let reason = args.slice(1).join(' ');
            if(!reason) 
                reason = "Nie podano powodu";
            member.kick(reason)
                .catch(error => message.channel.send(`Przepraszam ${message.author} Nie został wyrzucony z tego powodu : ${error}`));
                message.channel.send(`${member.user.tag} został wyrzucony przez ${message.author.tag} z powodu: ${reason}`);
        } 

    }
    //banowanie używtkownika
    if(command == "ban"){
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);

    if(!message.member.hasPermission("BAN_MEMBERS")){
        message.channel.send("Niemasz permisji do używania tej komendy!");
    }

    else{
        if(!member)
            return message.channel.send("Podaj prawidłowego używtkownika tego serwera");
        if(!member.bannable) 
            return message.channel.send("Nie mogę wyrzucic tego użytkownika! Czy mają większą rolę? Czy mam uprawnienia do kikowania?");

        let reason = args.slice(1).join(' ');
        if(!reason) reason = "Nie podano powodu";

        member.ban(reason)
            .catch(error => message.channel.send(`Przepraszam ${message.author} Nie mogłem zablokować użytkownika`));
        message.channel.send(`${member.user.tag} został zbanowany przez ${message.author.tag} z powodu: ${reason}`);
    } }
    //Informacje o używtkowniku
    if(command == "infouser"){

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        };
            let user = message.mentions.users.first();
            let muser = message.guild.member(message.mentions.users.first());
            if (!muser) muser = message.member;
            if(!user) user = message.author;

            var embed = new Discord.RichEmbed();
            embed.addField("Nazwa użytkownika", `${user.username}#${user.discriminator}`, true)
            .addField("ID", `${user.id}`, true)
            .setColor("#8AA4B7")
            .setThumbnail(`${user.avatarURL}`)
            .setTimestamp()
            .setURL(`${user.avatarURL}`)
            .addField('Status', `${muser.presence.status.toUpperCase()}`, false)
            .addField('W grze', `${muser.presence.game === null ? "Nie" : muser.presence.game.name}`, false)
            .addField('Dołączył na Discord', `${moment(user.createdAt).toString().substr(0, 15)}\n(${moment(user.createdAt).fromNow()})`, true)
            .addField('Dołączył na Server', `${moment(muser.joinedAt).toString().substr(0, 15)}\n(${moment(muser.joinedAt).fromNow()})`, true)
            .addField('Role', `${muser.roles.array()}`, false)
            .addField('Jest Botem?', `${user.bot.toString().toUpperCase()}`, false)
            .setFooter(message.guild.name, message.guild.iconURL);
            message.channel.send({embed});
    };
    //Informacje o VPS
    if(command == "infovps"){                
    osutils.cpuUsage(function(v) {
    var embed = new Discord.RichEmbed()
    .setColor(0x7289DA)
    .setThumbnail(message.guild.iconURL)
    .setTimestamp()
    .addField("VPS Status:", "Pokazuje statystyki VPS, na którym działa bot.")
    .addField("Platforma:", osutils.platform(),false)
    .addField("VPS CPU Cores:", osutils.cpuCount() + " Cores",true)
    .addField("CPU zużycie:", `${(v * 100).toString().split(".")[0] + "." + (v * 100).toString().split(".")[1].split('')[0] + (v * 100).toString().split(".")[1].split('')[1]}%`,true)
    .addField("Dysk:", osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1] + "MB",false)
    .addField("RAM zużycie", `${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + ( osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1]}MB`,true)
    .addField("RAM zużycie %", `${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split('')[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split('')[1]}%`,true)
    .addField("Ping",  + Math.floor(Math.round(bot.ping)) + "ms", false)
    .setFooter(message.guild.name, message.guild.iconURL);
        message.channel.send({embed});
    })
    }
    
        
       
    






});



bot.login(botconfig.token)
