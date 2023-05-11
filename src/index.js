import chart from './scripts/chart';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('All is well.');

  const chartEle = document.getElementById('chart');
  const searchButton = document.getElementById('searchButton');
  const artistNameInput = document.getElementById('artistNameInput');

  searchButton.addEventListener('click', async () => {
    const artistName = artistNameInput.value;
    chartEle.innerHTML = ''; 
    chartEle.append(await chart(artistName));
  });
});
