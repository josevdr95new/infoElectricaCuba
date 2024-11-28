const people = [
    {
        name: "Albert Einstein",
        image: "albert_einstein.jpg",
        description: "Físico teórico alemán que revolucionó la ciencia moderna. Desarrolló la teoría de la relatividad especial y general, transformando nuestra comprensión del espacio, tiempo y gravedad. Su famosa ecuación E=mc² estableció la equivalencia entre masa y energía. Sus contribuciones fueron fundamentales para el desarrollo de la física cuántica y la bomba atómica. Einstein también realizó importantes contribuciones a la teoría cuántica, aunque se mostró escéptico ante algunas de sus implicaciones filosóficas. Su trabajo sobre el efecto fotoeléctrico le valió el Premio Nobel de Física en 1921. Además de sus logros científicos, fue un apasionado defensor de la paz y los derechos civiles, y su influencia se extiende mucho más allá de la física teórica.",
        year: "1879-1955"
    },
    {
        name: "Marie Curie",
        image: "marie_curie.jpg",
        description: "Física y química polaca, pionera en el campo de la radiactividad. Primera persona en recibir dos Premios Nobel en distintas especialidades científicas (Física y Química). Descubrió los elementos radio y polonio, y desarrolló técnicas para aislar isótopos radiactivos. Sus investigaciones sentaron las bases para el desarrollo de la radiología y el tratamiento del cáncer. Durante la Primera Guerra Mundial, estableció unidades móviles de radiografía para diagnosticar heridas en el campo de batalla. Su dedicación a la ciencia fue tal que sacrificó su propia salud, falleciendo debido a la exposición prolongada a la radiación. Su legado continúa a través del Instituto Curie y su influencia en generaciones de científicas.",
        year: "1867-1934"
    },
    {
        name: "Isaac Newton",
        image: "isaac_newton.jpg",
        description: "Matemático, físico y astrónomo inglés, considerado uno de los científicos más influyentes de la historia. Sus contribuciones más destacadas incluyen la formulación de las leyes del movimiento y la ley de la gravitación universal, que sentaron las bases de la mecánica clásica. Newton también desarrolló el cálculo infinitesimal de forma independiente de Leibniz, lo que revolucionó las matemáticas y la física. Su obra 'Philosophiæ Naturalis Principia Mathematica' (Principios Matemáticos de la Filosofía Natural) es uno de los libros científicos más importantes de todos los tiempos. Además de su trabajo científico, Newton fue un erudito en diversas disciplinas, incluyendo la alquimia y la teología.",
        year: "1643-1727"
    },
    {
        name: "Galileo Galilei",
        image: "galileo_galilei.jpg",
        description: "Astrónomo, físico y matemático italiano, considerado el padre de la astronomía moderna, la física experimental y la ciencia observacional. Galileo realizó importantes contribuciones al estudio del movimiento y la mecánica, incluyendo la formulación de las leyes del movimiento de los objetos en caída libre. Su trabajo más famoso fue el uso del telescopio para observar el cielo, lo que le permitió descubrir las lunas de Júpiter, las manchas solares y las fases de Venus. Estos descubrimientos apoyaron la teoría heliocéntrica de Copérnico y desafiaron la visión geocéntrica del universo defendida por la Iglesia Católica. Galileo fue juzgado por herejía y obligado a retractarse, pero su legado científico sigue siendo fundamental en la historia de la ciencia.",
        year: "1564-1642"
    },
    {
        name: "Nikola Tesla",
        image: "nikola_tesla.jpg",
        description: "Inventor, ingeniero eléctrico y físico serbio-estadounidense, conocido por sus contribuciones al desarrollo de la corriente alterna (CA) y numerosos inventos en el campo de la electricidad y el magnetismo. Tesla desarrolló el motor de inducción, que es la base de la mayoría de los motores eléctricos modernos. También inventó el sistema de transmisión de energía eléctrica de CA, que permitió la distribución eficiente de electricidad a largas distancias. Sus ideas revolucionarias y su visión del futuro incluían la transmisión inalámbrica de energía y la comunicación sin cables. A pesar de su gran talento y contribuciones, Tesla murió en la pobreza, y muchos de sus inventos y patentes fueron poco reconocidos en su época. Hoy en día, es considerado una de las mentes más brillantes de la historia de la tecnología.",
        year: "1856-1943"
    },
    {
        name: "Charles Darwin",
        image: "charles_darwin.jpg",
        description: "Naturalista, geólogo y biólogo británico, cuya teoría de la evolución por selección natural es uno de los conceptos fundamentales de la biología moderna. Darwin desarrolló su teoría durante un viaje alrededor del mundo a bordo del HMS Beagle, donde realizó observaciones detalladas de la vida silvestre y los hábitats. Su obra más famosa, 'El origen de las especies', publicada en 1859, presentó la idea de que todas las especies de vida han evolucionado con el tiempo a partir de un ancestro común. Esta teoría revolucionó la comprensión de la vida en la Tierra y desafió las creencias religiosas de la época. Darwin también realizó importantes contribuciones a la botánica, la zoología y la geología, y su trabajo sigue siendo fundamental en la biología evolutiva.",
        year: "1809-1882"
    },
    {
        name: "Louis Pasteur",
        image: "louis_pasteur.jpg",
        description: "Químico y microbiólogo francés, considerado uno of the padres of microbiología and medicina moderna. Pasteur realizó importantes descubrimientos en el campo of microbiología incluyendo pasteurización and vacunas contra rabia and fiebre aftosa.",
        year: "1822-1895"
    },
    {
        name: "Alexander Graham Bell",
        image: "alexander_graham_bell.jpg",
        description: "Inventor and científico escocés-canadiense-estadounidense conocido principalmente por invención of teléfono.",
        year: "1847-1922"
    },
    {
        name: "Thomas Edison",
        image: "thomas_edison.jpg",
        description: "Inventor and empresario estadounidense conocido por numerosas invenciones que tuvieron un impacto profundo en tecnología moderna.",
        year: "1847-1931"
    },
    {
        name: "Alan Turing",
        image: "alan_turing.jpg",
        description: "Matemático lógico and criptógrafo británico considerado uno of the padres of informática and inteligencia artificial.",
        year: "1912-1954"
    },
    {
        name: "Stephen Hawking",
        image: "stephen_hawking.jpg",
        description: "Físico teórico and cosmólogo británico conocido por trabajos sobre naturaleza of universo and teoría of relatividad general.",
        year: "1942-2018"
    },
    {
        name: "Ada Lovelace",
        image: "ada_lovelace.jpg",
        description: "Matemática and escritora británica conocida principalmente por trabajo sobre máquina analítica of Charles Babbage.",
        year: "1815-1852"
    },
    // Nuevas adiciones
    {
      name:"Niels Bohr",
      image:"niels_bohr.jpg",
      description:"Físico danés que hizo contribuciones fundamentales a nuestra comprensión del átomo y cuántica.",
      year:"1885-1962"
    },
    {
      name:"Richard Feynman",
      image:"richard_feynman.jpg", 
      description:"Físico estadounidense conocido por su trabajo en electrodinámica cuántica.",
      year:"1918-1988"
    },
    {
      name:"Rosalind Franklin", 
      image:"rosalind_franklin.jpg", 
      description:"Química británica cuyas investigaciones fueron cruciales para entender estructura del ADN.", 
      year:"1920-1958"
    },
    {
      name:"James Clerk Maxwell", 
      image:"james_clerk_maxwell.jpg", 
      description:"Físico escocés conocido por formular teoría electromagnética clásica.", 
      year:"1831-1879"
    },
    {
      name:"Carl Sagan", 
      image:"carl_sagan.jpg", 
      description:"Astrónomo estadounidense popularizador científico conocido por serie 'Cosmos'.", 
      year:"1934-1996"
    },
    {
      name:"Jane Goodall", 
      image:"jane_goodall.jpg", 
      description:"Primatóloga británica conocida por estudios sobre comportamiento social chimpancés.", 
      year:"1934-presente"
    },
    {
      name:"Gregory Pincus", 
      image:"gregory_pincus.jpg", 
      description:"Biólogo estadounidense co-inventor primera píldora anticonceptiva.", 
      year:"1903-1967"
    },
    {
      name:"Barbara McClintock", 
      image:"barbara_mcclintock.jpg", 
      description:"Genetista estadounidense ganadora Premio Nobel por descubrimiento transposones.", 
      year:"1902-1992"
    },
    {
      name:"Mae Jemison", 
      image:"mae_jemison.jpg", 
      description:"Primera mujer afroamericana en viajar al espacio.", 
      year:"1956-presente"
    }
];

