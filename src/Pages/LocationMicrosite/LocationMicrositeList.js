import HeroMain from "../../Components/HeroMain/HeroMain";
import Training from "../Training/Training";
import AboutUs from "../../Pages/About/About.js";
// import LocationMicro from "../../Components/LocationMicro/LocationMicro.js";
import Quotes from "../../Components/Quotes/Quotes.js";
import ContactUs from "../../Components/ContactUs/ContactUs.js";

const Locations = {
  janakpuri: {
    id: 1,
    slug: "janakpuri",

    pageTitle: "Train High Gym | Best for Your Fitness Goals",

    metaTitle: "Train High Gym | Best Fitness & Wellness Center in Janakpuri",

    metaDescription: "Discover the ultimate fitness experience in Janakpuri.",

    metaKeywords: "Gym in Janakpuri, Fitness Centre, Boxing, Yoga",

    author: "Train High Gym",

    metaOgTitle: "Train High Gym | Best Gym in Janakpuri",

    metaOgDescription: "Experience a fitness revolution.",

    ogType: "website",

    ogImage: "https://trainhighgym.com/images/janakpuri.webp",

    ogUrl: "https://trainhighgym.com/janakpuri",

    ogSiteName: "Train High Gym",

    phone: "+91 9876543210",

    email: "info@trainhighgym.com",

    address: "Janakpuri, New Delhi",
    section1: <HeroMain />,
    section2: <AboutUs />,
    section3: <Training />,
    section5: <Quotes />,
    section6: <ContactUs />,
  },

  "rajouri-garden": {
    id: 2,

    slug: "rajouri-garden",

    pageTitle: "Train High Gym Rajouri Garden",

    metaTitle: "Best Gym in Rajouri Garden",

    metaDescription: "Luxury Fitness Club in Rajouri Garden.",

    metaKeywords: "Gym Rajouri Garden",

    author: "Train High Gym",

    metaOgTitle: "Best Gym Rajouri Garden",

    metaOgDescription: "Join today.",

    ogType: "website",

    ogImage: "https://trainhighgym.com/images/rajouri.webp",

    ogUrl: "https://trainhighgym.com/rajouri-garden",

    ogSiteName: "Train High Gym",

    phone: "+91 9999999999",

    email: "rajouri@trainhighgym.com",

    address: "Rajouri Garden",
    section1: <HeroMain />,
    section2: <AboutUs />,
    section3: <Training />,
    section5: <Quotes />,
    section6: <ContactUs />,
  },
};

export default Locations;
