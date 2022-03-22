# glasto-bot

This is a proxy fork of the glasto helper. It will launch a new instance with the proxy.

To get the proxy set up you can use https://scrapoxy.readthedocs.io/en/master/quick_start/index.html. 

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