function createPersonCard(person) {
    return `
        <div class="person-card">
            <img src="${person.image}" alt="Fotografía de ${person.name}" class="person-image" data-src="${person.image}" onclick="enlargeImage(this)">
            <h2 class="person-name">${person.name}</h2>
            <p class="person-info" id="info-${person.name.replace(/\s+/g, '-')}">${person.description}</p>
            <button class="read-more" onclick="toggleReadMore('${person.name.replace(/\s+/g, '-')}')">Leer más</button>
            <p class="person-info"><strong>Años:</strong> ${person.year}</p>
        </div>
    `;
}

function toggleReadMore(personId) {
    const infoElement = document.getElementById(`info-${personId}`);
    infoElement.classList.toggle('expanded');
    const button = event.target;
    button.textContent = infoElement.classList.contains('expanded') ? 'Leer menos' : 'Leer más';
}

function renderPeople(peopleArray) {
    const grid = document.getElementById('personGrid');
    grid.innerHTML = peopleArray.map(person => createPersonCard(person)).join('');
    document.getElementById('count').textContent = peopleArray.length;
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPeople = people.filter(person => 
        person.name.toLowerCase().includes(searchTerm) ||
        person.description.toLowerCase().includes(searchTerm)
    );
    renderPeople(filteredPeople);
});

function setTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('darkMode', isDark);
}

function changeFontSize(action) {
    const root = document.documentElement;
    let fontSize = parseInt(getComputedStyle(root).fontSize);
    
    if (action === 'increase') {
        fontSize = Math.min(fontSize + 2, 24);
    } else {
        fontSize = Math.max(fontSize - 2, 12);
    }
    
    root.style.fontSize = `${fontSize}px`;
    localStorage.setItem('fontSize', fontSize);
}

document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setTheme(isDarkMode);
    
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        document.documentElement.style.fontSize = `${savedFontSize}px`;
    }

    renderPeople(people);
});

document.getElementById('themeToggle').addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
});

// Optimizaciones para móviles
document.addEventListener('DOMContentLoaded', function() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.person-image').forEach(img => {
        imageObserver.observe(img);
    });
});



// Funcionalidad para agrandar la imagen
function enlargeImage(img) {
    const overlay = document.createElement('div');
    overlay.classList.add('image-overlay');
    overlay.innerHTML = `<img src="${img.src}" alt="Imagen agrandada" class="enlarged-image">`;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
}



// Funcionalidad para la versión premium
//document.getElementById('premiumButton').addEventListener('click', () => {
    //const premiumUrl = "https://www.apklis.cu/applications?search=Personas%20que%20Cambiaron%20la%20Humanidad:%20Edici%C3%B3n%20Premium";
    //const intentUrl = `intent://${premiumUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
   // window.location.href = intentUrl;
//});




// Funcionalidad de compartir
document.getElementById('shareButton').addEventListener('click', () => {
    const text = encodeURIComponent('Visita Personas que Cambiaron la Humanidad en https://www.apklis.cu/applications?search=Personas%20que%20Cambiaron%20la%20Humanidad');
    const whatsappIntentUrl = `intent://send?text=${text}#Intent;scheme=whatsapp;package=com.whatsapp;end`;
    window.location.href = whatsappIntentUrl;
});

document.getElementById('sendEmailButton').addEventListener('click', () => {
    const emailIntent = "intent://send?to=josevdr95@gmail.com#Intent;scheme=mailto;package=com.google.android.gm;end";
    window.location.href = emailIntent;
});






// Funcionalidad de compartir
document.getElementById('share-whatsapp-button').addEventListener('click', () => {
    const text = encodeURIComponent('Visita Info Eléctrica Cuba en https://www.apklis.cu/application/appinventor.ai_josevdr95.info_ElectricaCuba');
    const whatsappIntentUrl = `intent://send?text=${text}#Intent;scheme=whatsapp;package=com.whatsapp;end`;
    window.location.href = whatsappIntentUrl;
});

document.getElementById('send-email-button').addEventListener('click', () => {
    const emailIntent = "intent://send?to=josevdr95@gmail.com#Intent;scheme=mailto;package=com.google.android.gm;end";
    window.location.href = emailIntent;
});

document.getElementById('licenseLink').addEventListener('click', (e) => {
    e.preventDefault();
    const licenseUrl = "https://josevdr95new.github.io/infoElectricaCuba/License.txt";
    const intentUrl = `intent://${licenseUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
    window.location.href = intentUrl;
});