function Send()
{
    document.getElementById("sent").innerHTML = "Gönderildi!"

};

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("zoomable")) {
    e.target.classList.toggle("zoomed");
    }
  });
document.querySelectorAll(".scale").forEach(scale => {
  const buttons = scale.querySelectorAll(".btn");

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const value = index + 1;
      scale.dataset.value = value;
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Sent yoksa patlama
  setTimeout(() => {
    const sent = document.getElementById("sent");
    if (sent) sent.classList.add("fade-out");
  }, 2000);

  const scoreMap = {
    "green": 3,
    "light-green": 2,
    "mid-green": 1,
    "mid": 0,
    "mid-red": -1,
    "light-red": -2,
    "red": -3
  };

  // Her likert satırını yönet
  document.querySelectorAll(".likert").forEach(row => {
    const btns = row.querySelectorAll(".btn");

    btns.forEach(btn => {
      // Bu buton hangi renk? ona göre skor ata
      const colorClass = [...btn.classList].find(c => scoreMap[c] !== undefined);
      btn.dataset.score = (colorClass ? scoreMap[colorClass] : 0);

      btn.addEventListener("click", () => {
        btns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  });

  function calcPageScore() {
    let total = 0;
    document.querySelectorAll(".likert").forEach(row => {
      const selected = row.querySelector(".btn.active");
      if (selected) total += Number(selected.dataset.score || 0);
    });
    return total;
  }

  function saveThisPage() {
    const total = calcPageScore();
    localStorage.setItem(pageKey, String(total));
    console.log("Saved", pageKey, "=", total);
  }

  const nextBtn = document.querySelector(".continue");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      saveThisPage();
    });
  }
});
