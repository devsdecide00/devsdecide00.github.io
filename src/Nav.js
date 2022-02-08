function Nav() {
    return (
        <ul className="flex font-bold text-base hidden md:flex">
            <li className="px-3 hover:text-orange-500 hover:underline"><a href="/">Home</a></li>
            <li className="pl-3 hover:text-orange-500 hover:underline"><a href="contact-us.html">Contact Us</a></li>
        </ul>
    );
}

export default Nav;