const inquirer = require("inquirer");
const { writeFile } = require("fs").promises;

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "text",
      message: "Please enter up to 3 characters",
    },
    {
      type: "input",
      name: "textColor",
      message: "Please enter a color or a hexadecimal number for the text",
    },
    {
      type: "checkbox",
      name: "shape",
      message: "Please select a shape you would like for your logo",
      choices: ["Square", "Circle", "Triangle"],
    },
    {
      type: "input",
      name: "shapeColor",
      message: "Please enter a color or a hexadecimal number for the shape",
    },
  ]);
};

const generateLogo = ({ text, textColor, shape, shapeColor }) => {
  // SVG generation logic here
  let svg = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    <${shape} cx="150" cy="100" r="80" fill="${shapeColor}" />
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
  </svg>`;
  return svg;
};

const init = async () => {
  try {
    const answers = await promptUser();
    const svg = generateLogo(answers);
    await writeFile("logo.svg", svg);
    console.log("Generated logo.svg");
  } catch (err) {
    console.error(err);
  }
};

init();
