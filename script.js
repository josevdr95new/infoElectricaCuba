document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const provinceSelect = document.getElementById('province-select');
    const messagesContainer = document.getElementById('messages-container');
    const latestMessageContainer = document.getElementById('latest-message-container');
    const loadingContainer = document.getElementById('loading-container');
    const showAllMessagesMenu = document.getElementById('showAllMessagesMenu');
    const contactLink = document.getElementById('contact-link');
    const contactInfoContainer = document.getElementById('contact-info-container');
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode-button');
    const refreshButton = document.getElementById('refresh-button');

    // Cargar configuración guardada
    const loadSavedSettings = () => {
        // Cargar modo oscuro
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            toggleDarkModeButton.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }

        // Cargar última provincia seleccionada
        const lastProvince = localStorage.getItem('lastSelectedProvince');
        if (lastProvince) provinceSelect.value = lastProvince;
    };

    // Guardar configuración
    const saveSettings = () => {
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        localStorage.setItem('lastSelectedProvince', provinceSelect.value);
    };

    // Alternar modo oscuro
    toggleDarkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleDarkModeButton.querySelector('i').classList.toggle('fa-moon');
        toggleDarkModeButton.querySelector('i').classList.toggle('fa-sun');
        saveSettings();
    });

    // Obtener mensajes de la API
    const fetchMessages = async (url) => {
        try {
            showLoading(true);
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
            const data = await response.json();
            const doc = new DOMParser().parseFromString(data.contents, 'text/html');
            displayMessages(doc.querySelectorAll('.tgme_widget_message'));
        } catch (error) {
            console.error('Error al obtener mensajes:', error);
            messagesContainer.innerHTML = '<p>Error al cargar los mensajes. Por favor, intente nuevamente.</p>';
        } finally {
            showLoading(false);
        }
    };

    // Mostrar mensajes en la interfaz
    const displayMessages = (messages) => {
        if (messages.length === 0) {
            latestMessageContainer.innerHTML = '<p>No hay mensajes disponibles.</p>';
            messagesContainer.innerHTML = '';
            return;
        }

        // Mostrar último mensaje
        latestMessageContainer.innerHTML = '<h2><i class="fas fa-newspaper"></i> Último Mensaje</h2>';
        latestMessageContainer.appendChild(createMessageElement(messages[0]));

        // Mostrar todos los mensajes
        messagesContainer.innerHTML = '<h2><i class="fas fa-list"></i> Todos los Mensajes</h2>';
        messagesContainer.append(...Array.from(messages).slice(1).map(createMessageElement));
        messagesContainer.classList.remove('hidden');
    };

    // Crear elemento de mensaje
    const createMessageElement = (message) => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';

        const textContent = message.querySelector('.tgme_widget_message_text');
        if (textContent) messageElement.appendChild(textContent.cloneNode(true));

        const image = message.querySelector('.tgme_widget_message_photo_wrap');
        if (image) {
            const imgElement = document.createElement('img');
            imgElement.src = image.style.backgroundImage.slice(5, -2);
            imgElement.alt = 'Imagen del mensaje';
            imgElement.className = 'message-image';
            messageElement.appendChild(imgElement);
        }

        const date = message.querySelector('.tgme_widget_message_date time');
        if (date) {
            const dateElement = document.createElement('p');
            dateElement.className = 'message-date';
            dateElement.textContent = date.getAttribute('datetime');
            messageElement.appendChild(dateElement);
        }

        return messageElement;
    };

    // Mostrar/ocultar indicador de carga
    const showLoading = (show) => loadingContainer.classList.toggle('hidden', !show);

    // Event listeners
    provinceSelect.addEventListener('change', () => {
        fetchMessages(provinceSelect.value);
        saveSettings();
    });

    refreshButton.addEventListener('click', () => fetchMessages(provinceSelect.value));

    showAllMessagesMenu.addEventListener('click', () => {
        messagesContainer.scrollIntoView({ behavior: 'smooth' });
    });

    contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        contactInfoContainer.classList.toggle('hidden');
        contactInfoContainer.scrollIntoView({ behavior: 'smooth' });
    });

    // Inicialización
    loadSavedSettings();
    fetchMessages(provinceSelect.value);
});