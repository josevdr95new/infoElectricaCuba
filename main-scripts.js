let ipData = null;
let timeInterval = null;
let latencyInterval = null;

async function fetchIpInfo(ip = '') {
    try {
        const response = await fetch(`https://freeipapi.com/api/json/${ip}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

function displayIpInfo(data) {
    const ipInfoDiv = document.getElementById('ip-info');
    if (!data) {
        ipInfoDiv.innerHTML = `<p style="color: red">Error al cargar los datos. Por favor, intente nuevamente.</p>`;
        return;
    }

    ipInfoDiv.innerHTML = `
        <h2>Datos de su conexión:</h2>
        <div class="info-grid">
            <div class="info-item" onclick="copyToClipboard(this)">📍 IP: ${data.ipAddress}</div>
            <div class="info-item" onclick="copyToClipboard(this)">🌍 País: ${data.countryName} (${data.countryCode})</div>
            <div class="info-item" onclick="copyToClipboard(this)">🏢 Ciudad: ${data.cityName}</div>
            <div class="info-item" onclick="copyToClipboard(this)">🌐 Región: ${data.regionName}</div>
            <div class="info-item" onclick="copyToClipboard(this)">🌍 Continente: ${data.continentCode}</div>
            <div class="info-item" onclick="copyToClipboard(this)">📍 Latitud: ${data.latitude}</div>
            <div class="info-item" onclick="copyToClipboard(this)">📍 Longitud: ${data.longitude}</div>
            <div class="info-item" onclick="copyToClipboard(this)">⏰ Zona Horaria: ${data.timeZone}</div>
            <div class="info-item" onclick="copyToClipboard(this)">🔒 Código Postal: ${data.zipCode}</div>
            <div class="info-item" onclick="copyToClipboard(this)">📱 Código País: ${data.countryCode}</div>
            <div class="info-item" onclick="copyToClipboard(this)">💱 Código Moneda: ${data.currency.code}</div>
            <div class="info-item" onclick="copyToClipboard(this)">🌐 Idiomas: ${data.language}</div>
        </div>
    `;
    
    checkNetworkStatus();
}

function showLocation() {
    if (!ipData) return;
    
    const mapContainer = document.getElementById('map-container');
    mapContainer.style.display = 'block';
    
    mapContainer.innerHTML = `
        <iframe
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=${ipData.longitude-0.1},${ipData.latitude-0.1},${ipData.longitude+0.1},${ipData.latitude+0.1}&layer=mapnik&marker=${ipData.latitude},${ipData.longitude}"
            loading="lazy"
        ></iframe>
    `;
}

function toggleTime() {
    const timeDiv = document.getElementById('current-time');
    if (timeDiv.style.display === 'none' || timeDiv.style.display === '') {
        timeDiv.style.display = 'block';
        updateTime();
        timeInterval = setInterval(updateTime, 1000);
    } else {
        timeDiv.style.display = 'none';
        if (timeInterval) clearInterval(timeInterval);
    }
}

function updateTime() {
    if (!ipData || !ipData.timeZone) return;
    
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('es-ES', {
        timeZone: ipData.timeZone,
        dateStyle: 'full',
        timeStyle: 'long'
    });
    
    document.getElementById('current-time').innerHTML = `
        <strong>Hora local en ${ipData.cityName}:</strong><br>
        ${formatter.format(now)}
    `;
}

function refreshDataAndScroll() {
    refreshData();
    scrollToElement('ip-info');
}

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
}

async function refreshData() {
    const ipInfoDiv = document.getElementById('ip-info');
    ipInfoDiv.innerHTML = '<div class="loader"></div><p>Cargando información...</p>';
    
    ipData = await fetchIpInfo();
    displayIpInfo(ipData);
    showLocation(); // Actualizar el mapa
}

function showLocationAndScroll() {
    showLocation();
    scrollToElement('map-container');
}

function toggleTimeAndScroll() {
    toggleTime();
    scrollToElement('current-time');
}

function checkNetworkStatus() {
    const networkStatus = document.getElementById('network-status');
    if (navigator.onLine) {
        networkStatus.innerHTML = `
            <div class="status-indicator online">
                🟢 Conectado a Internet
            </div>
        `;
        startLatencyCheck();
    } else {
        networkStatus.innerHTML = `
            <div class="status-indicator offline">
                🔴 Sin conexión a Internet
            </div>
        `;
        stopLatencyCheck();
    }
}

function startLatencyCheck() {
    if (latencyInterval) return;
    
    latencyInterval = setInterval(() => {
        const start = Date.now();
        fetch('https://www.google.com', { method: 'HEAD', mode: 'no-cors' })
            .then(() => {
                const latency = Date.now() - start;
                const networkStatus = document.getElementById('network-status');
                networkStatus.innerHTML = `
                    <div class="status-indicator online">
                        🟢 Conectado a Internet (Latencia: ${latency} ms)
                    </div>
                `;
            })
            .catch(() => {
                const networkStatus = document.getElementById('network-status');
                networkStatus.innerHTML = `
                    <div class="status-indicator offline">
                        🔴 Sin conexión a Internet
                    </div>
                `;
            });
    }, 5000); // Verificar cada 5 segundos
}

function stopLatencyCheck() {
    if (latencyInterval) {
        clearInterval(latencyInterval);
        latencyInterval = null;
    }
}

window.onscroll = function() {
    const scrollBtn = document.querySelector('.scroll-top');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollBtn.style.display = 'flex';
    } else {
        scrollBtn.style.display = 'none';
    }
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add event listeners for network status
window.addEventListener('online', checkNetworkStatus);
window.addEventListener('offline', checkNetworkStatus);

// Cargar datos al iniciar
window.onload = refreshData;

// Función para buscar una IP específica
async function searchIp() {
    const ipInput = document.getElementById('ip-input').value.trim();
    if (ipInput) {
        const ipInfoDiv = document.getElementById('ip-info');
        ipInfoDiv.innerHTML = '<div class="loader"></div><p>Cargando información...</p>';
        
        ipData = await fetchIpInfo(ipInput);
        displayIpInfo(ipData);
        showLocation(); // Actualizar el mapa
        
        if (ipData) {
            showNotification('success', 'Información de IP cargada con éxito.');
        } else {
            showNotification('error', 'Error al cargar la información de IP.');
        }
    } else {
        showNotification('error', 'Por favor, ingrese una dirección IP válida.');
    }
}

// Función para mostrar notificaciones
function showNotification(type, message) {
    const notifications = document.getElementById('notifications');
    notifications.innerHTML = ''; // Limpiar notificaciones anteriores
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notifications.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Función para realizar un test de velocidad y latencia
function performSpeedTest() {
    const speedTestUrl = 'https://fast.com/';
    const intentUrl = `intent://${speedTestUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
    window.location.href = intentUrl;
}

// Añadir evento al botón de test de velocidad
document.getElementById('speed-test-button').addEventListener('click', performSpeedTest);

// Función para copiar al portapapeles y notificar al usuario
function copyToClipboard(element) {
    const text = element.textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
        showNotification('success', 'Copiado al portapapeles: ' + text);
    }).catch((error) => {
        console.error('Error al copiar al portapapeles:', error);
        showNotification('error', 'Error al copiar al portapapeles.');
    });
}