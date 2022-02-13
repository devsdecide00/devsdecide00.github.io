import ContactUCTA from "./ContactUCTA";

function Hero({classes}) {
    return (
        <section id={`hero`} className={`h-screen m-0 rounded-none grid items-center overflow-hidden ${classes}`}>
            <div className="section-wrapper-padding grid gap-20 max-w-[1600px]">
                <div className={`grid items-center gap-24 lg:grid-cols-[60%_fit-content(40%)]`}>
                    <div className="grid content-center items-center gap-4 2xl:gap-16 h-1/2">
                        <h1 className="text-center font-bold lg:text-left">Boost Your Print Shop’s Profits</h1>
                        <sub className="text-center lg:text-left">With just a few custom reports and integrations you can get existing customers coming back for more and new customers buying more.</sub>
                    </div>
                    <img src={`drawing.svg`} className={`object-contain`} alt={``}/>
                </div>
                <div className={`grid gap-6`}>
                    <ContactUCTA />
                    <div className="indicator m-auto self-end
                        h-8     md:h-12    lg:h-14 xl:h-16     2xl:h-18
                        w-3     md:w-4     lg:w-5  xl:w-6      2xl:w-7" />
                </div>
            </div>
        </section>
    );
}

export default Hero;