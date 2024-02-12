chrome.webNavigation.onCompleted.addListener((details) => {
    const url = details.url;
    const domains = [
    "leetcode.com", 
    "github.com", 
    "stackoverflow.com", 
    "hackerrank.com", 
    "codeforces.com", 
    "topcoder.com",
]; 
  
    for (const domain of domains) {
      if (url.includes(domain)) {
        const TOKEN = ""; // Replace with your token
        const INSTANCE_ID = ""; // Replace with your instance ID
        const phoneNumber = ""; // Replace with recipient's phone number
        
        chrome.tabs.get(details.tabId, function(tab) {
          const tabTitle = tab.title;
          const message = `Sanjana visited ${domain} and is on ${tabTitle} (${url})`;
  
          const data = `token=${TOKEN}&to=${phoneNumber}&body=${encodeURIComponent(message)}`;
  
          const xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
  
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
              console.log(this.responseText);
            }
          });
  
          xhr.open("POST", `https://api.ultramsg.com/${INSTANCE_ID}/messages/chat`);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.send(data);
        });
        break;
      }
    }
});
