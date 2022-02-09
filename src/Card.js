function Card({headline, copy, doNotShowContactUs, classes}) {
    var contactUs = <div className="font-bold text-cta-500 self-end hover:text-white mr-auto hover:underline">
        <a className="content-end text-lg md:text-xl lg:text-2xl" href="#contact-us">Contact Us</a>
    </div>;
    if(doNotShowContactUs) {
        contactUs =<></>
    }
    return (
        <div className={`rounded-2xl p-4 md:p-8 lg:p-12 grid gap-4 md:gap-8 lg:gap-12 bg-purple-900/30 reveal ${classes}`}>
            <h4 className="font-light text-gray-300">{headline}</h4>
            <p className="text-gray-300">{copy}</p>
            {contactUs}
        </div>
    );
}

export default Card;