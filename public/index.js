document.querySelector("button").addEventListener("click", send);

function send() {
  getMessage();
  var data = JSON.stringify({
    message: "tse"
  });
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8090/cpu");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.send(data);
  console.log("отправлено");
}

function getMessage() {
  var xhr = new XMLHttpRequest();
  xhr.open("get", "/cpu");
  xhr.onload = function() {
    var json = [];
    json = JSON.parse(this.responseText);
    console.log(json);
    let body = document.querySelector(".content");
    body.innerHTML = "";
    json.forEach(element => {
      var p = document.createElement("p");
      p.innerHTML = JSON.stringify(element)
      body.appendChild(p);
    });
    // getMessage();
  };
  xhr.send();
}
