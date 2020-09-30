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

1. Automatically send a welcome message on a system channel whenever a new user joins
2. Automatically assign a role to a user based on his emoji reaction to a global message
3. !add-event - admin-only command that creates a new event announcement post via interactive questionnaire about the event.
4. !scrape - scrapes [events - google developers](https://developers.google.com/events) website for latest event
5. !help - shows info about the bot
6. !ping to check whether bot is live

### Commands & Functionalities needed

1. Web Scraping:
  - Community websites like [events - google developers](https://developers.google.com/events) and updating about any events or happenings(mentioned site is done). Contributors from other DSCs may add their own websites!
  - Domain related websites like [clist.by](https://clist.by) for competitive programming, [Kaggle](https://www.kaggle.com/competitions) for AI, etcetera.
2. Server duties:<br>
  - Role Booster: In our discord server, we have roles that are periodically awarded to the members who have high activity or contributions towards the community. A command !boost @user is required which would add the role with ID - `755165816340611182`to the mentioned user. This command is to be admin specific like the !add-event command
  - Inquire New Users: Every new user who joins the server is to be asked for his name and college via DM and given a role with ID - `760660088582438967` if the college name is KGEC / Kalyani Government Engineering College
3. Misc:
  - Other commands that you think might be helpful!
  
### Stack
Discord.js - JavaScript

### Contributing
This is an open source project and allows anyone to add to the codebase. If you are from a DSC community other than KGEC, we recommend you to add scraper functionalities to your community events so that we can partake in, expand our network and grow together.
Though web scraping is identified globally, some websites may have private pages or might have blocked web crawlers. Make sure you **do not** explicitly try to scrape data from those sites.

### LICENSE
The current project is under the MIT License. View [LICENSE](https://github.com/DSCKGEC/community-discord-bot/blob/master/LICENSE) for more details
