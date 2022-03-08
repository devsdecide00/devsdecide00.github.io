import BookUCTA from "./BookUCTA";

function Hero({classes}) {
    return (
        <section id={`hero`} className={` m-0 rounded-none grid items-center overflow-hidden relative ${classes}`}>
            <div className="section-wrapper-padding max-w-[1600px] ">
                <div className={`grid items-center gap-6 2xl:gap-8 lg:grid-cols-[55%_fit-content(45%)]`}>
                    <div className="grid content-center items-center gap-4 2xl:gap-16 h-1/2">
                        <h1 className="text-center font-bold lg:text-left">Boost Your Print Shop’s Profits</h1>
                        <sub className="text-center lg:text-left">With just a few custom reports and integrations your business could make the same amount of money with less work</sub>
                        <BookUCTA classes={`text-center lg:text-left`} />
                    </div>
                    <img src={`drawing.svg`} className={`object-contain w-1/2 lg:w-full mx-auto`}  alt={``}/>
                </div>
                <div id={`indicator`} className={`grid justify-center gap-4 absolute bottom-[2%] left-[50%] -translate-x-1/2`}>
                    <span className={`w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8ª`} style={{margin:"auto"}}></span>
                    <div className={`opacity-50`}>
                        Scroll
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;