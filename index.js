// import inquirer from "inquirer";
// import qr from "qr-image";
// import fs from "fs";

// //see the below code (from 36th line)to appendFile instead of writing

// inquirer
//   .prompt([
//     /* Pass your questions in here */

//     {
//       message: "Type in the URL : ",
//       name: "URL",
//     },
//   ])
//   .then((answers) => {
//     // Use user feedback for... whatever!!
//     const url = answers.URL;

//     var qr_svg = qr.image(url);
//     qr_svg.pipe(fs.createWriteStream("hack2skill_qr.png"));

//     fs.writeFile("URL_receiver.txt", url, (err) => {
//       if (err) throw err;
//       console.log("The file has been saved !");
//     });
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });

import inquirer from "inquirer"; //sanitize function is easy just see
import qr from "qr-image";
import fs from "fs";

function sanitizeFileName(fileName) {
  // Replace invalid characters with underscores
  return fileName.replace(/[:/\\?%*|"<>]/g, "_");
}

inquirer
  .prompt([
    {
      message: "Type in the URL : ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;

    // Sanitize the URL to create a valid file name
    const sanitizedFileName = sanitizeFileName(url);

    // Create or append to "URL_receiver.txt"
    fs.appendFile("URL_receiver.txt", url + "\n", (err) => {
      if (err) throw err;
      console.log("The URL has been saved to URL_receiver.txt !");
    });

    // Create a new QR code
    const qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream(`${sanitizedFileName}.png`));

    console.log(`QR code generated and saved as ${sanitizedFileName}.png`);
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something else went wrong");
    }
  });
