const gallery = document.querySelector('#coolpicGrid');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

let btn = document.querySelector('.menu-btn');
const menu = document.querySelector('nav');

// toggle menu
btn.addEventListener('click', toggleMenu)

function toggleMenu() {
    menu.classList.toggle('nav');
    btn.classList.toggle('change')
}

// Event listener for opening the modal
gallery.addEventListener('click', openModal);

function openModal(e) {
// Code to show modal - Use event parameter 'e'
    const img = e.target;

    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    const full = src.replace('sm', 'full');

    modalImage.src = full;
    modalImage.alt = alt;

    modal.showModal();
    
}
// Close modal on button click
closeButton.addEventListener('click', () =>{
    modal.close();
})

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
})
