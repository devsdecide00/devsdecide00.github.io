import Logo from "./Logo";
import Nav from "./Nav";

function NavBar({classes}) {
    return (
        <div className={`flex items-center justify-between h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-18 4xl:h22 ${classes}`}>
            <Logo />
            <Nav />
        </div>
    );
}

export default NavBar;