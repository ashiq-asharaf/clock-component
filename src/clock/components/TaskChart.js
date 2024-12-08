import React, { useState } from "react";
import styled from "styled-components";
import { RADIUS } from "../constants"; // Assuming RADIUS is defined globally
import Tooltip from "./Tooltip";

const TaskChart = ({ dimens, tasks }) => {
  const w = dimens.w;
  const h = dimens.h;

  const cx = w / 2 || 0;
  const cy = h / 2 || 0;

  // Ensure the circle and the doughnut chart fit inside the same container
  const svgWidth = w;
  const svgHeight = h;

  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const timeToDegrees = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    return (totalMinutes / (24 * 60)) * 360;
  };

  const renderPieSlices = () => {
    return tasks.map((task, index) => {
      const startDegrees = timeToDegrees(task.startTime);
      const endDegrees = timeToDegrees(task.endTime);

      const startAngle = startDegrees - 90;
      const endAngle = endDegrees - 90;

      const startRadians = (startAngle * Math.PI) / 180;
      const endRadians = (endAngle * Math.PI) / 180;

      const x1 = cx + RADIUS * Math.cos(startRadians);
      const y1 = cy + RADIUS * Math.sin(startRadians);
      const x2 = cx + RADIUS * Math.cos(endRadians);
      const y2 = cy + RADIUS * Math.sin(endRadians);

      const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

      const pathData = [
        `M ${cx} ${cy}`,
        `L ${x1} ${y1}`,
        `A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `Z`,
      ].join(' ');

      return (
        <path
          key={index}
          d={pathData}
          fill={task.color}
          stroke="none"
          onMouseEnter={(e) => {
            const rect = e.target.getBoundingClientRect();
            setTooltipContent(`${task.taskName}\n${task.startTime} - ${task.endTime}\n${task.taskDescription}`);
            setTooltipPosition({ x: rect.left + rect.width / 2, y: rect.top });
          }}
          onMouseLeave={() => {
            setTooltipContent(null);
          }}
        />
      );
    });
  };

  return (
    <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} xmlns="http://www.w3.org/2000/svg">
      {/* Draw the outer circle */}
      <circle
        cx={cx}
        cy={cy}
        r={RADIUS}
        fill="none"
        stroke="#FBDE44FF"
        style={{
          filter: "drop-shadow(0px 0px 10px #FBDE44FF)",
        }}
      />

      {/* Render the pie slices */}
      {renderPieSlices()}

      {/* Tooltip */}
      {tooltipContent && (
        <foreignObject x={tooltipPosition.x} y={tooltipPosition.y} width="100" height="100">
          <Tooltip>{tooltipContent}</Tooltip>
        </foreignObject>
      )}
    </svg>
  );
};

export default TaskChart;