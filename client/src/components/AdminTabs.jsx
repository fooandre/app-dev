import { BriefcaseIcon, ChartSquareBarIcon, ClipboardListIcon } from "@heroicons/react/outline";
import { func, string } from 'prop-types';
import { useState } from 'react';

const divStyles = {
    borderRadius: '20rem',
    backgroundImage: 'linear-gradient(45deg, orange, yellow)',
    position: 'absolute',
    top: '1vh',
    left: '47.5vw',
    width: 'fit-content',
    padding: '0.5vh',
    transform: 'translateX(-50%)'
}

const spanStyles = {
    borderRadius: '20rem',
    boxShadow: '0 1px 2px 0 black',
    color: 'white',
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
}

const svgStyles = {
    backgroundColor: 'rgb(63, 66, 72)',
    minWidth: '5vw',
    height: '5vh',
    padding: '1vh 1vw'
}

const hoverStyles = {
    backgroundImage: 'linear-gradient(45deg, orange, yellow)',
    color: 'rgb(63, 66, 72)',
    minWidth: '5vw',
    height: '5vh',
    padding: '1vh 1vw'
}

const AdminTabs = ({ show, toggleDisplay }) => {
    let [ showCartDialog, setCartDialog ] = useState(true);
    let [ showPurchasesDialog, setPurchasesDialog ] = useState(false);

  return (
    <div style={divStyles}>
        <span style={spanStyles}>
            <ChartSquareBarIcon onClick={() => toggleDisplay("analytics")} style={show == "analytics"? hoverStyles : svgStyles} />
            <ClipboardListIcon onClick={() => toggleDisplay("orders")} style={show == "orders"? hoverStyles : svgStyles} />
            <BriefcaseIcon onClick={() => toggleDisplay("inventory")} style={show == "inventory"? hoverStyles : svgStyles} />
        </span>
    </div>
  )
};

AdminTabs.propTypes = {
    show: string.isRequired,
    toggleDisplay: func.isRequired
}

export default AdminTabs;
