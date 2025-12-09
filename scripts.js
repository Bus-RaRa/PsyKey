function Send()
{
    document.getElementById("sent").innerHTML = "Gönderildi!"

}
setTimeout(() => {
  document.getElementById("sent").classList.add("fade-out");
}, 2000);

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("zoomable")) {
    e.target.classList.toggle("zoomed");
    }
  });
