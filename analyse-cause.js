
window.onload = function () {
}


const photoInput = document.getElementById('photo-input');
const photoContainer = document.getElementById('photo-container');

photoInput.addEventListener('change', function () {
    // Vider l'affichage actuel
    photoContainer.innerHTML = '';

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
            img.style.width = '120px';
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

            btn.addEventListener('click', () => {
                imageWrapper.remove();
            });

            imageWrapper.appendChild(img);
            imageWrapper.appendChild(btn);
            photoContainer.appendChild(imageWrapper);
        };

        reader.readAsDataURL(file);
    });
});

