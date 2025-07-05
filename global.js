function savePageContentById(pageId) {
    const page = document.querySelector(`#${pageId}`);
    if (!page) return;

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
            input.innerHTML = input.value;
        } else if (tag === 'select') {
            const options = input.querySelectorAll('option');
            options.forEach(option => {
                option.selected = option.value === input.value;
            });
        } else {
            input.setAttribute('value', input.value);
        }
    });

    localStorage.setItem(`${pageId}Content`, page.outerHTML);
}
