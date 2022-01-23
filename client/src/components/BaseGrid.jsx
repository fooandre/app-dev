import { number } from 'prop-types';

// TODO: remove rowLength and implement dynamic gridTemplateColumns

const AppGrid = ({ rowLength, children }) => {
    const gridStyles = {
        display: 'grid',
        gridTemplateColumns:`repeat(${rowLength}, 1fr)`,
        gridGap: '1vh'
    }

    return <div style={gridStyles}>{ children }</div>
}

AppGrid.propTypes = { rowLength: number.isRequired }

export default AppGrid
