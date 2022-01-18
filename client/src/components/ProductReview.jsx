const reviewStyles = {
    borderRadius: '5px',
    border: '1px solid black',
    width: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    gap: '1vh',
    margin: '0.5vh 0 0 0',
    padding: '1vh 1vw'
}

const inlineStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}

const h2Styles = {
    fontSize: 'inherit'
}

const h3Styles = {
    fontStyle: 'italic',
    fontSize: '0.9rem'
}

const BaseReview = ({ review }) => {
    const { user: { _id: id, username }, rating, comment, date } = review;

    const msPerDay = 1000 * 60 * 60 * 24;

    const dateDiffInDays = date => {
        const dateUtc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

        const currentDate = new Date();
        const currentUtc = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

        return Math.floor((currentUtc - dateUtc) / msPerDay);
    }

    const dateDiff = dateDiffInDays(date);

    return (
        <div style={reviewStyles}>
            <div style={inlineStyles}>
                <h2 style={h2Styles}>@{ id }</h2>
                <h3 style={h3Styles}>{ dateDiff } days ago</h3>
            </div>

            <p>{ comment }</p>
        </div>
    )
}

export default BaseReview