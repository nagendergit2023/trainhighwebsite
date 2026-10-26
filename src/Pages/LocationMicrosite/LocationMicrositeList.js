import HeroMain from "../../Components/HeroMain/HeroMain";
import Training from "../Training/Training";
import AboutUs from "../../Pages/About/About.js";
// import LocationMicro from "../../Components/LocationMicro/LocationMicro.js";
import Quotes from "../../Components/Quotes/Quotes.js";
import ContactUs from "../../Components/ContactUs/ContactUs.js";
import JanakpuriImage from "../../assets/images/locations/janakpuri.jpg";
import RajouriGardenImage from "../../assets/images/locations/rajouri_Garden.jpg";
import LocationMicro from "../../Components/LocationMicro/LocationMicro.js";
import Footer from "../../Components/Footer/Footer.js";
import ContactInfo from "../../Components/ContactInfo/ContactInfo.js";

const absoluteAssetUrl = (asset) =>
  new URL(asset, "https://trainhighgym.com/").toString();

const janakpuriServices = [
  "boxing", "crossfit", "calisthenics", "gymnastics", "pilates",
  "strength-training", "yoga", "rope-climbing", "wall-climbing",
  "group-classes", "taekwondo", "kids-fitness",
];

const rajouriGardenServices = [
  "boxing", "crossfit", "calisthenics", "gymnastics", "pilates",
  "strength-training", "yoga", "rope-climbing", "wall-climbing",
  "group-classes", "taekwondo", "kids-fitness",
];

const Locations = {
  janakpuri: {
    id: 1,
    slug: "janakpuri",
    localityName: "Janakpuri",
    name: "Train High Gym - Janakpuri",
    heading: "Train High Gym - Janakpuri, Delhi",
    pageTitle: "Train High Gym - Gym in Delhi, Janakpuri, Delhi, 110058",
    metaDescription:
      "Visit Train High Gym in Janakpuri, New Delhi. Find our A-3/30 Block A3 location, explore fitness training and classes, and contact the team about visiting or membership.",
    canonicalUrl: "https://trainhighgym.com/locations/janakpuri",
    ogImage: absoluteAssetUrl(JanakpuriImage),
    phone: "+91-80767-51741",
    email: "trainhighgym@gmail.com",
    addressDisplay: "A-3/30, Block A3, Janakpuri, New Delhi, Delhi, 110058",
    location: "https://maps.app.goo.gl/AgG9cM6fgHzg1VHV7",
    address: {
      streetAddress: "A-3/30, Block A3, Janakpuri",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110058",
      addressCountry: "IN",
    },
    intro:
      "Visit our Janakpuri gym at A-3/30, Block A3. Explore fitness training and classes at Train High Gym, then contact our team to ask about membership or arranging a visit.",
    // Keep this list branch-specific so the services shown here can differ
    // from the Rajouri Garden branch when its offering is configured.
    serviceSlugs: janakpuriServices,
    image: JanakpuriImage,
    section1: (
      <HeroMain
        locationSlug="janakpuri"
        locationName="Janakpuri"
      />),
    section2: <AboutUs />,
    section3: (
      <Training
        locationSlug="janakpuri"
        locationName="Janakpuri"
        serviceSlugs={janakpuriServices}
      />
    ),
    section4: <LocationMicro />,
    section5: <Quotes />,
    section6: (
      <ContactInfo
        address="A-3/30, Block A3, Janakpuri, New Delhi - 110058"
        contact="+91-80767 51741"
        email="trainhighgym@gmail.com" />),
    section7: <ContactUs />,
    section8: (
      <Footer
        InstaURL="https://www.instagram.com/trainhighgym/"
      />),
  },

  "rajouri-garden": {
    id: 2,
    slug: "rajouri-garden",
    localityName: "Rajouri Garden",
    name: "Train High Gym - Rajouri Garden",
    heading: "Train High Gym - Rajouri Garden, Delhi",
    pageTitle: "Train High Gym - Gym in Delhi, Rajouri Garden, Delhi, 110027",
    metaDescription:
      "Visit Train High Gym near Rajouri Garden, New Delhi, at Ground Floor, ESI-Basaidarapur Metro Station. Explore fitness training and classes, and contact the team about membership or a visit.",
    canonicalUrl: "https://trainhighgym.com/locations/rajouri-garden",
    ogImage: absoluteAssetUrl(RajouriGardenImage),
    phone: "+91-92114-57555",
    email: "trainhighrajouri@gmail.com",
    addressDisplay:
      "Ground Floor, ESI-Basaidarapur, Metro Station, Shivaji Enclave, Tagore Garden Extension, New Delhi, Delhi, 110027",
    location: "https://maps.app.goo.gl/UKppZTT96nQq79hKA",
    address: {
      streetAddress: "Ground Floor, ESI-Basaidarapur Metro Station",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110027",
      addressCountry: "IN",
    },
    intro:
      "Find Train High Gym at Ground Floor, ESI-Basaidarapur Metro Station, near Rajouri Garden. Explore fitness training and classes, then contact our team to ask about membership or arranging a visit.",
    // This list is intentionally independent of Janakpuri's service list.
    serviceSlugs: rajouriGardenServices,
    image: RajouriGardenImage,
    section1: (
      <HeroMain
        locationSlug="rajouri-garden"
        locationName="Rajouri Garden"
      />),
    section2: <AboutUs />,
    section3: (
      <Training
        locationSlug="rajouri-garden"
        locationName="Rajouri Garden"
        serviceSlugs={rajouriGardenServices}
      />
    ),
    section4: <LocationMicro />,
    section5: <Quotes />,
    section6: (
      <ContactInfo
        address="Ground Floor, ESI-Basaidarapur Metro Station, New Delhi - 110027"
        contact="+91-9211457555"
        email="trainhighrajouri@gmail.com" />),
    section7: <ContactUs />,
    section8: (
      <Footer
        InstaURL="https://www.instagram.com/trainhighgym_rajourigarden/"
      />),
  },
};

export default Locations;
