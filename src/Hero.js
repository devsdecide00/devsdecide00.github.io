import ContactUCTA from "./ContactUCTA";

function Hero({classes}) {
    return (
        <div className={`h-screen ${classes}`}>
            <div className="w-full h-full overflow-hidden">
                <div className="object-cover w-full h-full zoomeffect" id="backgroundhero"/>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full -translate-y-1/2 mx-auto px-10 md:px-14 lg:px-18 xl:px-22 2xl:px-26">
                <div className="grid content-center items-center gap-16">
                    <h1 className="text-center font-bold w-5/6 m-auto">Boost Your Print Business’ Profits</h1>
                    <sub className="text-center">With custom reports and integrations you can have the full insights into your business you’ve always wanted.</sub>
                    <ContactUCTA />
                </div>
            </div>
        </div>
    );
}

export default Hero;