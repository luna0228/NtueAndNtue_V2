import Nav from "./Nav";

export default function Header({ school, semester }) {
    const titles = (ev) => {
        let title
        if (school == 'ntut') {
            title = 'NTUT-IXD'
        }
        else if (school == 'ntue') {
            title = 'NTUE-DTD'
        }
        return title
    }
    return (
        <header className="fixed-top ">
            <div className="container">
                <nav className="navbar bg-opacity-50">
                    <a className="navbar-brand text-uppercase" href="#">{titles()}</a>
                    <Nav school={school} semester={semester} />
                </nav>
            </div>

        </header>

    )
}