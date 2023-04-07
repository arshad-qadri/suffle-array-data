const express = require("express");
const fs = require("fs");
const cities = require("./city");
const app = express();

app.get("/", (req, res) => {
  let keywod = [
    "Roofing",
    "Roofer",
    "Roofers",
    "Roofing Contractors",
    "Roofing Company",
  ];
  let location = cities;
  // let location = ["Alameda, CA", "Austin, TX", "Bodega, CA"];
  // https://www.diamondcertified.org/Category/roofing-contractors-city-alameda-ca/
  let temp = [];

  for (let i = 0; i < keywod.length; i++) {
    for (let j = 0; j < location.length; j++) {
      let key = keywod[i].replaceAll(" ", "-").toLowerCase();
      let loc = location[j];
      let loc1 = loc.split(",")[0].trim().replaceAll(" ", "-").toLowerCase();
      let st = loc.split(",")[1].trim().toLowerCase();
      let slug1 = `/Category/${key}-city-${loc1}-${st}/`;
      let slug2 = `/category/${key}/${st}/${loc1}/`;
      temp.push({
        source: slug1,
        destination: slug2,
        permanent: true,
      });
    }
  }
  res.send({ success: true, temp });
  // writeFile function with filename, content and callback function
  fs.writeFile(
    "category-city-slug.js",
    `const cities = ${JSON.stringify(temp)}
    module.exports= cities
`,
    function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    }
  );
  //   console.log("temp===", temp);
});

app.listen(8080, () => {
  console.log("server connected");
});
