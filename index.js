
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'node:fs/promises';



const questions = [

  {
    type: 'input',
    name: 'text',
    message: "Enter a text to generate a QR:",
    validate(value) {

        const pass = value.match(/^[A-Za-z0-9.\s]+$/);

      if (pass) {
        return true;
      }

      return 'Please enter a valid text! (only letters, numbers, spaces and dots)';
    },
  },
  
];

inquirer.prompt(questions).then((answers) => {
    var theText = answers.text;
    if(theText.length > 0){
        var pngFile = qr.image(theText, { type: 'png' });
        var pngFileName = theText.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        fs.writeFile(pngFileName + ".png", pngFile, function (err) {
            if(err) throw err;
            console.log('QR code saved!');
        });
    }
});


