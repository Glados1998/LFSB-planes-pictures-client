import {useTranslations} from "next-intl";


export default function About() {

    const t = useTranslations("about");

    return (
        <div className="container">
            <h1>About Us</h1>
            <p>Welcome to our website! We are passionate about aviation and dedicated to providing you with the best
                experience possible. Our mission is to connect aviation enthusiasts, professionals, and hobbyists from
                around the world through our platform.</p>
            <p>Our team is made up of aviation experts, developers, and designers who work tirelessly to create a
                user-friendly and informative website. We strive to offer a comprehensive database of aircraft, news,
                and resources for everyone interested in aviation.</p>
            <p>Thank you for visiting our site, and we hope you find it useful and enjoyable!</p>
        </div>
    );
}
