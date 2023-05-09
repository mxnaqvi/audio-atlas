import chart from './scripts/chart';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('All is well.');
  const chartEle = document.getElementById('chart');
  chartEle.append(await chart());
});