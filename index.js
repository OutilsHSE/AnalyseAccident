
window.onload = function () {
    localStorage.clear();

    // Efface tout le sessionStorage
    sessionStorage.clear();

    window.addEventListener("load", () => {

        // Si tu veux aussi vider tous les inputs et textarea
        document.querySelectorAll("input, textarea").forEach(el => {
            el.value = "";
        });
    });

    document.getElementById('accident-date').valueAsDate = new Date();
    localStorage.setItem('nature', 'humain')
}

const selected = document.getElementById("selectedOptionImg");
const options = document.getElementById("optionsListImg");
const customSelect = document.getElementById("customSelect");

selected.addEventListener("click", () => {
    options.style.display = options.style.display === "block" ? "none" : "block";
});

document.querySelectorAll(".option-img").forEach(option => {
    option.addEventListener("click", () => {
        const img = option.querySelector("img");
        const value = option.getAttribute("data-value");

        if (img) {
            selected.innerHTML = `<img src="${img.src}" alt="">`;
        } else {
            selected.innerHTML = `<span>Non</span>`;
        }

        // Stocker la valeur sélectionnée si nécessaire
        selected.setAttribute("data-value", value);
        console.log("Valeur sélectionnée :", value);

        options.style.display = "none";
    });
});


const nature = document.getElementById('nature');
const selectAccident = document.getElementById('select-accident');
const selectHumain = document.getElementById('select-humain');
const selectEnvironnement = document.getElementById('select-environnement');
const selectIndustriel = document.getElementById('select-industriel');
const groupEvenementHautPotentiel = document.getElementById('haut-potentiel');
const gravitePotentielleSelect = document.getElementById('gravite-potentielle-select');
const regleContainer = document.getElementById('selectedOptionImg');
const inputAutre = document.getElementById('input-autre');
inputAutre.style.display = 'none';

nature.addEventListener('change', function () {
    // Masquer tout d'abord tous les selects secondaires
    selectHumain.style.display = 'none';
    selectEnvironnement.style.display = 'none';
    selectIndustriel.style.display = 'none';
    inputAutre.style.display = 'none';
    // Afficher seulement celui qui correspond
    if (this.value === 'humain') {
        selectHumain.style.display = 'block';
    } else if (this.value === 'environnement') {
        selectEnvironnement.style.display = 'block';
    } else if (this.value === 'industriel') {
        selectIndustriel.style.display = 'block';
    }
    localStorage.setItem('nature', this.value)
});

selectEnvironnement.addEventListener('change', function () {
    // Masquer tout d'abord tous les selects secondaires
    const selectPollution = document.getElementById('select-pollution');
    const selectNuisance = document.getElementById('select-nuisance');

    selectPollution.style.display = 'none';
    selectNuisance.style.display = 'none';

    // Afficher seulement celui qui correspond
    if (this.value === 'pollution') {
        selectPollution.style.display = 'block';
    } else if (this.value === 'nuisance') {
        selectNuisance.style.display = 'block';
    }
});

selectIndustriel.addEventListener('change', function () {
    // Masquer tout d'abord tous les selects secondaires
    const selectPollution = document.getElementById('select-pollution');
    inputAutre.style.display = 'none';
    selectPollution.style.display = 'none';
    if (this.value === 'autre') {
        inputAutre.style.display = 'block';
    }
});

selectHumain.addEventListener('change', function () {
    // Masquer tout d'abord tous les selects secondaires
    const selectGravity = document.getElementById('select-gravite-reelle');
    // Afficher seulement celui qui correspond

    inputAutre.style.display = 'none';
    if (this.value === 'presque-accident' || this.value === 'situation-dangereuse') {
        selectGravity.disabled = true;
    } else {
        selectGravity.disabled = false;
    }
    if (this.value === 'autre') {
        inputAutre.style.display = 'block';
    }
});

function verifierConditions() {
    const nature = selectHumain.value;
    const gravite = parseInt(gravitePotentielleSelect.value, 10);
    const regleImage = regleContainer.querySelector("img"); // vérifie si une image est sélectionnée

    const conditionGravite = gravite > 3;
    const conditionRegle = regleImage !== null;

    if (conditionGravite || conditionRegle) {
        groupEvenementHautPotentiel.style.display = 'block';
        localStorage.setItem('HIPO', true);
    } else {
        groupEvenementHautPotentiel.style.display = 'none';
        localStorage.removeItem('HIPO');
    }

    localStorage.setItem('analyse', nature === 'accident-travail-avec-arret' || conditionRegle);
}

// Écouteurs pour chaque changement
selectHumain.addEventListener('change', verifierConditions);
gravitePotentielleSelect.addEventListener('change', verifierConditions);

// Si tu as un système de sélection d’image personnalisé :
document.querySelectorAll(".option-img").forEach(option => {
    option.addEventListener("click", () => {
        const img = option.querySelector("img").src;
        regleContainer.innerHTML = `<img src="${img}" alt="">`;
        verifierConditions();
    });
});


function loadPageContent() {
    // Restaurer le contenu HTML de la page avec les valeurs des champs
    const savedContent = localStorage.getItem('page1Content');
    if (savedContent) {
        document.querySelector('#page1').outerHTML = savedContent;
    }
}

// Sélection des éléments
const modal = document.getElementById("myModal");
const btn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".close");

// Ouvrir le modal
btn.onclick = function () {
    modal.style.display = "block";
}

// Fermer quand on clique sur la croix
closeBtn.onclick = function () {
    modal.style.display = "none";
}

// Fermer quand on clique en dehors de l'image
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function redirectToPage() {
    savePageContentById('page1');
    window.location.href = 'person.html';
}

window.onbeforeunload = function () {
    savePageContentById('page1');
}
