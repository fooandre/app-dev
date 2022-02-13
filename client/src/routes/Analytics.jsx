import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const sectionStyles = {
  display: 'flex',
  flexDirection: 'column'
};

const Analytics = () => {
  let [totalRevenue, setRevenue] = useState(0);
  let [labels, setLabels] = useState([]);
  let [data, setData] = useState([]);

  useEffect(async () => {
    try {
      const res = await fetch('api/topRanking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: JSON.parse(sessionStorage.getItem('userId')) })
      });

      const { success, products, totalRevenue } = await res.json();

      if (success) {
        setLabels(
          products.map(
            ({ productName }) => productName.slice(0, 1).toUpperCase() + productName.slice(1)
          )
        );
        setData(products.map(({ revenue }) => revenue));
        setRevenue(totalRevenue);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const state = {
    labels: labels,
    datasets: [
      {
        label: 'Revenue earned',
        data: data,
        backgroundColor: '#3490dc',
        hoverBackgroundColor: '#1d4f79'
      }
    ]
  };

  if (data)
    return (
      <Bar
        data={state}
        options={{
          indexAxis: 'y',
          plugins: {
            title: {
              display: true,
              text: 'Your top selling products',
              font: {
                size: 24
              }
            },
            subtitle: {
              display: true,
              text: `Total revenue earned from top selling products: $${totalRevenue.toFixed(2)}`,
              font: {
                size: 16
              }
            },
            legend: {
              labels: {
                font: {
                  size: 14
                }
              }
            },
            tooltip: {
              callbacks: {
                title: (context) => 'Revenue earned from sales of this product',
                label: ({ parsed: { x } }) =>
                  Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(x)
              }
            }
          }
        }}
      />
    );

  return 'Fetching data...';
};

export default Analytics;
