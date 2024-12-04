let ipData = null;
let timeInterval = null;

const descriptions = {
    'ip': 'Dirección IP única que identifica tu dispositivo en Internet',
    'country_name': 'País donde se encuentra tu conexión actual',
    'city': 'Ciudad desde donde te estás conectando',
    'region': 'Región o estado dentro del país',
    'continent_code': 'Código del continente donde te encuentras',
    'org': 'Proveedor de servicios de Internet (ISP)',
    'latitude': 'Coordenada geográfica que indica la posición norte-sur',
    'longitude': 'Coordenada geográfica que indica la posición este-oeste',
    'timezone': 'Zona horaria de tu ubicación actual',
    'asn': 'Número de Sistema Autónomo, identifica la red de tu proveedor',
    'postal': 'Código postal aproximado de tu ubicación',
    'country_calling_code': 'Código telefónico internacional de tu país',
    'currency_name': 'Nombre de la moneda oficial en tu ubicación',
    'currency': 'Código de la moneda utilizada en tu país',
    'languages': 'Idiomas oficiales hablados en tu ubicación'
};

async function fetchIpInfo() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

function showTooltip(event, key) {
    const tooltip = document.getElementById('tooltip');
    tooltip.innerHTML = descriptions[key] || 'Información no disponible';
    tooltip.style.display = 'block';
    tooltip.style.left = (event.pageX + 10) + 'px';
    tooltip.style.top = (event.pageY + 10) + 'px';
}

function hideTooltip() {
    document.getElementById('tooltip').style.display = 'none';
}

function displayIpInfo(data) {
    const ipInfoDiv = document.getElementById('ip-info');
    if (!data) {
        ipInfoDiv.innerHTML = `
            <p style="color: red">Error al cargar los datos. Por favor, intente nuevamente.</p>
        `;
        return;
    }

    ipInfoDiv.innerHTML = `
        <h2>Datos de su conexión:</h2>
        <div class="info-grid">
            <div class="info-item" onclick="showTooltip(event, 'ip')">📍 IP: ${data.ip}</div>
            <div class="info-item" onclick="showTooltip(event, 'country_name')">🌍 País: ${data.country_name} (${data.country})</div>
            <div class="info-item" onclick="showTooltip(event, 'city')">🏢 Ciudad: ${data.city}</div>
            <div class="info-item" onclick="showTooltip(event, 'region')">🌐 Región: ${data.region}</div>
            <div class="info-item" onclick="showTooltip(event, 'continent_code')">🌍 Continente: ${data.continent_code}</div>
            <div class="info-item" onclick="showTooltip(event, 'org')">🏢 Organización: ${data.org}</div>
            <div class="info-item" onclick="showTooltip(event, 'latitude')">📍 Latitud: ${data.latitude}</div>
            <div class="info-item" onclick="showTooltip(event, 'longitude')">📍 Longitud: ${data.longitude}</div>
            <div class="info-item" onclick="showTooltip(event, 'timezone')">⏰ Zona Horaria: ${data.timezone}</div>
            <div class="info-item" onclick="showTooltip(event, 'asn')">🌐 ASN: ${data.asn}</div>
            <div class="info-item" onclick="showTooltip(event, 'postal')">🔒 Código Postal: ${data.postal}</div>
            <div class="info-item" onclick="showTooltip(event, 'country_calling_code')">📱 Código País: ${data.country_calling_code}</div>
            <div class="info-item" onclick="showTooltip(event, 'currency_name')">💰 Moneda: ${data.currency_name}</div>
            <div class="info-item" onclick="showTooltip(event, 'currency')">💱 Código Moneda: ${data.currency}</div>
            <div class="info-item" onclick="showTooltip(event, 'languages')">🌐 Idiomas: ${data.languages}</div>
        </div>
    `;
    
    checkNetworkStatus();
}

function showLocation() {
    if (!ipData) return;
    
    const mapContainer = document.getElementById('map-container');
    mapContainer.style.display = 'block';
    
    // Using OpenStreetMap embed
    mapContainer.innerHTML = `
        <iframe
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=${ipData.longitude-0.1},${ipData.latitude-0.1},${ipData.longitude+0.1},${ipData.latitude+0.1}&layer=mapnik&marker=${ipData.latitude},${ipData.longitude}"
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
    if (!ipData || !ipData.timezone) return;
    
    const now = new Date().toLocaleString('es-ES', {
        timeZone: ipData.timezone,
        dateStyle: 'full',
        timeStyle: 'long'
    });
    
    document.getElementById('current-time').innerHTML = `
        <strong>Hora local en ${ipData.city}:</strong><br>
        ${now}
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
    } else {
        networkStatus.innerHTML = `
            <div class="status-indicator offline">
                🔴 Sin conexión a Internet
            </div>
        `;
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