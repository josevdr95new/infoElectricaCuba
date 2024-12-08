let ipData = null;
let timeInterval = null;
let latencyInterval = null;
let requestCount = 0; // Contador de solicitudes
let requestTimer = null; // Temporizador para reiniciar el contador

async function fetchIpInfo(ip = '') {
    try {
        const response = await fetch(`https://freeipapi.com/api/json/${ip}`);
        const data = await response.json();
        console.log('Datos obtenidos de la API de IP:', data); // Imprimir datos en la consola
        return data;
    } catch (error) {
        console.error('Error al obtener datos de la API de IP:', error);
        return null;
    }
}

async function fetchTimeZoneAndTime(latitude, longitude) {
    const apiKey = 'J51CL2CC6I45'; // Asegúrate de que esta clave sea válida
    const apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('Datos obtenidos de la API de Zona Horaria:', data); // Imprimir datos en la consola
        return data;
    } catch (error) {
        console.error('Error al obtener datos de la API de Zona Horaria:', error);
        return null;
    }
}

function displayIpInfo(data, timeZoneData) {
    const ipInfoDiv = document.getElementById('ip-info');
    if (!data) {
        ipInfoDiv.innerHTML = `<p style="color: red">Error al cargar los datos. Por favor, intente nuevamente.</p>`;
        return;
    }

    ipInfoDiv.innerHTML = `
        <h2>Datos de su conexión:</h2>
        <div class="info-grid">
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-network-wired"></i> IP: ${data.ipAddress}</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-globe-americas"></i> País: ${data.countryName} (${data.countryCode})</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-city"></i> Ciudad: ${data.cityName}</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-map-marker-alt"></i> Región: ${data.regionName}</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-globe"></i> Continente: ${data.continentCode}</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-map-marker"></i> Latitud: ${data.latitude}</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-map-marker"></i> Longitud: ${data.longitude}</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-map-pin"></i> Código Postal: ${data.zipCode}</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-flag"></i> Código País: ${data.countryCode}</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-coins"></i> Código Moneda: ${data.currency.code}</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-coins"></i> Nombre Moneda: ${data.currency.name}</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-language"></i> Idiomas: ${data.language}</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-globe"></i> TLDs: ${data.tlds.join(', ')}</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-shield-alt"></i> Proxy: ${data.isProxy ? 'Sí' : 'No'}</div>
        </div>
        <h2>Información de Zona Horaria:</h2>
        <div class="info-grid">
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-clock"></i> Zona Horaria: ${timeZoneData.zoneName}</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-clock"></i> Abreviatura: ${timeZoneData.abbreviation}</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-clock"></i> GMT Offset: ${timeZoneData.gmtOffset}</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-clock"></i> DST: ${timeZoneData.dst}</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-clock"></i> Hora Actual: ${timeZoneData.formatted}</div>
            <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-clock"></i> Tipo de UTC: ${timeZoneData.gmtOffset >= 0 ? 'UTC+' : 'UTC'}${timeZoneData.gmtOffset / 3600}</div>
        </div>
    `;

    checkNetworkStatus();
    updateCurrentTime(timeZoneData.zoneName);
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

function updateCurrentTime(zoneName) {
    const currentTimeDiv = document.getElementById('current-time');
    if (!zoneName) {
        currentTimeDiv.innerHTML = '<p>Zona horaria no disponible.</p>';
        return;
    }

    const updateTime = () => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('es-ES', {
            timeZone: zoneName,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        const formattedTime = formatter.format(now);
        currentTimeDiv.innerHTML = `
            <strong>Hora local en ${ipData.cityName}:</strong>
            <span>${formattedTime}</span>
        `;
    };

    if (timeInterval) clearInterval(timeInterval);
    updateTime();
    timeInterval = setInterval(updateTime, 1000);
}

function refreshDataAndScroll() {
    if (requestCount >= 1) {
        showNotification('error', 'Has alcanzado el límite de solicitudes. Inténtalo de nuevo más tarde.');
        disableButtons();
        return;
    }
    requestCount++;
    refreshData();
    scrollToElement('ip-info');
    resetRequestCount();
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

    const apiStatusIp = document.getElementById('api-status-ip').querySelector('.status-indicator');
    const apiStatusTimezone = document.getElementById('api-status-timezone').querySelector('.status-indicator');

    apiStatusIp.className = 'status-indicator loading';
    apiStatusTimezone.className = 'status-indicator loading';

    ipData = await fetchIpInfo();
    if (ipData) {
        apiStatusIp.className = 'status-indicator success';
        apiStatusIp.textContent = 'Éxito';
    } else {
        apiStatusIp.className = 'status-indicator error';
        apiStatusIp.textContent = 'Error';
    }

    if (ipData && ipData.latitude && ipData.longitude) {
        const timeZoneData = await fetchTimeZoneAndTime(ipData.latitude, ipData.longitude);
        if (timeZoneData) {
            apiStatusTimezone.className = 'status-indicator success';
            apiStatusTimezone.textContent = 'Éxito';
        } else {
            apiStatusTimezone.className = 'status-indicator error';
            apiStatusTimezone.textContent = 'Error';
        }
        displayIpInfo(ipData, timeZoneData);
    } else {
        apiStatusTimezone.className = 'status-indicator error';
        apiStatusTimezone.textContent = 'Error';
        displayIpInfo(ipData, null);
    }
    showLocation(); // Actualizar el mapa
}

function showLocationAndScroll() {
    if (requestCount >= 1) {
        showNotification('error', 'Has alcanzado el límite de solicitudes. Inténtalo de nuevo más tarde.');
        disableButtons();
        return;
    }
    requestCount++;
    showLocation();
    scrollToElement('map-container');
    resetRequestCount();
}

function disableButtons() {
    const buttons = document.querySelectorAll('.button-container button');
    buttons.forEach(button => {
        button.disabled = true;
    });
    setTimeout(() => {
        buttons.forEach(button => {
            button.disabled = false;
        });
    }, 1000); // Bloquear botones por 1 segundo
}

function checkNetworkStatus() {
    const networkStatus = document.getElementById('network-status');
    if (navigator.onLine) {
        networkStatus.innerHTML = `
            <div class="status-indicator online">
                <i class="fas fa-check-circle"></i> Conectado a Internet
            </div>
        `;
        startLatencyCheck();
    } else {
        networkStatus.innerHTML = `
            <div class="status-indicator offline">
                <i class="fas fa-times-circle"></i> Sin conexión a Internet
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
                        <i class="fas fa-check-circle"></i> Conectado a Internet (Latencia: ${latency} ms)
                    </div>
                `;
            })
            .catch(() => {
                const networkStatus = document.getElementById('network-status');
                networkStatus.innerHTML = `
                    <div class="status-indicator offline">
                        <i class="fas fa-times-circle"></i> Sin conexión a Internet
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
    if (requestCount >= 1) {
        showNotification('error', 'Has alcanzado el límite de solicitudes. Inténtalo de nuevo más tarde.');
        disableButtons();
        return;
    }
    requestCount++;

    const ipInput = document.getElementById('ip-input').value.trim();
    if (ipInput) {
        const ipInfoDiv = document.getElementById('ip-info');
        ipInfoDiv.innerHTML = '<div class="loader"></div><p>Cargando información...</p>';

        const apiStatusIp = document.getElementById('api-status-ip').querySelector('.status-indicator');
        const apiStatusTimezone = document.getElementById('api-status-timezone').querySelector('.status-indicator');

        apiStatusIp.className = 'status-indicator loading';
        apiStatusTimezone.className = 'status-indicator loading';

        ipData = await fetchIpInfo(ipInput);
        if (ipData) {
            apiStatusIp.className = 'status-indicator success';
            apiStatusIp.textContent = 'Éxito';
        } else {
            apiStatusIp.className = 'status-indicator error';
            apiStatusIp.textContent = 'Error';
        }

        if (ipData && ipData.latitude && ipData.longitude) {
            const timeZoneData = await fetchTimeZoneAndTime(ipData.latitude, ipData.longitude);
            if (timeZoneData) {
                apiStatusTimezone.className = 'status-indicator success';
                apiStatusTimezone.textContent = 'Éxito';
            } else {
                apiStatusTimezone.className = 'status-indicator error';
                apiStatusTimezone.textContent = 'Error';
            }
            displayIpInfo(ipData, timeZoneData);
        } else {
            apiStatusTimezone.className = 'status-indicator error';
            apiStatusTimezone.textContent = 'Error';
            displayIpInfo(ipData, null);
        }
        showLocation(); // Actualizar el mapa

        if (ipData) {
            showNotification('success', 'Información de IP cargada con éxito.');
        } else {
            showNotification('error', 'Error al cargar la información de IP.');
        }
    } else {
        showNotification('error', 'Por favor, ingrese una dirección IP válida.');
    }

    resetRequestCount();
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

// Función para reiniciar el contador de solicitudes después de 0.95 segundos
function resetRequestCount() {
    if (requestTimer) clearTimeout(requestTimer);
    requestTimer = setTimeout(() => {
        requestCount = 0;
    }, 950);
}