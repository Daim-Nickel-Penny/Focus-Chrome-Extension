async function getBase64ImageFromURl(imageUrl) {
  var image_url = BASE_URL + imageUrl;
  var res = await fetch(image_url);
  var blob = await res.blob();

  return new Promise((resolve, reject) => {
    var reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        resolve(reader.result);
      },
      false
    );

    reader.onerror = () => {
      return reject(this);
    };

    reader.readAsDataURL(blob);
  });
}

function processnewLoad() {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((data) => {
      img_url = data.hdurl;
      chrome.storage.local.get(["title"], function (result) {
        if (img_url && data.title !== result.title) {
          getBase64ImageFromURl(img_url)
            .then(
              (result) => {
                chrome.storage.local.set(
                  {
                    key: result,
                  },
                  function () {}
                );
                chrome.storage.local.set(
                  {
                    title: data.title,
                  },
                  function () {}
                );
              },
              data.title,
              data.explanation
            )
            .catch((err) => console.error(err));
        }
      });
    });
}

chrome.extension.onRequest.addListener(function (request, sender) {
  processnewLoad();
});
