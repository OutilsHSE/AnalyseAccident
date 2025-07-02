
function addRow() {
    const tbody = document.querySelector('#obs-table tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>1</td>
                <td><select>
          <option value="PP">Organisationel</option>
          <option value="PA">Technique</option>
          <option value="CD">Humain</option>
          </select></td>
          <td><input type="text" placeholder="Action à mener"></td>
        <td><input type="text"></td>
        <td><input type="text"></td>
        <td><button class="remove-row" onclick="removeRow(this)">✖</button></td>
      `;
    tbody.appendChild(tr);
}
function removeRow(btn) {
    btn.closest('tr').remove();
    updateCounters();
}

document.addEventListener('DOMContentLoaded', function () {
    const selectElement = document.getElementById('mySelect');
    if (selectElement) {
        selectElement.addEventListener('change', function () {
            toggleInputs(this);
        });

        // Appel initial pour définir l'état des inputs en fonction de la valeur par défaut
        toggleInputs(selectElement);
    }
});

window.onload = function () {
    addRow();
}

function download() {
    const element = document.body.cloneNode(true);

    // Supprimer les boutons et éléments non imprimables
    const buttons = element.querySelectorAll('button, .no-print');
    buttons.forEach(btn => btn.remove());

    // Forcer les textareas à afficher leur texte dans une div (comme en mode print)
    const textareas = element.querySelectorAll('textarea.description');
    textareas.forEach(textarea => {
        const div = document.createElement('div');
        div.className = 'print-description';
        div.textContent = textarea.value;
        textarea.parentNode.insertBefore(div, textarea);
        textarea.remove();
    });

    const opt = {
        margin: 0.5,
        filename: 'VMS_Observations.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}
