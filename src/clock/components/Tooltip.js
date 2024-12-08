import styled from 'styled-components';

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
  border-radius: 3px;
  white-space: pre-wrap;
  visibility: visible;
  opacity: 1;
  transition: opacity 0.3s, visibility 0.3s;
  pointer-events: none; /* Ensure tooltip doesn't interfere with mouse events */
`;

export default Tooltip;