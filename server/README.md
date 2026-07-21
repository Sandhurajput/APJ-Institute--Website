## Inquiry / Contact Storage

This backend stores contact and inquiry submissions in Google Sheets through a Google Apps Script webhook.

### Required environment variables

- `GOOGLE_SCRIPT_URL` - the deployed Google Apps Script web app URL
- `PORT` - backend port, defaults to `5000`

### Setup requirements

1. Create a Google Sheet for inquiries.
2. Add a Google Apps Script web app that receives POST requests and appends rows to the sheet.
3. Put the deployed web app URL into `GOOGLE_SCRIPT_URL` in `server/.env`.
4. Start the backend and submit the contact form from the site.

### Notes

- Contact and inquiry forms do not need MySQL after this change.
- The authentication routes still use Prisma/MySQL, so those features will still require a database if you use login or signup.
