# glasto-bot

Glasto-helper was made by jackohara to help users get Glastonbury Festival tickets, it will launch as many seperate, temporary instances as you specify with the tabs command. Each tab uses a different proxy so can be refreshed upto 55 times a second. With digital ocean and amazon web services you can have a total of 210 proxies using scraproxy, thus allowing 210 tabs if your pc/server has enough horsepower to open that many tabs and still be fast. This means there is a theoretical 11550 requests a min, more can be added with more cloud server providers that have an api for scaling. A powerful windows server can be rented for half an hour to run this for cheap if none has a decent pc.

This has worked for me and I've got though 5 times after a few mins. I don't know if this was luck/not as many people trying for resale or, it actually worked, but I got in before my friends.

---

This is a proxy fork of the glasto helper. It will launch a new instance with the proxy. 

To get the proxy set up you can use https://scrapoxy.readthedocs.io/en/master/quick_start/index.html. 

To add your registration info edit line 60 in main.js.

Some other small edits made like keep refreshing on other tabs till 5 are found, removing css, images, fonts to make loading times faster and made the refresh rate per page rather than overall. I'd like the refresh rate to be per IP but I launch 64 instances on aws and then 64 tabs so each proxy is only used once.

---
This app launches chrome via puppeteer. It opens a number of browsers set by the user. It will then iterate through each browser and load the set URL in a tab. It will only begin loading the page on the next browser tab when a certain amount of time has passed so it does not surpass the set rate limit (60 a minute on glastonbury site). 

After each page has loads it calculates a similarity rating by comparing the text on the loaded page to the text in ```resources/live.txt``` . It is using the inner text of all elements within the body of the returned page. The browser will then automatically switch to the tab with the highest similarity rating. This tab will not be reloaded until another tab beats its similarity rating.

You can pause by pressing the enter key on the command line. It should automatically stop when the reg page loads.

```--site``` : URL

```--rate-limit``` : rate limit per minute

```--max-tabs``` : the number of tabs to use. The more the better. A tab will reload after the iteration of loading tabs has looped back around to it. So more tabs means more time for a page to load. 

```--test``` : Will use ```resources/test.txt``` for comparison. For use with test site. 

```--proxy``` : false or true, proxy ip and port are hard coded. line 242.

## To run
```
npm i
```
Example run command:
```
node main.js --site="https://glastonbury.seetickets.com/content/extras" --rate-limit=55 --max-tabs=3 --proxy=false \\ no proxy
node main.js --site="https://glastonbury.seetickets.com/content/extras" --rate-limit=55 --max-tabs=3 --proxy=true \\ proxy
```
## Testing
Test site from https://github.com/thomasms/testsites
```
cd test_site
npm start
```

Add test flag in run command:
```
node main.js --site="localhost:3000" --rate-limit=55 --max-tabs=15 --test
```

When it loads the 20th page it pretends it is in. Runs on localhost:3000

