let ipData = null;
let timeInterval = null;
let latencyInterval = null;

function fetchIpInfo(ip = '') {
    return new Promise((resolve, reject) => {
        const freeIpApiUrl = `https://freeipapi.com/api/json/${ip}`;
        const ipApiUrl = `http://ip-api.com/json/${ip}`;

        const freeIpApiRequest = new XMLHttpRequest();
        freeIpApiRequest.open('GET', freeIpApiUrl, true);
        freeIpApiRequest.onload = function() {
            if (freeIpApiRequest.status >= 200 && freeIpApiRequest.status < 300) {
                const freeIpApiData = JSON.parse(freeIpApiRequest.responseText);
                const ipApiRequest = new XMLHttpRequest();
                ipApiRequest.open('GET', ipApiUrl, true);
                ipApiRequest.onload = function() {
                    if (ipApiRequest.status >= 200 && ipApiRequest.status < 300) {
                        const ipApiData = JSON.parse(ipApiRequest.responseText);
                        if (ipApiData.status === 'success') {
                            resolve({
                                ipAddress: ipApiData.query,
                                latitude: ipApiData.lat,
                                longitude: ipApiData.lon,
                                cityName: ipApiData.city,
                                regionName: ipApiData.regionName,
                                countryName: ipApiData.country,
                                countryCode: ipApiData.countryCode,
                                continentCode: freeIpApiData.continentCode,
                                zipCode: ipApiData.zip,
                                timeZone: ipApiData.timezone,
                                timeZones: [ipApiData.timezone],
                                currency: freeIpApiData.currency,
                                language: freeIpApiData.language,
                                tlds: freeIpApiData.tlds,
                                isProxy: freeIpApiData.isProxy,
                                isp: ipApiData.isp,
                                org: ipApiData.org,
                                as: ipApiData.as
                            });
                        } else {
                            reject('Error: ' + ipApiData.message);
                        }
                    } else {
                        reject('Error: ' + ipApiRequest.statusText);
                    }
                };
                ipApiRequest.onerror = function() {
                    reject('Error: ' + ipApiRequest.statusText);
                };
                ipApiRequest.send();
            } else {
                reject('Error: ' + freeIpApiRequest.statusText);
            }
        };
        freeIpApiRequest.onerror = function() {
            reject('Error: ' + freeIpApiRequest.statusText);
        };
        freeIpApiRequest.send();
    });
}

