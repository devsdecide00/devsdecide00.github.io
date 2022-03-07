import Card from "./Card";
import ContactUCTA from "./ContactUCTA";

function HowWe({classes}) {
    return (
        <section id="how-we">
            <div className={`${classes}`}>
                <h2 className="text-center font-bold text-gray-400 section-header">We're Not Like Those <span className="text-white">Other</span> Software Companies</h2>
                <div className="pb-10">
                    <Card headline="A Clear Focus On Results"
                          copy={`From our first meeting to our last we will always ask "How is your business doing?" Our unique style allows us to provide solutions that best suit your business. 
                          For this reason all our engagements start off with a technology strategy kick off meeting.
                          Here's how we stack up to the competition in an initial meeting.`}
                          component={
                              <div className={`grid`}>
                                  <div className={`justify-center flex`}>
                                      <Card headline={`Them`}
                                            points={["Let’s focus on improving you digital presence", "Let’s digitize your print wall", "Let’s roll out a new CRM", "Sounds like you could use an ERP", "Great let’s get the ball rolling on this"]}
                                            listIcon={`fa-solid fa-hand text-red-500`}
                                            transparentBg={true}
                                      />
                                      <Card headline={`Us`}
                                            points={["How do  new customers find out about you? How large was their sales order?", "How does your team currently communicate? When was the last time there was a miscommunication?", "How much of your business currently comes from recurring customers?","Has there ever been a time where you forgot to order more supplies? What effect did that have on your business?", "If you say yes to this what are you saying no to?"]}
                                            listIcon={`fa-solid fa-circle-check text-green-500`}
                                            transparentBg={true}
                                      />
                                  </div>
                                  <ContactUCTA />
                              </div>
                                  }
                    />
                </div>
            </div>
        </section>
    );
}

export default HowWe;