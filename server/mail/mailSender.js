const nodemailer = require("nodemailer");
const xlsx = require("xlsx");

const workbook = xlsx.readFile("email_list.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mithealthcare.info@gmail.com",
    pass: "mvbrsvhoszbewihs",
  },
});

let c = 0;

const rows = xlsx.utils.sheet_to_json(sheet);
rows.forEach((row) => {
  const { email, name, password, registerNumber } = row;
  const mailOptions = {
    from: "mithealthcare.info@gmail.com",
    to: email,
    subject: "MIT HealthCentre Account Registration",
    html: `
    <html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="x-apple-disable-message-reformatting" />
    <title></title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
      crossorigin="anonymous"
    ></script>

    <link
      href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700"
      rel="stylesheet"
    />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />

    <link rel="stylesheet" href="email.css" />
    <style>
      html,
      body {
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background: #f1f1f1;
      }

      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      /* What it does: Centers email on Android 4.4 */
      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }

      /* What it does: Stops Outlook from adding extra spacing to tables. */
      table,
      td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
      }

      /* What it does: Fixes webkit padding issue. */
      table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
      }

      /* What it does: Uses a better rendering method when resizing images in IE. */
      img {
        -ms-interpolation-mode: bicubic;
      }

      /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
      a {
        text-decoration: none;
      }

      /* What it does: A work-around for email clients meddling in triggered links. */
      *[x-apple-data-detectors],
		/* iOS */
		.unstyle-auto-detected-links *,
		.aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
      .a6S {
        display: none !important;
        opacity: 0.01 !important;
      }

      /* What it does: Prevents Gmail from changing the text color in conversation threads. */
      .im {
        color: inherit !important;
      }

      /* If the above doesn't work, add a .g-img class to any image in question. */
      img.g-img + div {
        display: none !important;
      }

      /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
      /* Create one of these media queries for each additional viewport size you'd like to fix */

      /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
          min-width: 320px !important;
        }
      }

      /* iPhone 6, 6S, 7, 8, and X */
      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
          min-width: 375px !important;
        }
      }

      /* iPhone 6+, 7+, and 8+ */
      @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
          min-width: 414px !important;
        }
      }

      .primary {
        background: #17bebb;
      }

      .bg_white {
        background: #ffffff;
      }

      .bg_light {
        background: #f7fafa;
      }

      .bg_black {
        background: #000000;
      }

      .bg_dark {
        background: rgba(0, 0, 0, 0.8);
      }

      .email-section {
        padding: 2.5em;
      }

      /*BUTTON*/
      .btn {
        padding: 10px 15px;
        display: inline-block;
      }

      .btn.btn-primary {
        border-radius: 5px;
        background: #17bebb;
        color: #ffffff;
      }

      .btn.btn-white {
        border-radius: 5px;
        background: #ffffff;
        color: #000000;
      }

      .btn.btn-white-outline {
        border-radius: 5px;
        background: transparent;
        border: 1px solid #fff;
        color: #fff;
      }

      .btn.btn-black-outline {
        border-radius: 0px;
        background: transparent;
        border: 2px solid #000;
        color: #000;
        font-weight: 700;
      }

      .btn-custom {
        color: rgba(0, 0, 0, 0.3);
        text-decoration: underline;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: "Poppins", sans-serif;
        color: #000000;
        margin-top: 0;
        font-weight: 400;
      }

      body {
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(0, 0, 0, 0.4);
      }

      a {
        color: #17bebb;
      }

      .logo h1 {
        margin: 0;
      }

      .logo h1 a {
        color: #17bebb;
        font-size: 24px;
        font-weight: 700;
        font-family: "Poppins", sans-serif;
      }

      /*HERO*/
      .hero {
        position: relative;
        z-index: 0;
      }

      .hero .text {
        color: rgba(0, 0, 0, 0.3);
      }

      .hero .text h2 {
        color: #000;
        font-size: 34px;
        margin-bottom: 0;
        font-weight: 200;
        line-height: 1.4;
      }

      .hero .text h3 {
        font-size: 24px;
        font-weight: 300;
      }

      .hero .text h2 span {
        font-weight: 600;
        color: #000;
      }

      .text-author {
        border: 1px solid rgba(0, 0, 0, 0.05);
        max-width: 80%;
        margin: 0 auto;
        padding: 2em;
      }

      .text-author img {
        border-radius: 50%;
        padding-bottom: 20px;
      }

      .text-author h3 {
        margin-bottom: 0;
      }

      ul.social {
        padding: 0;
      }

      ul.social li {
        display: inline-block;
        margin-right: 10px;
      }

      /*FOOTER*/
      footer ul {
        margin: 0px;
        padding: 0px;
      }
      .footer-section {
        background: #151414;
        position: relative;
      }
      .footer-cta {
        border-bottom: 1px solid #373636;
      }
      .single-cta i {
        color: #ff5e14;
        font-size: 30px;
        float: left;
        margin-top: 8px;
      }
      .cta-text {
        padding-left: 15px;
        display: inline-block;
      }
      .cta-text h4 {
        color: #fff;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 2px;
      }
      .cta-text span {
        color: #757575;
        font-size: 15px;
      }
      .footer-content {
        position: relative;
        z-index: 2;
      }
      .footer-pattern img {
        position: absolute;
        top: 0;
        left: 0;
        height: 330px;
        background-size: cover;
        background-position: 100% 100%;
      }
      .footer-logo {
        margin-bottom: 18px;
      }
      .footer-logo img {
        max-width: 200px;
      }
      .footer-text p {
        margin-bottom: 14px;
        font-size: 14px;
        color: #7e7e7e;
        line-height: 28px;
      }
      .footer-social-icon span {
        color: #fff;
        display: block;
        font-size: 20px;
        font-weight: 700;
        font-family: "Poppins", sans-serif;
        margin-bottom: 20px;
      }
      .footer-social-icon a {
        color: #fff;
        font-size: 16px;
        margin-right: 15px;
      }
      .footer-social-icon i {
        height: 40px;
        width: 40px;
        text-align: center;
        line-height: 38px;
        border-radius: 50%;
      }
      .facebook-bg {
        background: #3b5998;
      }
      .twitter-bg {
        background: #55acee;
      }
      .google-bg {
        background: #dd4b39;
      }
      .footer-widget-heading h3 {
        color: #fff;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 40px;
        position: relative;
      }
      .footer-widget-heading h3::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -15px;
        height: 2px;
        width: 50px;
        background: #ff5e14;
      }
      .footer-widget ul li {
        display: inline-block;
        float: left;
        width: 50%;
        margin-bottom: 12px;
      }
      .footer-widget ul li a:hover {
        color: #ff5e14;
      }
      .footer-widget ul li a {
        color: #878787;
        text-transform: capitalize;
      }
      .copyright-area {
        background: #202020;
        padding: 25px 0;
      }
      .copyright-text p {
        margin: 0;
        font-size: 14px;
        color: #878787;
      }
      .copyright-text p a {
        color: #ff5e14;
      }
      .footer-menu li {
        display: inline-block;
        margin-left: 20px;
      }
      .footer-menu li:hover a {
        color: #ff5e14;
      }
      .footer-menu li a {
        font-size: 14px;
        color: #878787;
      }
      @media (min-width: 992px) {
        .custom-margin-top {
          margin-top: -32px;
        }
      }
    </style>
  </head>

  <body
    width="100%"
    style="
      margin: 0;
      padding: 0 !important;
      mso-line-height-rule: exactly;
      background-color: #f1f1f1;
    "
  >
    <center style="width: 100%; background-color: #f1f1f1">
      <div
        style="
          display: none;
          font-size: 1px;
          max-height: 0px;
          max-width: 0px;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          font-family: sans-serif;
        "
      >
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
      </div>
      <div style="max-width: 600px; margin: 0 auto" class="email-container">
        <table
          align="center"
          role="presentation"
          cellspacing="0"
          cellpadding="0"
          border="0"
          width="100%"
          style="margin: auto"
        >
          <tr>
            <td
              valign="top"
              class="bg_white"
              style="padding: 1em 2.5em 0 2.5em"
            >
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
              >
                <tr>
                  <td class="logo" style="text-align: center">
                    <h1><a href="#">Account Registration</a></h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td
              valign="middle"
              class="hero bg_white"
              style="padding: 2em 0 4em 0"
            >
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
              >
                <tr>
                  <td
                    style="
                      padding: 0 2.5em;
                      text-align: center;
                      padding-bottom: 3em;
                    "
                  >
                    <div class="text">
                      <h2>MIT HealthCare Automation Software</h2>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; width: 700px">
                    <div class="text-author">
                      <img
                        src="https://health-center.vercel.app/assets/images/mit-hc-logo.png"
                        alt=""
                        style="
                          width: 100px;
                          max-width: 600px;
                          height: auto;
                          margin: auto;
                          display: block;
                        "
                      />
                      <h3 class="name">Hi, ${name}</h3>
                      <span class="position">Username: ${registerNumber}</span>
                      <br />
                      <span class="position">Password: ${password}</span>
                      <p><a href="#" class="btn btn-primary">LOGIN</a></p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <footer class="footer-section">
          <div class="container">
            <div class="footer-content pt-5 pb-5">
              <div class="row">
                <div class="col-xl-6 col-lg-6 mb-50">
                  <div class="footer-widget">
                    <div class="footer-logo">
                      <a href="http://www.health-centre.mitindia.edu/healthCare"
                        ><img
                          src="https://health-center.vercel.app/assets/images/mit-hc-footer.png"
                          class="img-fluid"
                          alt="logo"
                      /></a>
                    </div>
                    <div class="footer-text">
                      <p>
                        Health Centre is committed to promoting the health and
                        wellness of the campus community by providing
                        high-quality prevention, education, and treatment
                        services.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 mb-30">
                  <div class="footer-widget">
                    <div class="footer-widget-heading">
                      <h3>Useful Links</h3>
                    </div>
                    <ul>
                      <li>
                        <a
                          href="http://www.health-centre.mitindia.edu/health_centre/"
                          >Home</a
                        >
                      </li>
                      <li>
                        <a
                          href="http://www.health-centre.mitindia.edu/health_centre/about.html"
                          >About</a
                        >
                      </li>
                      <li>
                        <a
                          href="http://www.health-centre.mitindia.edu/health_centre/services.html"
                          >services</a
                        >
                      </li>
                      <li>
                        <a href="https://health-center.vercel.app/"
                          >Automation Software</a
                        >
                      </li>
                      <li>
                        <a
                          href="http://www.health-centre.mitindia.edu/health_centre/Equiment.html"
                          >Equipments</a
                        >
                      </li>
                      <li>
                        <a
                          href="http://www.health-centre.mitindia.edu/healthCare/"
                          >Student/Staff</a
                        >
                      </li>
                      <li>
                        <a
                          href="http://www.health-centre.mitindia.edu/health_centre/facility.html"
                          >Facilities</a
                        >
                      </li>
                      <li>
                        <a
                          href="http://www.health-centre.mitindia.edu/health_centre/staff.html"
                          >Doctors</a
                        >
                      </li>
                      <li>
                        <a
                          href="http://www.health-centre.mitindia.edu/health_centre/contact.html"
                          >Contact us</a
                        >
                      </li>
                      <li>
                        <a href="https://health-center.vercel.app/team">Team</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </center>
  </body>
</html>

    `,
    // attachments: [
    //   {
    //     filename: "HealthCare.pdf",
    //     path: "./Healthcare-Documentation.pdf", // Change this to the path of your PDF
    //   },
    // ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
      c++;
    }
  });
});

console.log(c);