function displayIpInfo(data) {
    const ipInfoDiv = document.getElementById('ip-info');
    if (!data) {
        ipInfoDiv.innerHTML = `<p style="color: red">Error al cargar los datos. Por favor, intente nuevamente.</p>`;
        return;
    }

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
    const daysPassed = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.floor((endOfYear - now) / (1000 * 60 * 60 * 24));
    const weeksPassed = Math.floor(daysPassed / 7);

    ipInfoDiv.innerHTML = `
        <h2>Datos de su conexión:</h2>
        <div class="info-grid">
            <div class="info-category">
                <h3>Ubicación Geográfica</h3>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-network-wired color-primary"></i> IP: ${data.ipAddress}</div>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-map-marker-alt color-secondary"></i> Latitud: ${data.latitude}</div>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-map-marker-alt color-secondary"></i> Longitud: ${data.longitude}</div>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-city"></i> Ciudad: ${data.cityName}</div>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-globe color-info"></i> Región: ${data.regionName}</div>
            </div>
            <div class="info-category">
                <h3>Información del País</h3>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-flag color-danger"></i> País: ${data.countryName} (${data.countryCode})</div>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-globe-americas color-warning"></i> Continente: ${data.continentCode}</div>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-mail-bulk color-primary"></i> Código Postal: ${data.zipCode}</div>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-phone color-secondary"></i> Código País: ${data.countryCode}</div>
            </div>
            <div class="info-category">
                <h3>Zona Horaria</h3>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-clock"></i> Zona Horaria: ${data.timeZone}</div>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-calendar-day color-info"></i> Días transcurridos del año: ${daysPassed}</div>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-calendar-day color-info"></i> Días restantes para que finalice el año: ${daysRemaining}</div>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-calendar-week color-info"></i> Semanas transcurridas del año: ${weeksPassed}</div>
            </div>
            <div class="info-category">
                <h3>Moneda</h3>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-dollar-sign color-primary"></i> Código Moneda: ${data.currency.code}</div>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-money-bill-alt color-secondary"></i> Nombre Moneda: ${data.currency.name}</div>
            </div>
            <div class="info-category">
                <h3>Idiomas y Dominios</h3>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-language"></i> Idiomas: ${data.language}</div>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-globe color-info"></i> TLDs: ${data.tlds.join(', ')}</div>
            </div>
            <div class="info-category">
                <h3>Otros</h3>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-shield-alt color-danger"></i> Proxy: ${data.isProxy ? 'Sí' : 'No'}</div>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-network-wired color-primary"></i> ISP: ${data.isp}</div>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-building color-secondary"></i> Organización: ${data.org}</div>
                <div class="info-item" onclick="copyToClipboard(this)"><i class="fas fa-server color-info"></i> AS: ${data.as}</div>
            </div>
        </div>
    `;
    
    checkNetworkStatus();
    updateTime(); // Llamar a updateTime para mostrar la hora local
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
    if (!ipData || !ipData.timeZones || ipData.timeZones.length === 0) {
        const timeDiv = document.getElementById('current-time');
        timeDiv.innerHTML = '<p>Zona horaria no disponible.</p>';
        return;
    }
    
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('es-ES', {
        timeZone: ipData.timeZones[0], // Usar la primera zona horaria de la lista
        dateStyle: 'full',
        timeStyle: 'long'
    });
    
    const timeDiv = document.getElementById('current-time');
    if (timeDiv) {
        timeDiv.style.display = 'block';
        timeDiv.innerHTML = `
            <strong>Hora local en ${ipData.cityName}:</strong>
            <span>${formatter.format(now)}</span>
        `;
    }
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

function refreshData() {
    const ipInfoDiv = document.getElementById('ip-info');
    ipInfoDiv.innerHTML = '<div class="loader"></div><p>Cargando información...</p>';
    
    fetchIpInfo().then(data => {
        ipData = data;
        displayIpInfo(ipData);
        showLocation(); // Actualizar el mapa
    }).catch(error => {
        console.error('Error:', error);
        ipInfoDiv.innerHTML = `<p style="color: red">Error al cargar los datos. Por favor, intente nuevamente.</p>`;
    });
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
                <i class="fas fa-check-circle color-success"></i> Conectado a Internet
            </div>
        `;
        startLatencyCheck();
    } else {
        networkStatus.innerHTML = `
            <div class="status-indicator offline">
                <i class="fas fa-times-circle color-danger"></i> Sin conexión a Internet
            </div>
        `;
        stopLatencyCheck();
    }
}

function startLatencyCheck() {
    if (latencyInterval) return;
    
    latencyInterval = setInterval(() => {
        const start = Date.now();
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', 'https://www.google.com', true);
        xhr.onload = function() {
            const latency = Date.now() - start;
            const networkStatus = document.getElementById('network-status');
            networkStatus.innerHTML = `
                <div class="status-indicator online">
                    <i class="fas fa-check-circle color-success"></i> Conectado a Internet (Latencia: ${latency} ms)
                </div>
            `;
        };
        xhr.onerror = function() {
            const networkStatus = document.getElementById('network-status');
            networkStatus.innerHTML = `
                <div class="status-indicator offline">
                    <i class="fas fa-times-circle color-danger"></i> Sin conexión a Internet
                </div>
            `;
        };
        xhr.send();
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
function searchIp() {
    const ipInput = document.getElementById('ip-input').value.trim();
    if (ipInput) {
        const ipInfoDiv = document.getElementById('ip-info');
        ipInfoDiv.innerHTML = '<div class="loader"></div><p>Cargando información...</p>';
        
        fetchIpInfo(ipInput).then(data => {
            ipData = data;
            displayIpInfo(ipData);
            showLocation(); // Actualizar el mapa
            
            if (ipData) {
                showNotification('success', 'Información de IP cargada con éxito.');
            } else {
                showNotification('error', 'Error al cargar la información de IP.');
            }
        }).catch(error => {
            console.error('Error:', error);
            ipInfoDiv.innerHTML = `<p style="color: red">Error al cargar los datos. Por favor, intente nuevamente.</p>`;
            showNotification('error', 'Error al cargar la información de IP.');
        });
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