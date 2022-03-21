# glasto-bot

This is a proxy fork of the glasto helper. It will launch a new instance with the proxy.

To get the proxy set up you can use https://scrapoxy.readthedocs.io/en/master/quick_start/index.html. 

Some other small edits made like keep refreshing on other tabs till 5 are found, removing css, images, fonts to make loading times faster and made the refresh rate per page rather than overall. I'd like the refresh rate to be per IP but I launch 64 instances on aws and then 64 tabs so each proxy is only used once.

I did not get glasto tickets. Shite wan. 
Ran the bot on thursday coach tickets. Kept crashing when pages timed out. Still, got through. Entered reg but couldn't pick any bus tickets due to some error about not selecting the right number, seemed to happen to a lot of people on twitter. 
Fixed the errors and made a few good improvements over the weekend. Ran on two laptops then on Sunday. Got through on both. Froze up after submitting payment. Seemed to be a common problem on twitter once again. Waited til the 10 mins on ticket lock was over and submitted on the other page. Was too late however. Sold out. 

---
This app launches chrome via puppeteer. It opens a number of browsers set by the user. It will then iterate through each browser and load the set URL in a tab. It will only begin loading the page on the next browser tab when a certain amount of time has passed so it does not surpass the set rate limit (60 a minute on glastonbury site). 

After each page has loads it calculates a similarity rating by comparing the text on the loaded page to the text in ```resources/live.txt``` . It is using the inner text of all elements within the body of the returned page. The browser will then automatically switch to the tab with the highest similarity rating. This tab will not be reloaded until another tab beats its similarity rating.

You can pause by pressing the enter key on the command line. It should automatically stop when the reg page loads.

```--site``` : URL

```--rate-limit``` : rate limit per minute

```--max-tabs``` : the number of tabs to use. The more the better. A tab will reload after the iteration of loading tabs has looped back around to it. So more tabs means more time for a page to load. 

```--test``` : Will use ```resources/test.txt``` for comparison. For use with test site. 


## To run
```
npm i
```
Example run command:
```
node main.js --site="https://glastonbury.seetickets.com" --rate-limit=55 --max-tabs=15
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



### What next?
Scalability. How could this scale? It's currently close to maxing out the potential for one device. Not sure how to do this. I think being able to deploy to a few instances, they would need to use a VPN to avoid the IP being identified as being in the cloud providers IP range. Would need some way to get the most similar tab back to the user so details could be entered. Feeding back results and allowing use to select a tab, then tunnel the port back to the user app. Complex. Pass the session and vpn used back? How could this be done simpler? Is it ethical to scale?
