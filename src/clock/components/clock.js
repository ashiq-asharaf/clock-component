import styled from "styled-components";
import { Frame } from "./frame";
import { Markings } from "./markings";
import Emitter from "../Context/Emitter";
import TaskChart from "./TaskChart";

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
  {
    startTime: '00:00', // 6:45 PM
    endTime: '00:30',   // 8:00 PM
    taskName: 'Coding Session',
    taskDescription: 'Implementing new features.',
    color: '#3CAF59', // Green
  },
];

const Container = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Clock = ({ dimens, viewBox }) => {
  return (
    <Container>
      <Markings />
      <Emitter>
        <svg viewBox={viewBox} width={dimens.w} height={dimens.h}>
          <TaskChart dimens={dimens} tasks={tasks} />
          <Frame dimens={dimens} viewBox={viewBox} />
        </svg>
      </Emitter>
    </Container>
  );
};