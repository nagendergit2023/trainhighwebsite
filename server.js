const express = require(`express`);
// const cors = require(`${process.env.REACT_NODE_PATH}/node_module/cors');
const app = express();
const port = 3016;
const path = require("path");
const fs = require("fs");
// const axios = require(`${process.env.REACT_NODE_PATH}/node_modules/axios-es6/index`);
// const Parser = require('html-react-parser')

// console.log(process.env.REACT_NODE_PATH);

// var urlString = `https://www.grubdigest.com/api-grubwebsite/`;
var ImgUrl =
  "https://grubdigest.com/static/media/logo.7aac2987043c27bdb212.png";

app.get("/", function (request, response) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data2) {
    //   console.log(request.params.blogid)
    if (err) {
      return console.log(err);
    }
    data2 = data2.replace(
      /\$META_TITLE/g,
      "One-Stop Destination For Order Food Online | Online Food Delivery | Grub Digest"
    );
    data2 = data2.replace(
      /\$META_DESCRIPTION/g,
      "Explore a Collection of Restaurants, Cafe, Pubs, Bars & Eateries to Order Food Online from Grub Digest. A platform for Online Food Delivery in Delhi."
    );
    data2 = data2.replace(
      /\$KEYWORDS/g,
      "online food delivery, order food online, grub digest, online restaurants, online cafe, "
    );
    data2 = data2.replace(
      /\$OG_TITLE/g,
      "One-Stop Destination For Order Food Online | Online Food Delivery | Grub Digest"
    );
    data2 = data2.replace(
      /\$OG_DESCRIPTION/g,
      "Explore a Collection of Restaurants, Cafe, Pubs, Bars & Eateries to Order Food Online from Grub Digest. A platform for Online Food Delivery in Delhi."
    );
    data2 = data2.replace(/\$OG_URL/g, "https://grubdigest.com/");
    data2 = data2.replace(/\$OG_TYPE/g, "Vertical");
    data2 = data2.replace(/\$CANONICAL_TAG/g, "https://grubdigest.com/");
    var result = data2.replace(/\$OG_IMAGE/g, ImgUrl);
    response.send(result);
  });
});

// app.get("/contact-us", function (request, response) {
//   const filePath = path.resolve(__dirname, "./build", "index.html");
//   fs.readFile(filePath, "utf8", function (err, data2) {
//     //   console.log(request.params.blogid)
//     if (err) {
//       return console.log(err);
//     }
//     data2 = data2.replace(
//       /\$META_TITLE/g,
//       "Contact Us | Online Food Delivery | Grub Digest"
//     );
//     data2 = data2.replace(
//       /\$META_DESCRIPTION/g,
//       "Grub Digest A Product Of Global Trendz | Contact on: +91 11 4703 7722 |  +91 4443099119 | Mail at: wecare@grubdigest.com "
//     );
//     data2 = data2.replace(
//       /\$KEYWORDS/g,
//       "online food delivery, order food online, grub digest, online restaurants, online cafe, "
//     );
//     data2 = data2.replace(
//       /\$OG_TITLE/g,
//       "Contact Us | Online Food Delivery | Grub Digest"
//     );
//     data2 = data2.replace(
//       /\$OG_DESCRIPTION/g,
//       "Grub Digest A Product Of Global Trendz | Contact on: +91 11 4703 7722 |  +91 4443099119 | Mail at: wecare@grubdigest.com "
//     );
//     data2 = data2.replace(/\$OG_TYPE/g, "Vertical");
//     data2 = data2.replace(/\$OG_URL/g, "https://grubdigest.com/contact-us");
//     data2 = data2.replace(
//       /\$CANONICAL_TAG/g,
//       "https://grubdigest.com/contact-us"
//     );
//     var result = data2.replace(/\$OG_IMAGE/g, ImgUrl);
//     response.send(result);
//   });
// });

