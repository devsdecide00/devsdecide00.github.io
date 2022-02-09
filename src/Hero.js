function Hero() {
    return (
        <div className="h-screen">
            <div className="w-full h-full overflow-hidden">
                <img className="opacity-30 object-cover w-full h-full zoomeffect" src="herobackground.webp" alt=""/>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="grid content-center items-center gap-9">
                    <h1 className="text-center">Boost Your Print Business’ Profits</h1>
                    <h6 className="text-center">With custom reports and integrations you can have the full insights into your business you’ve always wanted.</h6>
                    <div className="hero-cta text-center">
                        <a href="contact-us.html" className="no-underline bg-orange-500 rounded-full py-2 md:py-3 px-4 md:px-5 font-bold inline-block hover:bg-orange-700">Contact Us</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;