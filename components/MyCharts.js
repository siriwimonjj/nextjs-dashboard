"use client"
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

export async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default function MyChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const jsonData = await getData();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const options = {
    chart: {
      id: 'apexchart-example',
    },
    xaxis: {
      categories: data ? data.map(item => item.date.split('T')[0]) : [],
    },
  };

  const series = [{
    name: 'price',
    data: data ? data.map(item => item.price) : [],
  }];

  return (
    <>
      {data && (
        <Chart type="line" options={options} series={series} height={300} width={500} />
      )}
    </>
  );
}