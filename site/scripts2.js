document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Sayfanın yenilenmesini engeller

    const form = event.target;
    const sentMessage = document.getElementById("sent");
    const submitBtn = document.getElementById("submit-btn");

    submitBtn.disabled = true;
    sentMessage.innerText = "Gönderiliyor...";
    sentMessage.style.color = "#555";

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            sentMessage.innerText = "Mesajınız başarıyla iletildi!";
            sentMessage.style.color = "green";
            form.reset(); // Form alanlarını temizler
        } else {
            sentMessage.innerText = "Bir sorun oluştu, lütfen tekrar deneyin.";
            sentMessage.style.color = "red";
        }
    } catch (error) {
        sentMessage.innerText = "Bağlantı hatası oluştu.";
        sentMessage.style.color = "red";
    } finally {
        submitBtn.disabled = false;
    }
});