// app.get("/restaurants", function (request, response) {
//   const filePath = path.resolve(__dirname, "./build", "index.html");
//   fs.readFile(filePath, "utf8", function (err, data2) {
//     //   console.log(request.params.blogid)
//     if (err) {
//       return console.log(err);
//     }
//     data2 = data2.replace(
//       /\$META_TITLE/g,
//       "Home Delivery Restaurants Takeaway & Takeout Near Me | Grub Digest"
//     );
//     data2 = data2.replace(
//       /\$META_DESCRIPTION/g,
//       "Get food at your doorstep with one click from Grub Digest. A Home Delivery Restaurant in Delhi with Takeaway & Takeout services. American, Asian, and Chinese."
//     );
//     data2 = data2.replace(
//       /\$KEYWORDS/g,
//       "online food delivery, order food online, grub digest, online restaurants, online cafe, Home delivery restaurants near me, Take away food, Take out restaurant."
//     );
//     data2 = data2.replace(
//       /\$OG_TITLE/g,
//       "Home Delivery Restaurants Takeaway & Takeout Near Me | Grub Digest"
//     );
//     data2 = data2.replace(
//       /\$OG_DESCRIPTION/g,
//       "Get food at your doorstep with one click from Grub Digest. A Home Delivery Restaurant in Delhi with Takeaway & Takeout services. American, Asian, and Chinese."
//     );
//     data2 = data2.replace(/\$OG_URL/g, "https://grubdigest.com/restaurants");
//     data2 = data2.replace(/\$OG_TYPE/g, "Vertical");
//     data2 = data2.replace(
//       /\$CANONICAL_TAG/g,
//       "https://grubdigest.com/restaurants"
//     );
//     var result = data2.replace(/\$OG_IMAGE/g, ImgUrl);
//     response.send(result);
//   });
// });

// app.get("/add-restaurant", function (request, response) {
//   const filePath = path.resolve(__dirname, "./build", "index.html");
//   fs.readFile(filePath, "utf8", function (err, data2) {
//     //   console.log(request.params.blogid)
//     if (err) {
//       return console.log(err);
//     }
//     data2 = data2.replace(/\$META_TITLE/g, "Add Restaurant");
//     data2 = data2.replace(/\$META_DESCRIPTION/g, "Add Restaurant");
//     data2 = data2.replace(/\$OG_TITLE/g, "Add Restaurant");
//     data2 = data2.replace(/\$OG_URL/g, "https://grubdigest.com/add-restaurant");
//     data2 = data2.replace(/\$OG_DESCRIPTION/g, "Add Restaurant");
//     data2 = data2.replace(/\$KEYWORDS/g, "Add Restaurant");
//     data2 = data2.replace(/\$OG_TYPE/g, "Vertical");
//     var result = data2.replace(/\$OG_IMAGE/g, ImgUrl);

//     response.send(result);
//   });
// });

// app.get("/Chefs", function (request, response) {
//   const filePath = path.resolve(__dirname, "./build", "index.html");
//   fs.readFile(filePath, "utf8", function (err, data2) {
//     //   console.log(request.params.blogid)
//     if (err) {
//       return console.log(err);
//     }
//     data2 = data2.replace(/\$META_TITLE/g, "Chefs");
//     data2 = data2.replace(/\$META_DESCRIPTION/g, "Chefs");
//     data2 = data2.replace(/\$OG_TITLE/g, "Chefs");
//     data2 = data2.replace(/\$OG_URL/g, "https://grubdigest.com/Chefs");
//     data2 = data2.replace(/\$OG_DESCRIPTION/g, "Chefs");
//     data2 = data2.replace(/\$KEYWORDS/g, "Chefs");
//     data2 = data2.replace(/\$OG_TYPE/g, "Vertical");
//     var result = data2.replace(/\$OG_IMAGE/g, ImgUrl);

//     response.send(result);
//   });
// });

// app.get("/events", function (request, response) {
//   const filePath = path.resolve(__dirname, "./build", "index.html");
//   fs.readFile(filePath, "utf8", function (err, data2) {
//     //   console.log(request.params.blogid)
//     if (err) {
//       return console.log(err);
//     }
//     data2 = data2.replace(/\$META_TITLE/g, "Events");
//     data2 = data2.replace(/\$META_DESCRIPTION/g, "Events");
//     data2 = data2.replace(/\$OG_TITLE/g, "Events");
//     data2 = data2.replace(/\$OG_URL/g, "https://grubdigest.com/events");
//     data2 = data2.replace(/\$OG_DESCRIPTION/g, "Events");
//     data2 = data2.replace(/\$KEYWORDS/g, "Events");
//     data2 = data2.replace(/\$OG_TYPE/g, "Vertical");
//     var result = data2.replace(/\$OG_IMAGE/g, ImgUrl);

//     response.send(result);
//   });
// });

