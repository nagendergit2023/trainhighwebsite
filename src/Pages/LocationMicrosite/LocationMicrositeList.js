import HeroMain from "../../Components/HeroMain/HeroMain";
import Training from "../Training/Training";
import AboutUs from "../../Pages/About/About.js";
// import LocationMicro from "../../Components/LocationMicro/LocationMicro.js";
import Quotes from "../../Components/Quotes/Quotes.js";
import ContactUs from "../../Components/ContactUs/ContactUs.js";
import JanakpuriImage from "../../assets/images/locations/janakpuri.jpg";
import RajouriGardenImage from "../../assets/images/locations/rajouri_Garden.jpg";

const absoluteAssetUrl = (asset) => new URL(asset, "https://trainhighgym.com/").toString();

const Locations = {
  janakpuri: {
    id: 1,
    slug: "janakpuri",
    name: "Train High Gym - Janakpuri",
    heading: "Train High Gym in Janakpuri, New Delhi",
    pageTitle: "Gym in Janakpuri, New Delhi | Train High Gym",
    metaDescription: "Visit Train High Gym in Janakpuri, New Delhi. Find our A-3/30 Block A3 location, explore fitness training and classes, and contact the team about visiting or membership.",
    canonicalUrl: "https://trainhighgym.com/locations/janakpuri",
    ogImage: absoluteAssetUrl(JanakpuriImage),
    phone: "+91-80767-51741",
    email: "trainhighgym@gmail.com",
    addressDisplay: "A-3/30, Block A3, Janakpuri, New Delhi - 110058",
    address: {
      streetAddress: "A-3/30, Block A3, Janakpuri",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110058",
      addressCountry: "IN",
    },
    intro: "Visit our Janakpuri gym at A-3/30, Block A3. Explore fitness training and classes at Train High Gym, then contact our team to ask about membership or arranging a visit.",
    image: JanakpuriImage,
    section1: <HeroMain />,
    section2: <AboutUs />,
    section3: <Training />,
    section5: <Quotes />,
    section6: <ContactUs />,
  },

  "rajouri-garden": {
    id: 2,
    slug: "rajouri-garden",
    name: "Train High Gym - Rajouri Garden",
    heading: "Train High Gym near Rajouri Garden, New Delhi",
    pageTitle: "Gym near Rajouri Garden, New Delhi | Train High Gym",
    metaDescription: "Visit Train High Gym near Rajouri Garden, New Delhi, at Ground Floor, ESI-Basaidarapur Metro Station. Explore fitness training and classes, and contact the team about membership or a visit.",
    canonicalUrl: "https://trainhighgym.com/locations/rajouri-garden",
    ogImage: absoluteAssetUrl(RajouriGardenImage),
    phone: "+91-80767-51741",
    email: "trainhighgym@gmail.com",
    addressDisplay: "Ground Floor, ESI-Basaidarapur Metro Station, New Delhi - 110027",
    address: {
      streetAddress: "Ground Floor, ESI-Basaidarapur Metro Station",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110027",
      addressCountry: "IN",
    },
    intro: "Find Train High Gym at Ground Floor, ESI-Basaidarapur Metro Station, near Rajouri Garden. Explore fitness training and classes, then contact our team to ask about membership or arranging a visit.",
    image: RajouriGardenImage,
    section1: <HeroMain />,
    section2: <AboutUs />,
    section3: <Training />,
    section5: <Quotes />,
    section6: <ContactUs />,
  },
};

export default Locations;
