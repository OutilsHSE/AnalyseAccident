
window.onload = function () {
    document.getElementById('accident-date').valueAsDate = new Date();
}

const selected = document.getElementById("selectedOptionImg");
const options = document.getElementById("optionsListImg");
const customSelect = document.getElementById("customSelect");

selected.addEventListener("click", () => {
    options.style.display = options.style.display === "block" ? "none" : "block";
});

document.querySelectorAll(".option-img").forEach(option => {
    option.addEventListener("click", () => {
        const img = option.querySelector("img").src;
        selected.innerHTML = `<img src="${img}" alt="">`;
        options.style.display = "none";

        // Optionnel : stocker la valeur
        const value = option.getAttribute("data-value");
        console.log("Valeur sélectionnée :", value);
    });
});

// Fermer si clic en dehors
document.addEventListener("click", (e) => {
    if (!customSelect.contains(e.target)) {
        options.style.display = "none";
    }
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

    // Afficher seulement celui qui correspond
    if (this.value === 'humain') {
        selectHumain.style.display = 'block';
    } else if (this.value === 'environnement') {
        selectEnvironnement.style.display = 'block';
    } else if (this.value === 'industriel') {
        selectIndustriel.style.display = 'block';
    }
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
    selectPollution.style.display = 'none';
    if (this.value === 'autre') {
        inputAutre.style.display = 'block';
    }
});

selectHumain.addEventListener('change', function () {
    // Masquer tout d'abord tous les selects secondaires
    const selectGravity = document.getElementById('select-gravite-reelle');
    // Afficher seulement celui qui correspond
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

    const conditionNature =
        nature === 'presque-accident' || nature === 'situation-dangereuse';

    const conditionGravite = gravite > 3;
    const conditionRegle = regleImage !== null;

    if (conditionNature && (conditionGravite || conditionRegle)) {
        groupEvenementHautPotentiel.style.display = 'block';
    } else {
        groupEvenementHautPotentiel.style.display = 'none';
    }
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

function savePageContent() {
    const page = document.querySelector('#page1');
    const inputs = page.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            if (input.checked) {
                input.setAttribute('checked', 'checked');
            } else {
                input.removeAttribute('checked');
            }
        } else {
            input.setAttribute('value', input.value);
            if (input.id === 'nature')
                localStorage.setItem('nature', input.value)
        }
    });
    localStorage.setItem('page1Content', document.querySelector('#page1').outerHTML);
}

function loadPageContent() {
    // Restaurer le contenu HTML de la page avec les valeurs des champs
    const savedContent = localStorage.getItem('page1Content');
    if (savedContent) {
        document.querySelector('#page1').outerHTML = savedContent;
    }
}

function redirectToPage() {
    savePageContent();
    window.location.href = 'person.html';
}

window.onbeforeunload = function () {
    savePageContent();
}
