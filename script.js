chrome.storage.local.get(["key", "explanation", "title"], function (result) {
  if (result.title) {
    var img = new Image();
    img.src = result.key;
    var all = document.getElementsByClassName("bgimg-1");
    for (var i = 0; i < all.length; i++) {
      all[i].style.backgroundImage = "url('" + img.src + "')";
    }
    tooltip = document.getElementById("tooltip");
    tooltip.textContent = result.explanation;
    title = document.getElementById("title");
    title.textContent = result.title;
  } else {
    var all = document.getElementsByClassName("bgimg-1");
    for (var i = 0; i < all.length; i++) {
      all[i].style.backgroundImage = "url('src/back.jpg')";
    }
    title = document.getElementById("title");
    title.textContent = "NGC 2174: Emission Nebula in Orion";
  }
});

chrome.extension.sendRequest({ message: "Begin load" });
