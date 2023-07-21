import chart from './scripts/chart';

document.addEventListener('DOMContentLoaded', () => {
  console.log('All is well.');

  const chartEle = document.getElementById('chart');
  const searchButton = document.getElementById('searchButton');
  const artistNameInput = document.getElementById('artistNameInput');
  const clearButton = document.getElementById('clearButton');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalContainer = document.getElementById('modalContainer');
  const header = document.getElementById('header');
  const main = document.getElementById('main');
  const closeBtn = document.querySelector('.close');

  clearButton.addEventListener('click', () => {
    
    chartEle.innerHTML = '';

    clearButton.style.display = 'none';
  });

  searchButton.addEventListener('click', async () => {
    const artistName = artistNameInput.value;
    chartEle.innerHTML = '';
    chartEle.append(await chart(artistName));
  });

  modalButton.addEventListener('click', () => {
    modalOverlay.style.display = 'block'; 
    modalContainer.style.display = 'block'; 
    header.classList.add('blur-effect'); 
    main.classList.add('blur-effect');
  });

  function closeModal() {
    modalOverlay.style.display = 'none'; 
    modalContainer.style.display = 'none'; 
    header.classList.remove('blur-effect'); 
    main.classList.remove('blur-effect');
  }

  closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

});