import Card from "./Card";
import ContactUCTA from "./ContactUCTA";
import BookUCTA from "./BookUCTA";

function AlternateImgCard({ classes, cardsWithImages = [], sectionTitle }) {
    return (
        <section id="sales" className="">
            <div className={`${classes}`}>
                <h2 className="font-bold text-gray-400 section-header">{sectionTitle}</h2>
                <div className="use-cases-overlay lg:hidden">
                    <div className="wrapper">
                        <div className="grid gap-8 lg:grid-cols-2 grid-cols-1">
                            {cardsWithImages.map((ci, index) => {
                                return (
                                    <div key={index}>
                                        <div className={`self-center`}>
                                            <img src={ci.imageURI} alt={``} className={`m-auto w-1/2`} />
                                        </div>
                                        {ci.card}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="use-cases-overlay hidden lg:block">
                    <div className="wrapper">
                        <div>
                            {cardsWithImages.map((ci, index) => {
                                if (index % 2 === 1) {
                                    return (
                                        <div key={index} className="grid gap-8 lg:grid-cols-2 grid-cols-1">
                                            <div className={`self-center`}>
                                                <img src={ci.imageURI} alt={``} className={`ml-auto w-2/3`} />
                                            </div>
                                            {ci.card}
                                        </div>
                                    );
                                }
                                else {
                                    return (
                                        <div key={index} className="grid gap-8 lg:grid-cols-2 grid-cols-1">
                                            {ci.card}
                                            <div className={`self-center`}>
                                                <img src={ci.imageURI} alt={``} className={`mr-auto w-2/3`} />
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className={`pt-8 md:pt-10 lg:pt-12 xl:pt-14 2xl:pt-16 4xl:pt-20 flex gap-4 justify-center`}>
                    <BookUCTA />
                    <ContactUCTA />
                </div>
            </div>
        </section>
    );
}

export default AlternateImgCard;