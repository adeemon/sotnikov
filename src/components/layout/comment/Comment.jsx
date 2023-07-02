export function Comment({body, email, name}) {
    return (
        <div className="container">
            <div className="name">
                {name}
            </div>
            <div className="email">
                {email}
            </div>
            <div className="body">
                {body}
            </div>
        </div>
    )
}