function ContactUCTA({classes}) {
    return (
        <div className={`text-center ${classes}`}>
            <a href="#contact-us"
               className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 4xl:text-4xl
                        mt-0 xl:mt-10 2xl:mt-20
                        py-2 md:py-3 lg:px-4 xl:px-5 2xl:px-6 4xl:px-8
                        px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 4xl:px-16
                        no-underline bg-cta-700 rounded-full font-bold inline-block hover:bg-cta-800">
                Contact Us</a>
        </div>
    );
}

export default ContactUCTA;