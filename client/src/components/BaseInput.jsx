import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { bool, string } from "prop-types";
import { useState } from 'react';

const labelStyles = {
    backgroundColor: '#3F4248',
    borderRadius: '5px',
    color: 'white',
    width: '30vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    fontWeight: '900',
    paddingLeft: '2vw'
}

const inputStyles = {
    borderRadius: '0 5px 5px 0',
    width: '20vw'
}

const toggleStyles = {
    color: 'black',
    position: 'absolute',
    right: '1vw',
    cursor: 'pointer'
}

const BaseInput = ({ field, type, hide }) => {
    let [ hidePassword, setHide ] = useState(true);

    if (field == "password") return (
        <label style={hide? {display:'none'} : labelStyles}>
            { field }
            <input type={type} id={field} name={field} style={field == "password" && hidePassword? {webkitTextSecurity: 'disc', ...inputStyles} : inputStyles} autoComplete="off" />
            { hidePassword && <EyeOffIcon onClick={() => setHide(false)} style={toggleStyles} /> }
            { hidePassword || <EyeIcon onClick={() => setHide(true)} style={toggleStyles} /> }
        </label>
    )

    return (
        <label style={hide? {display:'none'} : labelStyles}>
            { field }
            <input type={type} id={field} name={field} style={inputStyles} autoComplete="off" />
        </label>
    )
}

BaseInput.propTypes = {
    field: string.isRequired,
    type: string,
    hide: bool
}

BaseInput.defaultProps = {
    type: 'text'
}

export default BaseInput
