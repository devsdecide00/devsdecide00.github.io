import Logo from "./Logo";
import Nav from "./Nav";

function NavBar({classes}) {
    return (
        <div className={`flex items-center justify-between h-16 ${classes}`}>
            <Logo />
            <Nav />
        </div>
    );
}

export default NavBar;