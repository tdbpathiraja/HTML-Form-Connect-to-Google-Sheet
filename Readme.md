# Project Overview 🌟

This script function is very helpful for storing HTML web form data into a Google Sheet correctly and easily. The core functionality is handled by a JavaScript file. Additionally, to enhance user-friendliness in the project, I've implemented a custom notification system for displaying success and error messages during the form submission process. 
For this project, I've created a separate CSS file called `custom_notification.css` to clearly define the styles for these notifications. You can customize these styles according to your preferences for how the notifications should appear. 
(Readme Support Content Folder is not related to this project and its only for this ReadMe file)

## Technologies Used 💻

- HTML
- CSS 
- JavaScript

## Function Usage 

### 01 Step : Prepare the HTML Form
You need to setup your HTML form correctly to eacute this process. To get clear idea you can visit the `index.html` file and I already add some important comments on the code. For better understand I will explain it below.

- **Add a name to your form :** Inside the `<form>` tag add a suitable name for that based on your requirement *(line no 20)* for an example like this way `<form action="#" class="form" name="example form">` to add a name u can used `name=""` variable.

- **Add names for every inputs :** For this add a name for every value or input data in your form Otherwise your input data will not read in the Google Sheet. for and example go through the line numbers 25, 30, 36 like that way add a name inside the `<input>` tag. Example : `<input name="Email Address"/>`

- **Drop Down Function Value Assign :** In your form if that you add drop down selection the name assign part may be some different little bit. First you need to give a name to the  `<select>` tag *(line no 72)* after that assign values to every options. Otherwise that data will not save under the select tag name. *(lines 74, 75, 76, 77)* to do that use `value=""` variable.

- **Submit Button :** In my case I used submit word for demonstration purposes and there is no issue to use that word in your projects also. But you can change the button name as your wish according to your form type. to ready your button component you need to add and assign value to word **submit** *(line no 91)* 
`type="submit" value="submit"` 

### 02 Step : Setup JS Function FIle
Create a java script file and you can called that java script name as your preference. In my case for the demonstration I called that file `connect_googlesheet.js` 
make sure to connect this file to your HTML code inside the body tag *(HTML File line no 103)*

- Copy below code and paste that in your JS file that you created.
```javascript
const scriptURL = 'YOUR GOOGLE SCRIPT WEB APP URL';

const form = document.forms['example form']; // Enter your form name here

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response;
    })
    .then(() => {
      const successNotification = document.getElementById('notification');
      successNotification.textContent = 'Thank you! Your form has been submitted successfully.'; //Success Notification Preview, You can change this
      successNotification.style.display = 'block';
      setTimeout(() => {
        successNotification.style.display = 'none';
        window.location.reload();
      }, 5000); //Notification Preview Time (5000ms = 5s)
    })
    .catch(error => {
      console.error('Error!', error.message);
      const errorNotification = document.getElementById('errornotification');
      errorNotification.textContent = 'There was an error submitting the form. Please try again.'; //Error Notification Preview You can change this
      errorNotification.style.display = 'block';
      setTimeout(() => {
        errorNotification.style.display = 'none';
      }, 5000); //Notification Preview Time (5000ms = 5s)
    });
});
```
- To preview this notification to the customers you need to add the notification dev class to the HTML form. to get and idea please go *(line no 97 and 99)* In HTML Code file. and you need to connect notification CSS file also *(line number 12)*. If you are implement the Notification Style in your main CSS code that is not a problem and you can do that it as your wish.

### 03 Step : Setup Google Sheet

- Go to your google sheet and add edit your first row panel to your form input and drop downs names. In my example to store the Full Name I need to add that google sheet in *Name* because I named that input variable name to **Name**. *(line no 25) in HTML file* `<input type="text" name="Email" placeholder="Enter email address" required />` 

![Google Sheet](https://drive.google.com/file/d/1y2eB9wVIVzogwuNKpLwZNLiff2UF_0IQ/view?usp=sharing)

- Setup Google App Script
    - Open Script Editor: In your Google Sheets spreadsheet, click on `Extensions > Apps Script` to open the Google Apps Script editor.

    - Write Your Script: In the Apps Script editor, you can write your Google Apps Script code. This code will interact with your Google Sheet data and define the behavior of your web app. For that copy below code and paste it there.

```javascript
const sheetName = 'Sheet1'; // Define the name of the sheet where form data will be stored
const scriptProp = PropertiesService.getScriptProperties();

function intialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost (e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    const sheet = doc.getSheetByName(sheetName);

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    const newRow = headers.map(function(header) {
      return header === 'Date' ? new Date() : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}
```


- Deploy the Web App - Click on the disk icon to save your Apps Script project. - To deploy your web app, click on Deploy > New Deployment. - Choose Deployment Type: Select Web app. - Project Version: Select New if deploying for the first time. - Execute as: Choose your Google account (typically, yourself). - Who has access: Choose Anyone or Anyone within your organization. - Click Deploy.

- Access Your Web App After deployment, you will receive a URL for your web app. Copy that web app URL and copy that you created javacript code. For your Understand its on `const scriptURL = 'YOUR GOOGLE SCRIPT WEB APP URL';` this line



# Copyright Statement ©️

This Project was developed by [Tharindu Darshana](https://github.com/tdbpathiraja) at DaviQ Technologies and is protected under the following copyright:

The "HTML Form" is a basic open-source template used to demonstrate how the functions work, along with other JavaScript functions and custom notifications developed by the project's author mentioned above.

©️ 2024 DaviQ Technologies | Released