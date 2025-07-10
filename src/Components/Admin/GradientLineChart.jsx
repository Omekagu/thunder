// components/GradientLineChart.jsx
'use client'

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function GradientLineChart () {
  const chartRef = useRef(null)

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, 0, 200)
    gradient.addColorStop(0, 'rgba(255, 99, 132, 0.5)')
    gradient.addColorStop(1, 'rgba(153, 102, 255, 0.1)')

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Series A',
            data: [3, 15, 10, 20, 13, 35],
            fill: true,
            backgroundColor: gradient,
            borderColor: '#ff6384',
            tension: 0.4,
            pointBackgroundColor: [
              'transparent',
              'transparent',
              'transparent',
              '#ff9f40',
              'transparent',
              'transparent'
            ],
            pointRadius: [0, 0, 0, 6, 0, 0]
          },
          {
            label: 'Series B',
            data: [2, 9, 12, 10, 15, 30],
            fill: true,
            backgroundColor: 'rgba(153, 102, 255, 0.1)',
            borderColor: '#9966ff',
            tension: 0.4,
            pointBackgroundColor: [
              'transparent',
              'transparent',
              'transparent',
              '#9966ff',
              'transparent',
              'transparent'
            ],
            pointRadius: [0, 0, 0, 6, 0, 0]
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 5 }
          }
        }
      }
    })

    return () => chart.destroy()
  }, [])

  return (
    <div className='chartWrapper'>
      <canvas ref={chartRef} />
    </div>
  )
}
