import { bool, string } from "prop-types";

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
    width: '20vw',
}

const BaseInput = ({ type, field, hide }) => {
    return (
        <label style={hide? {display:'none'} : labelStyles}>
            { field }
            <input type={type} id={field} name={field} style={inputStyles} autoComplete="off" />
        </label>
    )
}

BaseInput.propTypes = {
    type: string.isRequired,
    field: string.isRequired,
    hide: bool
}

BaseInput.defaultProps = {
    type: 'text'
}

export default BaseInput
