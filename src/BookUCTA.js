import {PopupButton} from "react-calendly";

function BookUCTA({classes}) {
    return (
        <div className={`${classes}`}>
            <PopupButton
                className="ctabtn
                           text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 4xl:text-4xl
                           py-2 sm:py-3 md:py-4 lg:px-5 xl:px-6 2xl:px-7 4xl:px-9
                           px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 2xl:px-16 4xl:px-20
                           no-underline bg-cta-700 rounded-full font-bold inline-block"
                pageSettings={{
                    backgroundColor: 'ffffff',
                    hideEventTypeDetails: false,
                    hideGdprBanner: true,
                    hideLandingPageDetails: false,
                    primaryColor: '00a2ff',
                    textColor: '4d5055'
                }}
                styles={{}}
                text="Book A Free Strategy Session"
                url="https://calendly.com/solomon-12"
            />
        </div>
    );
}

export default BookUCTA;