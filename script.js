let bakiye = 100;
let mevcutDerece = 0;

function bahisYap(secilenRenk) {
    const bahisInput = document.getElementById("bahisMiktari");
    const puanGösterge = document.getElementById("puan");
    const cark = document.getElementById("rulet-carki");
    const mesaj = document.getElementById("mesaj");
    const butonlar = document.querySelectorAll("button");

    let miktar = Number(bahisInput.value);

    // Bakiye Kontrolü
    if (miktar > bakiye) {
        mesaj.innerHTML = "⚠️ Yetersiz bakiye!";
        mesaj.style.color = "#c0392b";
        return;
    }
    if (miktar <= 0 || isNaN(miktar)) {
        mesaj.innerHTML = "⚠️ Geçerli bir miktar girin!";
        mesaj.style.color = "#f1c40f";
        return;
    }

    // Oyunu Başlat
    bakiye -= miktar;
    puanGösterge.innerHTML = bakiye;
    butonlar.forEach(btn => btn.disabled = true);
    mesaj.innerHTML = "🎲 Top dönüyor...";
    mesaj.style.color = "#aaa";

    // Dönüş Animasyonu (5 tam tur + rastgele açı)
    const rastgeleDonus = Math.floor(Math.random() * 360);
    mevcutDerece += 1800 + rastgeleDonus; 
    cark.style.transform = `rotate(${mevcutDerece}deg)`;

    // Sonuç Hesaplama (4 saniye sonra)
    setTimeout(() => {
        const renkHavuzu = ["yesil", "kirmizi", "siyah", "kirmizi", "siyah", "kirmizi", "siyah", "kirmizi", "siyah", "kirmizi", "siyah"];
        const kazanan = renkHavuzu[Math.floor(Math.random() * renkHavuzu.length)];

        if (secilenRenk === kazanan) {
            let carpan = (kazanan === "yesil") ? 35 : 2;
            let kazanc = miktar * carpan;
            bakiye += kazanc;
            mesaj.innerHTML = `🎉 TEBRİKLER! ${kazanan.toUpperCase()} GELDİ! +${kazanc}`;
            mesaj.style.color = "#27ae60";
        } else {
            mesaj.innerHTML = `💀 KAYBETTİN! Sonuç: ${kazanan.toUpperCase()}`;
            mesaj.style.color = "#c0392b";
        }

        puanGösterge.innerHTML = bakiye;

        if (bakiye <= 0) {
            mesaj.innerHTML = "💸 İFLAS ETTİN! Sayfayı yenile.";
        } else {
            butonlar.forEach(btn => btn.disabled = false);
        }
    }, 4000);
}
