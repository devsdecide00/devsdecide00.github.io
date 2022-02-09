function ContactUs({classes}) {
    return (
        <section id="contact-us">
            <div className={`${classes}`}>
                <h3 className="text-center font-bold">Contact Us</h3>
                <div className="grid lg:grid-cols-4 ">
                    <div className="rounded-2xl p-4 md:p-8 lg:p-12 bg-neutral-900/30 w-auto lg:col-span-2 lg:col-start-2">
                        <form action="https://api.devsdecide.com/contact-us" method="POST">
                            <div className="grid gap-4">
                                <div className="grid items-center">
                                    <label>Name</label>
                                    <input name="name" type="text" required className="text-black rounded-md h-8" aria-label="name"/>
                                </div>
                                <div className="grid items-center">
                                    <label>Email</label>
                                    <input name="email" type="text" required className="text-black rounded-md h-8" aria-label="email"/>
                                </div>
                                <div className="hidden" id="other">
                                    <input name="other" type="text"/>
                                    <label>Other</label>
                                </div>
                                <div className="grid items-center ">
                                    <label>Message</label>
                                    <textarea name="message" required className="text-black h-24 rounded-md" aria-label="message"/>
                                </div>
                                <div className="no-underline bg-cta-500 rounded-full py-2 md:py-3 px-4 md:px-5 font-bold inline-block hover:bg-cta-700 text-center">
                                    <input type="submit" value="Send"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </section>

    );
}

export default ContactUs;