import chart from './scripts/chart';

document.addEventListener('DOMContentLoaded', () => {
  console.log('All is well.');

  const chartEle = document.getElementById('chart');
  const searchButton = document.getElementById('searchButton');
  const artistNameInput = document.getElementById('artistNameInput');
  const modalButton = document.getElementById('modalButton');
  const modalContainer = document.getElementById('modalContainer');
  const closeBtn = document.querySelector('.close');
  const clearButton = document.getElementById('clearButton');

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
    modalContainer.style.display = 'block'; 
  });

  closeBtn.addEventListener('click', () => {
    modalContainer.style.display = 'none'; 
  });
  
});