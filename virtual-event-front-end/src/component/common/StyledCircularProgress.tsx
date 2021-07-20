import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledCircularProgress = styled(CircularProgress)`
  &.MuiCircularProgress-root {
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
  }
`;

export default StyledCircularProgress;
