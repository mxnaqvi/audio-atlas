import chart from './scripts/chart';

document.addEventListener('DOMContentLoaded', () => {
  console.log('All is well.');

  const chartEle = document.getElementById('chart');
  const searchButton = document.getElementById('searchButton');
  const artistNameInput = document.getElementById('artistNameInput');
  const modalButton = document.getElementById('modalButton');
  const modalContainer = document.getElementById('modalContainer');
  const closeBtn = document.querySelector('.close');

  searchButton.addEventListener('click', async () => {
    const artistName = artistNameInput.value;
    chartEle.innerHTML = '';
    chartEle.append(await chart(artistName));
  });

  modalButton.addEventListener('click', () => {
    modalContainer.style.display = 'block'; // Display the modal window
  });

  closeBtn.addEventListener('click', () => {
    modalContainer.style.display = 'none'; // Hide the modal window when close button is clicked
  });
});