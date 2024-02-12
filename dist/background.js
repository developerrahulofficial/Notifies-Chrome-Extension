"use strict";
chrome.webNavigation.onCompleted.addListener((details) => {
    const url = details.url;
    const domains = ["leetcode.com", "github.com"]; // List of domains to monitor
    for (const domain of domains) {
        if (url.includes(domain)) {
            const TOKEN = "gkbjcoa5by6b5l99"; // Replace with your token
            const INSTANCE_ID = "instance77710"; // Replace with your instance ID
            const phoneNumber = "+917042775082"; // Replace with recipient's phone number
            chrome.tabs.get(details.tabId, function (tab) {
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
