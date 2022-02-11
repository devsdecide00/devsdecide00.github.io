import ContactUCTA from "./ContactUCTA";

function Hero({classes}) {
    return (
        <section id={`hero`} className={`h-screen m-0 rounded-none grid items-center ${classes}`}>
            <div className="section-wrapper-padding grid gap-20">
                <div className={`grid items-center gap-24 lg:grid-cols-2`}>
                    <div className="grid content-center items-center gap-4 2xl:gap-16 h-1/2">
                        <h1 className="text-center font-bold lg:text-left">Boost Your Print Shop’s Profits</h1>
                        <sub className="text-center lg:text-left">With just a few custom reports and integrations you can get existing customers coming back for more and new customers buying more.</sub>
                    </div>
                    <div className={``}>
                        <img src={`drawing.svg`} className={`h-1/2 w-1/2 lg:h-full lg:w-full mx-auto`} alt={``}/>
                    </div>
                </div>
                <div className={`grid gap-6`}>
                    <ContactUCTA />
                    <div className="indicator m-auto self-end
                        h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-18
                        w-5  md:w-6 lg:w-7 xl:w-8 2xl:w-9" />
                </div>
            </div>
        </section>
    );
}

export default Hero;