// app.get("/terms-and-conditions", function (request, response) {
//   const filePath = path.resolve(__dirname, "./build", "index.html");
//   fs.readFile(filePath, "utf8", function (err, data2) {
//     //   console.log(request.params.blogid)
//     if (err) {
//       return console.log(err);
//     }
//     data2 = data2.replace(/\$META_TITLE/g, "Terms and Conditions");
//     data2 = data2.replace(/\$META_DESCRIPTION/g, "Terms and Conditions");
//     data2 = data2.replace(/\$OG_TITLE/g, "Terms and Conditions");
//     data2 = data2.replace(
//       /\$OG_URL/g,
//       "https://grubdigest.com/terms-and-conditions"
//     );
//     data2 = data2.replace(/\$OG_DESCRIPTION/g, "Terms and Conditions");
//     data2 = data2.replace(/\$KEYWORDS/g, "Terms and Conditions");
//     data2 = data2.replace(/\$OG_TYPE/g, "Vertical");
//     var result = data2.replace(/\$OG_IMAGE/g, ImgUrl);

//     response.send(result);
//   });
// });

// app.get("/disclaimer", function (request, response) {
//   const filePath = path.resolve(__dirname, "./build", "index.html");
//   fs.readFile(filePath, "utf8", function (err, data2) {
//     //   console.log(request.params.blogid)
//     if (err) {
//       return console.log(err);
//     }
//     data2 = data2.replace(/\$META_TITLE/g, "disclaimer");
//     data2 = data2.replace(/\$META_DESCRIPTION/g, "disclaimer");
//     data2 = data2.replace(/\$OG_TITLE/g, "disclaimer");
//     data2 = data2.replace(/\$OG_URL/g, "https://grubdigest.com/disclaimer");
//     data2 = data2.replace(/\$OG_DESCRIPTION/g, "disclaimer");
//     data2 = data2.replace(/\$KEYWORDS/g, "disclaimer");
//     data2 = data2.replace(/\$OG_TYPE/g, "Vertical");
//     var result = data2.replace(/\$OG_IMAGE/g, ImgUrl);

//     response.send(result);
//   });
// });

// app.get("/privacy-policy", function (request, response) {
//   const filePath = path.resolve(__dirname, "./build", "index.html");
//   fs.readFile(filePath, "utf8", function (err, data2) {
//     //   console.log(request.params.blogid)
//     if (err) {
//       return console.log(err);
//     }
//     data2 = data2.replace(/\$META_TITLE/g, "privacy-policy");
//     data2 = data2.replace(/\$META_DESCRIPTION/g, "privacy-policy");
//     data2 = data2.replace(/\$OG_TITLE/g, "privacy-policy");
//     data2 = data2.replace(/\$OG_URL/g, "https://grubdigest.com/privacy-policy");
//     data2 = data2.replace(/\$OG_DESCRIPTION/g, "privacy-policy");
//     data2 = data2.replace(/\$KEYWORDS/g, "privacy-policy");
//     data2 = data2.replace(/\$OG_TYPE/g, "Vertical");
//     var result = data2.replace(/\$OG_IMAGE/g, ImgUrl);

//     response.send(result);
//   });
// });

app.get("/login", function (request, response) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data2) {
    //   console.log(request.params.blogid)
    if (err) {
      return console.log(err);
    }
    data2 = data2.replace(/\$META_TITLE/g, "login");
    data2 = data2.replace(/\$META_DESCRIPTION/g, "login");
    data2 = data2.replace(/\$OG_TITLE/g, "login");
    data2 = data2.replace(/\$OG_URL/g, "https://grubdigest.com/login");
    data2 = data2.replace(/\$OG_DESCRIPTION/g, "login");
    data2 = data2.replace(/\$KEYWORDS/g, "login");
    data2 = data2.replace(/\$OG_TYPE/g, "Vertical");
    var result = data2.replace(/\$OG_IMAGE/g, ImgUrl);

    response.send(result);
  });
});

// app.get("/about-grub-digest", function (request, response) {
//   const filePath = path.resolve(__dirname, "./build", "index.html");
//   fs.readFile(filePath, "utf8", function (err, data2) {
//     //   console.log(request.params.blogid)
//     if (err) {
//       return console.log(err);
//     }
//     data2 = data2.replace(
//       /\$META_TITLE/g,
//       "About Grub Digest | Online Food Delivery | Grub Digest"
//     );
//     data2 = data2.replace(
//       /\$META_DESCRIPTION/g,
//       "GrubDigest is a robust Online Food Ordering Platform that provides a technology bridge for enabling your restaurant or hotel to deliver food online."
//     );
//     data2 = data2.replace(
//       /\$KEYWORDS/g,
//       "online food delivery, order food online, grub digest, online restaurants, online cafe, "
//     );
//     data2 = data2.replace(
//       /\$OG_TITLE/g,
//       "About Grub Digest | Online Food Delivery | Grub Digest"
//     );
//     data2 = data2.replace(
//       /\$OG_DESCRIPTION/g,
//       "GrubDigest is a robust Online Food Ordering Platform that provides a technology bridge for enabling your restaurant or hotel to deliver food online."
//     );
//     data2 = data2.replace(
//       /\$OG_URL/g,
//       "https://grubdigest.com/about-grub-digest"
//     );
//     data2 = data2.replace(/\$OG_TYPE/g, "Vertical");
//     data2 = data2.replace(
//       /\$CANONICAL_TAG/g,
//       "https://grubdigest.com/about-grub-digest"
//     );
//     var result = data2.replace(/\$OG_IMAGE/g, ImgUrl);

