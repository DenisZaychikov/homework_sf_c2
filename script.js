let btnCat = document.querySelector(".cats");
let progressCat = document.querySelector(".progresscats");
let textCat = document.querySelector(".textcats");

let btnDog = document.querySelector(".dogs");
let progressDog = document.querySelector(".progressdogs");
let textDog = document.querySelector(".textdogs");

let btnParrot = document.querySelector(".parrots");
let progressParrot = document.querySelector(".progressparrots");
let textParrot = document.querySelector(".textparrots");

btnCat.onclick = function() {
    let response = fetch("https://sf-pyw.mosyag.in/sse/vote/cats", {method: "POST"})
    console.log(response)
}

btnDog.onclick = function() {
    let response = fetch("https://sf-pyw.mosyag.in/sse/vote/dogs", {method: "POST"})
    console.log(response)
}

btnParrot.onclick = function() {
    let response = fetch("https://sf-pyw.mosyag.in/sse/vote/parrots", {method: "POST"})
    console.log(response)
}

const header = new Headers({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*"
});

const url = new URL('https://sf-pyw.mosyag.in/sse/vote/stats');
let es = new EventSource(url,header);
es.onmessage = function(event) {
    voteData = JSON.parse(event.data)
    
    let valuecats = voteData.cats * 100 / (voteData.cats + voteData.dogs + voteData.parrots);
    progressCat.style.cssText = `width: ${valuecats}%`
    textCat.innerHTML = String(Math.round(valuecats)) + "%"

    let valuedogs = voteData.dogs * 100 / (voteData.cats + voteData.dogs + voteData.parrots);
    progressDog.style.cssText = `width: ${valuedogs}%`
    textDog.innerHTML = String(Math.round(valuedogs)) + "%"

    let valueparrots = voteData.parrots * 100 / (voteData.cats + voteData.dogs + voteData.parrots);
    progressParrot.style.cssText = `width: ${valueparrots}%`
    textParrot.innerHTML = String(Math.round(valueparrots)) + "%"
}