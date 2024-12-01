document.getElementById("convert-mp3").addEventListener("click", () => convert("mp3"));
document.getElementById("convert-mp4").addEventListener("click", () => convert("mp4"));

function convert(format) {
  const url = document.getElementById("video-url").value;
  const output = document.getElementById("output");

  if (!url) {
    output.innerHTML = "<p>Please enter a valid URL!</p>";
    return;
  }

  fetch("http://localhost:5000/api/convert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, format }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        output.innerHTML = `<a href="${data.downloadLink}" target="_blank">Download ${format.toUpperCase()}</a>`;
      } else {
        output.innerHTML = `<p>Error: ${data.message}</p>`;
      }
    })
    .catch((err) => {
      console.error(err);
      output.innerHTML = "<p>Something went wrong!</p>";
    });
}
