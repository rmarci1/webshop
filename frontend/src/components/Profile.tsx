export default function Profile(){
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mx-auto">
                <a className="navbar-brand" href="/" style={{ marginLeft: 10 }}>
                    Home
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/products">
                                Products
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}