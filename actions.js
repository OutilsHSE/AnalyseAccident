window.onload = function () {
    const nature = localStorage.getItem('nature');
    const soins = document.getElementById("soins");
    const environnement = document.getElementById("environnement");
    const alert = document.getElementById("alert");
    if (nature === 'humain') {
        soins.style.display = 'block';
        environnement.style.display = 'none';
        alert.style.display = 'none'
    }
    else {
        if (nature === 'environnement') {
            soins.style.display = 'none';
            environnement.style.display = 'block';
            alert.style.display = 'block'
        }
        else {
            soins.style.display = 'none';
            environnement.style.display = 'none';
            alert.style.display = 'block'
        }
    }
}

 const photoInput = document.getElementById('photo-input');
    const photoContainer = document.getElementById('photo-container');

    photoInput.addEventListener('change', function () {

        Array.from(this.files).forEach((file, index) => {
            const reader = new FileReader();

            reader.onload = function (e) {
                // Crée un conteneur pour chaque image + bouton
                const imageWrapper = document.createElement('div');
                imageWrapper.style.position = 'relative';
                imageWrapper.style.display = 'inline-block';

                // Image preview
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.width = '360px';
                img.style.height = 'auto';
                img.style.border = '1px solid #ccc';
                img.style.borderRadius = '8px';

                // Bouton de suppression
                const btn = document.createElement('button');
                btn.textContent = '✕';
                btn.style.position = 'absolute';
                btn.style.top = '0';
                btn.style.right = '0';
                btn.style.background = 'rgba(0,0,0,0.6)';
                btn.style.color = 'white';
                btn.style.border = 'none';
                btn.style.borderRadius = '0 8px 0 8px';
                btn.style.cursor = 'pointer';

                     // Zone de commentaire
                const textarea = document.createElement('textarea');
                textarea.placeholder = 'Ajouter un commentaire...';
                textarea.style.width = '120px';
                textarea.style.marginTop = '5px';
                textarea.style.borderRadius = '4px';
                textarea.style.resize = 'none';
                textarea.rows = 2;


                btn.addEventListener('click', () => {
                    imageWrapper.remove();
                });

                imageWrapper.appendChild(img);
                imageWrapper.appendChild(btn);
                imageWrapper.appendChild(textarea);
                photoContainer.appendChild(imageWrapper);
            };

            reader.readAsDataURL(file);
        });
    });

    function savePageContent() {
    const page = document.querySelector('#page3');
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
    localStorage.setItem('page3Content', document.querySelector('#page3').outerHTML);
}

function loadPageContent() {
    // Restaurer le contenu HTML de la page avec les valeurs des champs
    const savedContent = localStorage.getItem('page3Content');
    if (savedContent) {
        document.querySelector('#page3').outerHTML = savedContent;
    }
}

function redirectToPage() {
    savePageContentById('page3');
    window.location.href = 'analyse-cause.html';
}

window.onbeforeunload = function () {
     savePageContentById('page3');
}
