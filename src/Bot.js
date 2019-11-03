const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'src/database.sqlite'
});

var User = sequelize.define('user', {

  username: Sequelize.STRING
});
//const SQLite = require('better-sqlite3');
//const sql = SQLite('/data.sqlite');

const ta = require('./TextAnalysis');

client.on("ready", () => {
  // Check if the table points exist
  //const profile = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'profile';").get();  
  //const channelMood = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'channelMood';").get();
  //const userMood = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'userMood';").get();
  /*
  // If "profile" does not exist add it
  if (!profile['id']) {
    sql.prepare("CREATE TABLE profile (id TEXT PRIMARY KEY, user TEXT, response_one TEXT," +
    "response_two TEXT, response_three TEXT, mood FLOAT, related TEXT, language TEXT);").run();
    // Ensure that the "id" row is always unique and indexed
    sql.prepare("CREATE UNIQUE INDEX idx_profile_id ON profile (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }

  // If "channelMood" does not exist add it
  if (!channelMood['id']) {
    // If the table is not there, create it and setup the database correctly
    sql.prepare("CREATE TABLE channelMood (id TEXT, mood FLOAT, time TEXT);").run();
    // Ensure that the "id" row is always unique and indexed
    //sql.prepare("CREATE UNIQUE INDEX idx_channelMood_id ON channelMood (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }

  // If "userMood" does not exist add it
  if (!userMood['id']) {
    // If the table is not there, create it and setup the database correctly
    sql.prepare("CREATE TABLE userMood (id TEXT, mood FLOAT, time TEXT);").run();
    // Ensure that the "id" row is always unique and indexed
    //sql.prepare("CREATE UNIQUE INDEX idx_userMood_id ON userMood (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }

  // Get and set the data for "profile"
  client.getProfile = sql.prepare("SELECT * FROM profile WHERE id = ?");
  client.setProfile = sql.prepare("INSERT OR REPLACE INTO profile (id, user, response_one, response_two," +
  "response_three, mood, related, language) VALUES (@id, @user, @response_one, @response_two, @response_three, @mood, @related, @language);");

  // Get and set the data for "channelMood"
  client.getChannelMood = sql.prepare("SELECT * FROM channelMood WHERE id = ?");
  client.setChannelMood = sql.prepare("INSERT OR REPLACE INTO channelMood (id, mood, time) VALUES (@id, @mood, @time);");

  // Get and set the data for "userMood"
  client.getUserMood = sql.prepare("SELECT * FROM userMood WHERE id = ?");
  client.setUserMood = sql.prepare("INSERT OR REPLACE INTO userMood (id, mood, time) VALUES (@id, @mood, @time);");
  */
});

client.on("message", (message) => {

  let prefix = config.prefix;

  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }

  if (message.content.slice(prefix.length).trim().split(/ +/g).length > 3) {
    if (!message.mentions) {
      if (message.content.length > 8) {
        // add a new row
      }
    }
  }
  /*
  if (message.content.startsWith(prefix + "updateUserMood")){

    let userMood = client.getUserMood.get(message.author.id);
    if(!userMood){
      userMood = {
        id: message.author.id,
        mood: 0,
        time: message.createdAt
      }
    }

    let args = message.content.slice(prefix.length).trim.split(/ + /g);
    userMood.mood = args[1];
    console.log(userMood.mood);
  }
  */
  //
  if (message.content.startsWith(prefix + 'profile')) {

    message.author.createDM().then((channel) => {

      channel.send("What is your favorite game?").then(() => {

        channel.awaitMessages(response => response.content, {
            max: 1,
            time: 20000,
            errors: ['time'],
          })
          .then((collected) => {
            //channel.send(collected.first().content);
            console.log(collected.first().content);
          })
          .catch(() => {
            channel.send("no message");
          })

      })

    });
  }

  if (message.content.startsWith(prefix + 'analyzetext') || message.content.startsWith(prefix + 'at')) {

    console.log(message.content);
    ta.analyzeSentence(message.content).then((result) => {
      message.reply(result);
    });
  }

});

export function login() {
  client.login(config.botToken);
}


//store messages in a sqlite database
//textanalysis can access database and process scripts