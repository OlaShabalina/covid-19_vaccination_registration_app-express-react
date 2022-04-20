import './Header.scss'

function Header() {
  return (
    <div className="header container">
      <nav className="navbar sticky-top navbar-default navbar-expand-lg navbar-light navbar-fixed-top">
        <div className="container-fluid">

          <div className="img-container navbar-brand">
            <img src="https://service.vic.gov.au/-/media/f67c12f8e6654170b6b3448deca207cd.ashx?w=100px&la=en&hash=5631F4939AEAC41A45FA2FDC4D01052ED6F2EEEF" alt="logo for the covid-19 check-in app" />
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse nav-bar-links" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" aria-current="page" href="/">Add a new user</a></li>
              <li className="nav-item"><a className="nav-link" aria-current="page" href="/users">List of all checked in users</a></li>
            </ul>
          </div>
        </div>
      </nav>  
      <h1 className="text-center">Covid-19 check-in App</h1>
    </div>
  )
}

export default Header
