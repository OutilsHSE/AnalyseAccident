
window.onload = function () {
  const evenementHipo = localStorage.getItem('HIPO');

  // Compare bien à la chaîne "true"
  if (evenementHipo === "true") {
    const pourquoiMethode = document.getElementById('5pourquoi');
    const arbreMethode = document.getElementById('arbre_des_causes');
    const checkboxes = document.querySelectorAll('input[name="choix"]');

    checkboxes.forEach(cb => {
      cb.disabled = true;
      if(cb.value === 'arbre')
        cb.checked=true;
    });

    arbreMethode.style.display = 'block';
    pourquoiMethode.style.display = 'none';
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

function checkOnlyOne(clickedCheckbox) {
  const pourquoiMethode = document.getElementById('5pourquoi');
  const arbreMethode = document.getElementById('arbre_des_causes');
  const checkboxes = document.querySelectorAll('input[name="choix"]');
  checkboxes.forEach(cb => {
    if (cb !== clickedCheckbox) cb.checked = false;
  });
  if (clickedCheckbox.value === 'cinq') {
    arbreMethode.style.display = 'none';
    pourquoiMethode.style.display = 'block';
  }
  else {
    arbreMethode.style.display = 'block';
    pourquoiMethode.style.display = 'none';
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

const modalCause = document.getElementById("myModalCause");
const btnCause = document.getElementById("openModalBtnCause");
const closeBtnCause = document.querySelector(".close-cause");
// Ouvrir le modal
btnCause.onclick = function () {
  modalCause.style.display = "block";
}

// Fermer quand on clique sur la croix
closeBtnCause.onclick = function () {
  modalCause.style.display = "none";
}
// Fermer quand on clique en dehors de l'image
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}


function redirectToPage() {
  savePageContentById('page4');
  window.location.href = 'plan-action.html';
}
