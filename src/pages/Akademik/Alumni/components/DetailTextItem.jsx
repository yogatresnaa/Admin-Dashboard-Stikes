export default function DetailTextItem({ title, value }) {
    return (
        <div
            className="d-flex gap-2 justify-content-center align-items-center flex-grow-1 py-2 "
            style={{ wordBreak: 'break-word' }}
        >
            <p style={{ flex: 2, fontSize: '0.8em' }}>{title}</p>
            <p style={{ flex: '0.2' }}>:</p>
            <p
                style={{
                    flex: '2',
                    boxSizing: 'border-box',
                    fontSize: '0.8em',
                }}
            >
                {value}
            </p>
        </div>
    )
}
