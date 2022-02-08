function Hero() {
    return (
        <div className="h-screen">
            <img className="opacity-30 object-cover w-full h-full zoomeffect" src="herobackground.webp" alt=""/>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="grid content-center items-center gap-9">
                    <div className="text-7xl text-center">Boost Your Print Business’ Profits</div>
                    <div className="text-xl text-center">With custom reports and integrations you can have the full insights into
                        your business you’ve always wanted.</div>
                    <div className="hero-cta text-center">
                        <a href="contact-us.html" className="text-2xl no-underline bg-orange-500 rounded-full p-4 font-bold inline-block hover:bg-orange-700">Contact Us</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;