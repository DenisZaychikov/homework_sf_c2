let btn = document.querySelector(".cats");

btn.onclick = function() {
    let response = fetch("http://127.0.0.1:8080/sse/vote/cats", {
        method: "POST"
    })
}
