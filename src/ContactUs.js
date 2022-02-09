function ContactUs({classes}) {
    return (
        <section id="contact-us">
            <div className={`${classes}`}>
                <h3 className="text-center">Contact Us</h3>
                <div className="rounded-2xl p-4 md:p-8 lg:p-12 bg-neutral-900/30">
                    <form action="https://api.devsdecide.com/contact-us" method="POST">
                        <div className="grid gap-4 md:gap-8 lg:gap-12">
                            <div className="grid sm:flex items-center sm:justify-between">
                                <label>Name</label>
                                <input name="name" type="text" required className=" sm:w-5/6 text-black" aria-label="name"/>
                            </div>
                            <div className="grid sm:flex items-center sm:justify-between">
                                <label>Email</label>
                                <input name="email" type="text" required className="sm:w-5/6 text-black" aria-label="email"/>
                            </div>
                            <div className="hidden" id="other">
                                <input name="other" type="text"/>
                                <label>Other</label>
                            </div>
                            <div className="grid sm:flex items-center sm:justify-between">
                                <label>Message</label>
                                <textarea name="message" required className="sm:w-5/6 text-black" aria-label="message"/>
                            </div>
                            <div className="no-underline bg-cta-500 rounded-full py-2 md:py-3 px-4 md:px-5 font-bold inline-block hover:bg-cta-700">
                                <input type="submit" value="Send"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    );
}

export default ContactUs;