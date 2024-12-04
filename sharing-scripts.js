// sharing-scripts.js
document.getElementById('share-whatsapp-button').addEventListener('click', () => {
    const text = encodeURIComponent('Visita InfoIP Explorer en https://www.apklis.cu/applications?search=InfoIPExplorer');
    const whatsappIntentUrl = `intent://send?text=${text}#Intent;scheme=whatsapp;package=com.whatsapp;end`;
    window.location.href = whatsappIntentUrl;
});

document.getElementById('send-email-button').addEventListener('click', () => {
    const emailIntent = "intent://send?to=josevdr95@gmail.com#Intent;scheme=mailto;package=com.google.android.gm;end";
    window.location.href = emailIntent;
});