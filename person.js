window.onload = function () {
    const nature = localStorage.getItem('nature');
    const dommage_humain = document.getElementById("dommage-humain");
    const dommage_environnement = document.getElementById("dommage-environnement");
    const dommage_autre = document.getElementById("dommage-industiel");
    const analyse = localStorage.getItem('analyse');
     const hipo = localStorage.getItem('HIPO');
     const analyse_approfondie= document.getElementById("analyse_approfondie");
    if (nature === 'humain') {
        dommage_humain.style.display = 'flex';
        dommage_environnement.style.display = 'none';
        dommage_autre.style.display = 'none';
    }
    else {
        if (nature === 'environnement') {
            dommage_environnement.style.display = 'block';
            dommage_humain.style.display = 'none';
            dommage_autre.style.display = 'none';
        }
        else {
            dommage_humain.style.display = 'none';
            dommage_environnement.style.display = 'none';
            dommage_autre.style.display = 'block';
        }
    }
    
    if(analyse === 'true' || hipo == 'true') {
        analyse_approfondie.style.display = 'block';
    }
    else
    { 
         analyse_approfondie.style.display = 'none';
    }

}

function savePageContent() {
    const page = document.querySelector('#page2');
    const inputs = page.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            if (input.checked) {
                input.setAttribute('checked', 'checked');
            } else {
                input.removeAttribute('checked');
            }
        }
    });
    localStorage.setItem('page2Content', document.querySelector('#page2').outerHTML);
}

function loadPageContent() {
    // Restaurer le contenu HTML de la page avec les valeurs des champs
    const savedContent = localStorage.getItem('page2Content');
    if (savedContent) {
        document.querySelector('#page2').outerHTML = savedContent;
    }
}

function redirectToPage() {
    savePageContent();
    window.location.href = 'actions.html';
}

window.onbeforeunload = function () {
    savePageContent();
}
