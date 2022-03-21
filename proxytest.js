var proxyLoader = require("simple-proxies/lib/proxyfileloader");
var request = require("request");
 
// Change the config if you want to use a specific txt file
// This is not necessary if you plan to use proxies.txt on the current folder
var config = proxyLoader.config().setProxyFile("yourfile.txt");
 
proxyLoader.loadProxyFile(config, function(error, proxyList) {
  if (error) {
    console.log(error);
  }
  else {
     // Make a request with one proxy
     request.get({
         uri:'http://www.google.com',
         proxy : proxyList.getProxy().getUrl()
     });
  }
 
});