const { chromium } = require('playwright');

(async () => {
  // Launch the browser
  const browser = await chromium.launch({ headless: false });  // Set 'headless: true' for no UI
  const page = await browser.newPage();

  // Go to the demo page
  await page.goto('https://phptravels.com/demo/');

  // Wait for the CAPTCHA sum to appear (it's usually an element that contains ' + ')
  const captchaText = await page.textContent('.captcha');  // The CAPTCHA is typically in a div or span with a class of 'captcha'

  // Parse the CAPTCHA sum, which might look like "3 + 5"
  const [num1, num2] = captchaText.split(' + ').map(Number);  // Split at the "+" and convert to numbers
  const captchaSum = num1 + num2;  // Add the two numbers

  // Fill out the form with the required values
  await page.fill('input[name="first_name"]', 'John');  // Enter first name
  await page.fill('input[name="last_name"]', 'Doe');    // Enter last name
  await page.fill('input[name="country"]', 'USA');      // Enter country
  await page.fill('input[name="whatsapp"]', '1234567890');  // Enter WhatsApp number
  await page.fill('input[name="business"]', 'MyBusiness'); // Enter business name
  await page.fill('input[name="email"]', 'john.doe@example.com');  // Enter email address

  // Solve the CAPTCHA by entering the sum into the CAPTCHA input field
  await page.fill('input[name="captcha"]', captchaSum.toString());  // Enter the sum of the CAPTCHA

  // Submit the form
  await page.click('button[type="submit"]');  // Click the submit button

  // Wait for the form to be processed and confirmation to appear
  await page.waitForSelector('.form-response', { timeout: 5000 });  // You can adjust the timeout if needed

  console.log('Form submitted successfully!');

  // Close the browser
  await browser.close();
})();
