<p align="center">
    <a href="https://github.com/DSCKGEC/community-discord-bot">
        <img src="https://user-images.githubusercontent.com/52620158/94632433-20269600-02e8-11eb-80b9-0a444289bd20.png" alt="Discord Bot">
    </a>
</p>

<p align="center">
  <a href="https://hacktoberfest.digitalocean.com/"><img src="https://img.shields.io/badge/Hacktoberfest-Friendly-blueviolet?style=for-the-badge" alt="HacktoberFest"></a>
  <a href="https://github.com/DSCKGEC/community-discord-bot/pulls"><img src="https://img.shields.io/github/issues-pr/DSCKGEC/community-discord-bot?label=Pull%20Requests&style=for-the-badge"></a>
  <a href="https://github.com/DSCKGEC/community-discord-bot/contributors"><img src="https://img.shields.io/github/contributors/DSCKGEC/community-discord-bot?color=yellow&style=for-the-badge" alt="contributors"></a>
</p>

## Introduction

This project is about bringing a discord bot to maintain our community server.

### Commands and Functionalities active

- [x] **New User Welcome** to automatically sends a welcome message on a system channel
- [x] **Auto Role Giver** to automatically assigns a role to a user based on his emoji reaction to the get-domain-named-role message (ID - `755800896478117968`)
- [x] **!add-event** is admin-only command that creates a new event announcement post via interactive questionnaire about the event.
- [x] **!scrape** scrapes [Google Developers](https://developers.google.com/events) website for latest event
- [x] **!help** shows info about the bot
- [x] **!ping** to check whether bot is live

### Commands & Functionalities needed

- Web Scraping:
  - [ ] Community websites like [Google Developers](https://developers.google.com/events) and updating about any events or happenings(mentioned site is done). Contributors from other DSCs may add their own websites!
  - [ ] Domain related websites like [clist.by](https://clist.by) for competitive programming, [Kaggle](https://www.kaggle.com/competitions) for AI, etcetera.
- Server duties:<br>
  - [ ] Role Booster: In our discord server, we have roles that are periodically awarded to the members who have high activity or contributions towards the community. A command !boost @user is required which would add the role with ID - `755165816340611182`to the mentioned user. This command is to be admin specific like the !add-event command
  - [ ] Inquire New Users: Every new user who joins the server is to be asked for his name and college via DM and given a role with ID - `760660088582438967` if the college name is KGEC / Kalyani Government Engineering College
- Others:
  - [ ] Other basic interaction commands as deemed worthy of addition by you!
  
### Stack
Discord.js - JavaScript

### Contributing
This is an open source project and allows anyone to add to the codebase. If you are from a DSC community other than KGEC, we recommend you to add scraper functionalities to your community events so that we can partake in, expand our network and grow together.
Though web scraping is identified globally, some websites may have private pages or might have blocked web crawlers. Make sure you **do not** explicitly try to scrape data from those sites.

### LICENSE
The current project is under the MIT License. View [LICENSE](https://github.com/DSCKGEC/community-discord-bot/blob/master/LICENSE) for more details
