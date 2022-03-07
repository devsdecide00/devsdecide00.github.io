import React from "react";

class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sending: false};
    }

    handleSubmit = () => {
        console.log("dsafasd")
        this.setState({sending: true})
    }

    render() {
        const {classes} = this.props;
        return (
            <section id="contact-us">
                <div className={`${classes}`}>
                    <h3 className="text-center font-bold section-header">How can we help?</h3>
                    <h6 className="text-center font-light section-header">We'll email you back within one business day to get to know more about your business. We will not use your email for any marketing purposes. </h6>
                    <div className="grid lg:grid-cols-4 ">
                        <div
                            className="rounded-2xl p-4 md:p-8 lg:p-12 bg-purple-900/30 w-auto lg:col-span-2 lg:col-start-2">
                            <form action="https://api.devsdecide.com/contact-us" method="POST" onSubmit={this.handleSubmit}>
                                <div className="grid gap-4">
                                    <div className="grid items-center">
                                        <label>Name</label>
                                        <input name="name" type="text" required className="text-black rounded-md h-8"
                                               aria-label="name"/>
                                    </div>
                                    <div className="grid items-center">
                                        <label>Email</label>
                                        <input name="email" type="text" required className="text-black rounded-md h-8"
                                               aria-label="email"/>
                                    </div>
                                    <div className="hidden" id="other">
                                        <input name="other" type="text"/>
                                        <label>Other</label>
                                    </div>
                                    <div className="grid items-center ">
                                        <label>Message</label>
                                        <textarea name="message" required className="text-black h-24 rounded-md"
                                                  aria-label="message"/>
                                    </div>
                                    <input type="submit" value={this.state.sending?"Sending...":"Send"} disabled={this.state.sending}
                                           className={`no-underline bg-cta-700 rounded-full py-2 md:py-3 px-4 md:px-5 inline-block hover:bg-cta-800 text-center text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold disabled:opacity-40`}>
                                    </input>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default ContactUs;