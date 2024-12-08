import { Fragment } from "react";
import styled, { css } from "styled-components";
import { RADIUS } from "../constants";

// Style for MarkingsText (Numbers 1 to 24)
const MarkingsText = styled.h4`
  position: absolute;
  color: #fff;
  font-size: 1.5rem;
  transform: translate(${(p) => `${p.x}px`}, ${(p) => `${p.y}px`})
    rotate(${(p) => `${p.angle}deg`});
`;

// Main Markings Component
export const Markings = () => {
  // Create the number marks (1 to 24), making 24 the top
  const numberMarks = Array.from({ length: 24 }, (_, index) => {
    const angle = (index * 15) - 90; // Adjust so that 24 is at the top (0 degrees)
    const x = Math.floor((RADIUS + 30) * Math.cos((angle * Math.PI) / 180)); // Offset to move the number a bit outward
    const y = Math.floor((RADIUS + 30) * Math.sin((angle * Math.PI) / 180));
    return (
      <MarkingsText key={index} x={x} y={y} angle={0}>
        {index === 0 ? 24 : index + 1}
      </MarkingsText>
    );
  });

  return (
    <>
      {numberMarks}
    </>
  );
};