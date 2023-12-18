export default function PageTitle({ semester }) {

    return (
        <div className="pageTitleBox">
            <div className="container">
                <div className="pageTitle">
                    <h2>{semester}</h2>
                </div>
            </div>
        </div>
    )
}