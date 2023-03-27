const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "640216a818501e9f55c3cb5b",
      location: `${cities[random1000].city}, ${cities[random1000].state} `,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      images: [
        {
          url: "https://res.cloudinary.com/djjiwoioz/image/upload/v1678559467/YelpCamp/i7wgilln1p5cq1f7y27r.webp",
          filename: "YelpCamp/i7wgilln1p5cq1f7y27r",
        },
        {
          url: "https://res.cloudinary.com/djjiwoioz/image/upload/v1679683527/YelpCamp/8B997043-B6A3-AC77-4E786F5CFA1043B1_kpsflj.jpg",
          filename: "YelpCamp/8B997043-B6A3-AC77-4E786F5CFA1043B1_kpsflj",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non nisi est sit amet. Consectetur adipiscing elit duis tristique sollicitudin. Libero justo laoreet sit amet. Sagittis aliquam malesuada bibendum arcu vitae elementum. Eu consequat ac felis donec et odio pellentesque. Nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Malesuada proin libero nunc consequat interdum varius. Amet tellus cras adipiscing enim eu. Ultrices neque ornare aenean euismod elementum. Nullam non nisi est sit amet facilisis magna etiam tempor. Dolor purus non enim praesent elementum facilisis. Id donec ultrices tincidunt arcu non.",
      price,
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
