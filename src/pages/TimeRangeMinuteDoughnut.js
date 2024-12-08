import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the datalabels plugin

// Example task data (updated for 15-minute slices)
const tasks = [
  {
    startTime: '03:15', // 3:15 AM
    endTime: '04:15',   // 4:15 AM
    taskName: 'Morning Meeting',
    taskDescription: 'Discussing project updates.',
    color: '#00BFFF', // Blue
  },
  {
    startTime: '14:30', // 2:30 PM
    endTime: '16:00',   // 4:00 PM
    taskName: 'Design Work',
    taskDescription: 'Working on UI/UX designs.',
    color: '#FFEB3B', // Yellow
  },
  {
    startTime: '18:45', // 6:45 PM
    endTime: '20:00',   // 8:00 PM
    taskName: 'Coding Session',
    taskDescription: 'Implementing new features.',
    color: '#4CAF50', // Green
  },
];

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels); // Register datalabels plugin

const TimeRangeMinuteDoughnut = () => {

    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        setIsMounted(true);
      }, []);
    
      if (!isMounted) {
        return <div>Loading...</div>; // Optional: Show loading state while waiting for the component to mount
      }

  // Convert time (HH:MM) to a minute count
  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  

  // Total slices: 1440 minutes / 15 minutes = 96 slices
  const totalSlices = 96;
  const minutesInDay = Array.from({ length: totalSlices }, (_, i) => i * 15); // Create 96 slices for 15-minute intervals

  // Map the tasks into data for the chart
  const data = {
    labels: minutesInDay.map((_, index) => index + 1), // Use labels from 1 to 96 (1 label per slice)
    datasets: [
      {
        label: '', // Clear the label (so it's empty and won't show in the legend)
        data: minutesInDay.map(() => 1), // All slices have equal size (1 for each 15-minute interval)
        backgroundColor: minutesInDay.map(minute => {
          let taskColor = '#D3D3D3'; // Default gray color for non-task minutes
          tasks.forEach(task => {
            const taskStart = convertTimeToMinutes(task.startTime);
            const taskEnd = convertTimeToMinutes(task.endTime);
            if (minute >= taskStart && minute < taskEnd) {
              taskColor = task.color; // Task-specific color
            }
          });
          return taskColor;
        }),
        borderWidth: 0, // Remove the border between slices (no lines)
      },
    ],
  };

  // Custom tooltip configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to scale with the container
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            const task = tasks.find(task => {
              const taskStart = convertTimeToMinutes(task.startTime);
              const taskEnd = convertTimeToMinutes(task.endTime);
              return index >= taskStart && index < taskEnd; // Check if the slice falls within the task's time range
            });
            return task ? task.taskName : 'No Task'; // Show task name if within the time range
          },
          label: (tooltipItem) => {
            const index = tooltipItem.dataIndex;
            const task = tasks.find(task => {
              const taskStart = convertTimeToMinutes(task.startTime);
              const taskEnd = convertTimeToMinutes(task.endTime);
              return index >= taskStart && index < taskEnd; // Check if the slice falls within the task's time range
            });
            return task ? task.taskDescription : 'No task assigned'; // Display task description or 'No task'
          },
        },
      },
      // Disable the label showing above the chart (remove the 1 to 96 labels)
      datalabels: {
        display: false, // Hide the labels on the slices
      },
    },
    cutout: '70%', // Make inner circle smaller (adjust as needed)
    elements: {
      arc: {
        borderWidth: 0, // Ensure no border around each slice
      },
    },
    legend: {
      display: false, // Hide the legend completely (including color blocks)
    },
  };

  return (
    <>
      <Doughnut data={data} options={options} />
      </>
  );
};

export default TimeRangeMinuteDoughnut;
