import { number } from 'prop-types';

// TODO: remove rowLength and implement dynamic gridTemplateColumns (maybe)

const AppGrid = ({ rowLength, children }) => {
    const gridStyles = {
        display: 'grid',
        gridTemplateColumns:`repeat(${rowLength}, 1fr)`,
    }

    return <div style={gridStyles}>{ children }</div>
}

AppGrid.propTypes = { rowLength: number.isRequired }

export default AppGrid