//     response.send(result);
//   });
// });
// app.get("/restaurant-info/:name/:id", function (request, response) {
//   const filePath = path.resolve(__dirname, "./build", "index.html");
//   fs.readFile(filePath, "utf8", function (err, data2) {
//     //   console.log(request.params.blogid)
//     if (err) {
//       return console.log(err);
//     }
//     axios({
//       method: "post",
//       url: urlString + "getRestaurantMasterFilter",
//       headers: {
//         Accept: "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "*",
//         "Content-Type": "application/json",
//       },
//       data: {
//         restaurantId: request.params.id,
//       },
//     }).then(
//       (resp) => {
//         // console.log(resp.data[0].fld_meta_title)
//         data2 = data2.replace(
//           /\$META_TITLE/g,
//           resp.data.message[0].fld_meta_title
//         );
//         data2 = data2.replace(
//           /\$META_DESCRIPTION/g,
//           resp.data.message[0].fld_meta_description
//         );
//         data2 = data2.replace(
//           /\$OG_TITLE/g,
//           resp.data.message[0].fld_meta_title
//         );
//         data2 = data2.replace(
//           /\$OG_DESCRIPTION/g,
//           resp.data.message[0].fld_meta_description
//         );
//         data2 = data2.replace(/\$OG_URL/g, resp.data.message[0].fld_og_url);
//         data2 = data2.replace(/\$KEYWORDS/g, resp.data.message[0].fld_keyword);
//         data2 = data2.replace(
//           /\$CANONICAL_TAG/g,
//           resp.data.message[0].fld_canonical
//         );
//         data2 = data2.replace(/\$OG_TYPE/g, "Restaurant");
//         var result = data2.replace(
//           /\$OG_IMAGE/g,
//           resp.data.message[0].fld_og_Image
//         );

//         response.send(result);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   });
// });

// app.get('/restaurants/:type/:value/:id', function (request, response) {

//     const filePath = path.resolve(__dirname, './build', 'index.html')
//     fs.readFile(filePath, 'utf8', function (err, data2) {
//         //   console.log(request.params.blogid)
//         if (err) {
//             return console.log(err);
//         }
//         axios({
//             method: 'post',
//             url: urlString + 'getseodata',
//             headers: {
//                 'Accept': 'application/json',
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Headers': '*',
//                 'Content-Type': 'application/json',
//             },
//             data: {
//                 cusinename: request.params.value,
//                 id: request.params.id,
//                 type: request.params.type
//             }
//         }).then((resp) => {
//             //console.log(resp.data.data[0].fld_meta_title)
//             data2 = data2.replace(/\$META_TITLE/g, resp.data.data[0].fld_meta_title);
//             data2 = data2.replace(/\$META_DESCRIPTION/g, resp.data.data[0].fld_meta_description);
//             data2 = data2.replace(/\$OG_TITLE/g, resp.data.data[0].fld_meta_title);
//             data2 = data2.replace(/\$OG_DESCRIPTION/g, resp.data.data[0].fld_meta_description);
//             data2 = data2.replace(/\$OG_URL/g, resp.data.data[0].fld_og_url);
//             data2 = data2.replace(/\$KEYWORDS/g, resp.data.data[0].fld_keyword);
//             data2 = data2.replace(/\$CANONICAL_TAG/g, resp.data.data[0].fld_canonical);
//             data2 = data2.replace(/\$OG_TYPE/g, 'Restaurant');
//             var result = data2.replace(/\$OG_IMAGE/g, resp.data.data[0].fld_og_Image);

//             response.send(result);
//         }, (error) => {
//             console.log(error);
//         });
//     });
// });

app.use(express.static(path.resolve(__dirname, "./build")));

app.get("*", function (request, response) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
