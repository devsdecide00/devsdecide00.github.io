import Card from "./Card";

function Overwhelmed({classes}) {
    return (
        <section id="overwhelmed">
            <div className={`${classes}`}>
                <h2 className="text-center font-bold text-gray-400 section-header">Stop Feeling <span
                    className="text-white">Overwhelmed</span></h2>
                <div className="use-cases-overlay">
                    <div className="wrapper">
                        <div className="grid gap-8 lg:grid-cols-2 grid-cols-1">
                            <Card headline="Remove Long Training"
                                  copy='Onboarding a new employee is complicated enough when you are teaching them your business add on top of that all the software you use to run your business and it can get out of control. We have created several integrations that have remove tons of manual steps and reduced the amount of knowledge needed to onboard employees.'/>
                            <Card
                                classes="row-span-2"
                                headline="Supply Monitoring"
                                copy="Have supply shortages forced you to constantly refresh your supplier's page to check their inventory? We have created custom integrations for suppliers so that you get alerted as soon as the supplies you need are available."/>
                            <Card headline="Auto Shipping Tags"
                                  copy="Basic tasks can make a world of difference and that's what we did for one of our clients. They found it so annoying to have to switch between two different pieces of software to make a simple shipping tag after a job was complete. They asked Can't the computer just do it itself? We let them know we could make it do just that."/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Overwhelmed;