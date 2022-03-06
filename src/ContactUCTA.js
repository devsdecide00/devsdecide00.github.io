function ContactUCTA({ classes }) {
    return (
        <div className={`${classes}`}>
            <a href="#contact-us"
                className="ctabtn text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 4xl:text-4xl
                          py-2 sm:py-3 md:py-4 lg:px-5 xl:px-6 2xl:px-7 4xl:px-9
                          px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 2xl:px-16 4xl:px-20
                          no-underline bg-cta-700 rounded-full font-bold inline-block
                          bg-transparent hover:bg-[#a855f7] text-blue-dark font-semibold hover:text-white py-2 px-4 border border-2 border-[#a855f7] rounded
                          ">
                Or Send Us A Message</a>
        </div>
    );
}

export default ContactUCTA;