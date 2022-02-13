import { array, string } from 'prop-types';

const tableStyles = {
  border: '1px solid black',
  borderCollapse: 'collapse',
  justifyContent: 'space-between',
  padding: '1vh 1vw'
};

const captionStyles = {
  width: 'fit-content',
  color: 'rgb(63, 66, 72)',
  textAlign: 'left',
  marginBottom: '2vh'
};

const headStyles = {
  backgroundColor: 'rgb(240, 240, 240)',
  fontWeight: '700'
};

const BaseTable = ({ label, columns, children }) => {
  let head = [];
  let body = [];

  for (const column of columns) head.push(<td key={column}>{column}</td>);

  return (
    <table style={tableStyles}>
      <caption style={captionStyles}>{label}</caption>
      <thead style={headStyles}>
        <tr>{head}</tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

BaseTable.propTypes = {
  label: string,
  columns: array.isRequired
};

export default BaseTable;
