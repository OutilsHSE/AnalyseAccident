
function addRow() {
    const tbody = document.querySelector('#obs-table tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td></td>
                <td><select style="margin-top:10px">
          <option value="organisationnel"> 📋 Organisationel</option>
          <option value="technique"> 🛠️ Technique</option>
          <option value="humain"> 👤 Humain</option>
          </select></td>
          <td><textarea placeholder="Action à mener"></textarea></td>
        <td><input type="text"></td>
        <td><input type="text"></td>
        <td><button class="remove-row" onclick="removeRow(this)">✖</button></td>
      `;
    tbody.appendChild(tr);
    updateCounters();
}
function removeRow(btn) {
    btn.closest('tr').remove();
    updateCounters();
}

function updateCounters() {
    const rows = document.querySelectorAll('#obs-table tbody tr');
    rows.forEach((row, index) => {
        const cell = row.querySelector('td');
        cell.textContent = index + 1; // numéro de ligne
    });
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
 function printAllPages() {

    const page1Content = localStorage.getItem('page1Content');
    const page2Content = localStorage.getItem('page2Content');
    const page3Content = localStorage.getItem('page3Content');
    const page4Content = localStorage.getItem('page4Content');

    const page = document.querySelector('#page5');
    const inputs = page.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
  const tag = input.tagName.toLowerCase();

  if (input.type === 'checkbox' || input.type === 'radio') {
    if (input.checked) {
      input.setAttribute('checked', 'checked');
    } else {
      input.removeAttribute('checked');
    }
  } else if (tag === 'textarea') {
    input.innerHTML = input.value; // ✅ pour textarea
  } else if (tag === 'select') {
    const options = input.querySelectorAll('option');
    options.forEach(option => {
      option.selected = option.value === input.value;
    });
  } else {
    input.setAttribute('value', input.value); // ✅ pour les inputs texte
  }
});
    const page5Clone = page.cloneNode(true);

    const tempContainer1 = document.createElement('div');
    const tempContainer2 = document.createElement('div');
    const tempContainer3 = document.createElement('div');
    const tempContainer4 = document.createElement('div');

    if (page1Content) tempContainer1.innerHTML = page1Content;
    if (page2Content) tempContainer2.innerHTML = page2Content;
    if (page3Content) tempContainer3.innerHTML = page3Content;
    if (page4Content) tempContainer4.innerHTML = page4Content;

    // Assemblage final dans un conteneur temporaire
    const finalContainer = document.createElement('div');
    finalContainer.style.padding = '20px'; // Pour une mise en page propre
    if (page1Content) finalContainer.innerHTML += '<div class="page-section page-break">' + tempContainer1.innerHTML + '</div>';
    if (page2Content) finalContainer.innerHTML += '<div class="page-section page-break">' + tempContainer2.innerHTML + '</div>';
    if (page3Content) finalContainer.innerHTML += '<div class="page-section page-break">' + tempContainer3.innerHTML + '</div>';
    if (page4Content) finalContainer.innerHTML += '<div class="page-section page-break">' + tempContainer4.innerHTML + '</div>';
    finalContainer.innerHTML += '<div>' + page5Clone.outerHTML + '</div>';

    document.body.appendChild(finalContainer); // Temporairement dans le DOM
      const printWindow = window.open('', '_blank');
      printWindow.document.write('<html><head>');
      printWindow.document.write('<link rel="stylesheet" href="global.css">');
      printWindow.document.write('<link rel="stylesheet" href="analyse-cause.css">');
      printWindow.document.write('<link rel="stylesheet" href="person.css">');
      printWindow.document.write('<link rel="stylesheet" href="actions.css">');
      printWindow.document.write('<link rel="stylesheet" href="plan-action.css">');
      printWindow.document.write('</head><body>');
      printWindow.document.write(finalContainer.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();

    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 1000);
    };

      finalContainer.remove();
    
  }

window.onload = function () {
    addRow();
}

