import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Box, Chip, styled } from '@mui/material';


const LocationChip1 = styled(Chip)({
    // marginTop: '15px',
    fontFamily: 'Anta',
    fontSize: '18px',
    textAlign:'center'
  });


const PaymentAnalysis = ({ hostelId }) => {
  const [chartData, setChartData] = useState(null);

  // useEffect(() => {
  //   const fetchAnalysis = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.REACT_APP_URL}/admin/payment-analysis`, {
  //         params: { hostelId },
  //       });
  //       const data = response.data;

  //       // Prepare chart data
  //       setChartData({
  //         labels: data.map((d) => d.month),
  //         datasets: [
  //           {
  //             label: 'Paid',
  //             data: data.map((d) => d.paidCount),
  //             backgroundColor: 'rgba(75, 192, 192, 0.6)',
  //           },
  //           {
  //             label: 'Unpaid',
  //             data: data.map((d) => d.unpaidCount),
  //             backgroundColor: 'rgba(255, 99, 132, 0.6)',
  //           },
  //         ],
  //       });
  //     } catch (err) {
  //       console.error('Failed to fetch analysis data:', err);
  //     }
  //   };

  //   fetchAnalysis();
  // }, [hostelId]);


  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/admin/payment-analysis`, {
          params: { hostelId },
        });
        const data = response.data;
  
        // Ensure the response structure matches your expectation
        if (!data || !Array.isArray(data.analysis)) {
          throw new Error('Invalid API response format');
        }
  
        // Prepare chart data using the "analysis" array
        setChartData({
          labels: data.analysis.map((d) => d.month), // Access the "analysis" array
          datasets: [
            {
              label: 'Paid',
              data: data.analysis.map((d) => d.paidCount),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
              label: 'Unpaid',
              data: data.analysis.map((d) => d.unpaidCount),
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
          ],
        });
      } catch (err) {
        console.error('Failed to fetch analysis data:', err);
      }
    };
  
    fetchAnalysis();
  }, [hostelId]);
  

  if (!chartData) return <p>Loading...</p>;

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>

<Box  textAlign={'center'}>
<LocationChip1 label={'Payments in Last 3 Months'} style={{marginBottom:'15px',marginTop:'25px'}}/>

        </Box>

      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        }}
      />
    </div>
  );
};

export default PaymentAnalysis;
