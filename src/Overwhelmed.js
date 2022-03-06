import Card from "./Card";
import ContactUCTA from "./ContactUCTA";
import BookUCTA from "./BookUCTA";

function Overwhelmed({classes}) {
    return (
        <section id="overwhelmed">
            <div className={`${classes} display-off`}>
                <h2 className="font-bold text-gray-400 section-header">Feeling <span className="text-white">Overwhelmed</span> Is A Sign Of Lost <span className="text-white">Profits</span></h2>
                <div className="use-cases-overlay lg:hidden">
                    <div className="wrapper">
                        <div className="grid gap-8 lg:grid-cols-2 grid-cols-1">
                            <div className={``}>
                                <img src={`supplies.svg`} alt={``} className={`m-auto w-1/2`}/>
                            </div>
                            <Card headline="Supply Monitoring"
                                  copy="Have supply shortages forced you to constantly refresh your supplier's page to check their inventory? Tasks like these not only remind you of the current issues with supply chains but also zap your energy to run your business."/>
                            <div className={``}>
                                <img src={`training.svg`} alt={``} className={`m-auto w-1/2`}/>
                            </div>
                            <Card classes="" headline="Feels Like You're Running A Training Business?"
                                  copy={`With a tight labor market employee churn will eat into profits. Onboarding and training employees is vital to running an efficient business, but if you have too many things to teach it will take a long time to reap those efficiencies if ever.`}
                            />
                            <div className={``}>
                                <img src={`tedious.svg`} alt={``} className={`m-auto w-1/2`}/>
                            </div>
                            <Card headline="Cut The Tedious Work"
                                  copy="Not having to do tedious tasks over and over and over boost your profits without decreasing your revenue."
                            />
                        </div>
                    </div>
                </div>
                <div className="use-cases-overlay hidden lg:block">
                    <div className="wrapper">
                        <div className="grid gap-8 lg:grid-cols-2 grid-cols-1">
                            <Card headline="Supply Monitoring"
                                  copy="Have supply shortages forced you to constantly refresh your supplier's page to check their inventory? Tasks like these not only remind you of the current issues with supply chains but also zap your energy to run your business."/>
                            <div className={`self-center mr-auto`}>
                                <img src={`supplies.svg`} alt={``} className={`w-3/4`}/>
                            </div>
                            <div className={`self-center`}>
                                <img src={`training.svg`} alt={``} className={`w-3/4 ml-auto`}/>
                            </div>
                            <Card classes="" headline="Feels Like You're Running A Training Business?"
                                  copy={`With a tight labor market employee churn will eat into profits. Onboarding and training employees is vital to running an efficient business, but if you have too many things to teach it will take a long time to reap those efficiencies if ever.`}
                            />
                            <Card headline="Cut The Tedious Work"
                                  copy="Not having to do tedious tasks over and over and over boost your profits without decreasing your revenue."
                            />
                            <div className={`self-center`}>
                                <img src={`tedious.svg`} alt={``} className={`w-3/4 ml-auto`}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`pt-8 md:pt-10 lg:pt-12 xl:pt-14 2xl:pt-16 4xl:pt-20 flex gap-4 justify-center`}>
                    <BookUCTA/>
                    <ContactUCTA/>
                </div>
            </div>
        </section>
    );
}

export default Overwhelmed;