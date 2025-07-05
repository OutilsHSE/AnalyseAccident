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

function loadPageContent() {
    // Restaurer le contenu HTML de la page avec les valeurs des champs
    const savedContent = localStorage.getItem('page2Content');
    if (savedContent) {
        document.querySelector('#page2').outerHTML = savedContent;
    }
}

function redirectToPage() {
     savePageContentById('page2');
    window.location.href = 'actions.html';
}

window.onbeforeunload = function () {
     savePageContentById('page2');
}
