import { number } from 'prop-types';

const AppGrid = ({ rowLength, children }) => <div style={{display:'grid',gridTemplateColumns:`repeat(${rowLength}, 1fr)`}}>{ children }</div>

AppGrid.propTypes = { rowLength: number.isRequired }

export default AppGrid
