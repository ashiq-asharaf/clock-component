import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the datalabels plugin

// Example task data
const tasks = [
  {
    startTime: 9, // 9 AM
    endTime: 12,  // 12 PM
    taskName: 'Morning Meeting',
    taskDescription: 'Discussing project updates.',
    color: '#00BFFF', // Blue
  },
  {
    startTime: 14, // 2 PM
    endTime: 16,  // 4 PM
    taskName: 'Design Work',
    taskDescription: 'Working on UI/UX designs.',
    color: '#FFEB3B', // Yellow
  },
  {
    startTime: 18, // 6 PM
    endTime: 20,  // 8 PM
    taskName: 'Coding Session',
    taskDescription: 'Implementing new features.',
    color: '#4CAF50', // Green
  },
];

// Register Chart.js components (correctly for version 3+)
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels); // Register datalabels plugin

const TimeRangeDoughnut = () => {
  // Create an array of 24 hours (0 to 23)
  const hoursInDay = Array.from({ length: 24 }, (_, i) => i);

  // Map the tasks into data for the chart
  const data = {
    labels: hoursInDay.map(hour => `${hour + 1}`), // Labels will now be 1 to 24
    datasets: [
      {
        label: 'Time Range',
        data: hoursInDay.map(() => 1), // All slices have equal size (1 for each hour)
        backgroundColor: hoursInDay.map(hour => {
          let taskColor = '#D3D3D3'; // Default gray color for non-task hours
          tasks.forEach(task => {
            // If the hour falls within the task time range, set the task color
            if (hour >= task.startTime && hour < task.endTime) {
              taskColor = task.color; // Task-specific color
            }
          });
          return taskColor;
        }),
        borderWidth: 1,
      },
    ],
  };

  // Custom tooltip
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to scale with the container
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;  // Get the index of the hovered slice (hour)
            const hour = hoursInDay[index];  // Get the corresponding hour
            const task = tasks.find(
              (task) =>
                (hour >= task.startTime && hour < task.endTime) ||
                (hour + 1 > task.startTime && hour + 1 <= task.endTime)
            );
            return task ? task.taskName : ''; // Show task name only for tasks
          },
          label: (tooltipItem) => {
            const index = tooltipItem.dataIndex;  // Get the index of the hovered slice (hour)
            const hour = hoursInDay[index];  // Get the corresponding hour
            const task = tasks.find(
              (task) =>
                (hour >= task.startTime && hour < task.endTime) ||
                (hour + 1 > task.startTime && hour + 1 <= task.endTime)
            );
            return task ? task.taskDescription : 'No task'; // Display task description or 'No task'
          },
        },
      },
      // Enable datalabels plugin
      datalabels: {
        display: true,
        formatter: (value, context) => {
          const index = context.dataIndex;
          return index + 1; // Display hours as 1 to 24
        },
        color: '#000000', // Color for the numbers
        font: {
          weight: 'bold',
          size: 14, // Adjust size as needed
        },
        anchor: 'center', // Position number in the center of the slice
        align: 'center',
      },
    },
    cutout: '10%', // Smaller inner circle, change this value to adjust the size
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <h3>Time Range Doughnut Chart with Tasks</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default TimeRangeDoughnut;
