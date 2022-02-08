import Logo from "./Logo";
import Nav from "./Nav";

function NavBar() {
    return (
        <div className="flex items-center justify-between text-xl h-16 max-w-7xl mx-auto px-8">
            <Logo />
            <Nav />
        </div>
    );
}

export default NavBar;