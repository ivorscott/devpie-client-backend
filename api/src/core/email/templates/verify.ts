const verify = (token: string) => {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
      <title>DevPie Design and Development</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      <style type="text/css">
        
        /* CLIENT-SPECIFIC STYLES ------------------- */
        
        #outlook a {
          padding: 0; /* Force Outlook to provide a "view in browser" message */
        } 
        
        .ReadMsgBody {
          width: 100%; /* Force Hotmail to display emails at full width */
        } 
        
        .ExternalClass {
          width:100%; /* Force Hotmail to display emails at full width */
        }
        
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
          line-height: 100%; /* Force Hotmail to display normal line spacing */
        }
        
        body, table, td, a { /* Prevent WebKit and Windows mobile changing default text sizes */
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        
        table, td { /* Remove spacing between tables in Outlook 2007 and up */
          mso-table-lspace: 0pt;
          mso-table-rspace:0pt;
        }
        
        img { /* Allow smoother rendering of resized image in Internet Explorer */
          -ms-interpolation-mode: bicubic;
        }
      
        /* RESET STYLES --------------------------- */
        
        body { 
          height: 100% !important;
          margin: 0;
          padding: 0;
          width: 100% !important;
        }
        
        img { 
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
        }
        
        table {
          border-collapse: collapse !important;
        }
      
        /* iOS BLUE LINKS */
        
        .apple-links a { 
          color: #999999;
          text-decoration: none;
        }
      
        /* MOBILE STYLES ------------------------ */
        
        @media screen and (max-width: 600px) {
      
          td[class="logo"] img {
            margin: 0 auto !important;
          }
      
          table[class="wrapper"] {
            width: 100% !important;
          } 
      
          td[class="mobile-image-pad"] {
            padding: 0 10px 0 10px !important;
          }
          
          td[class="mobile-title-pad"] {
            padding: 30px 10px 0px 10px !important;
          }
      
          td[class="mobile-text-pad"] {
            padding: 10px 10px 10px 10px !important;
          }
      
          td[class="mobile-column-right"] {
            padding-top: 20px !important;
          }
      
          img[class="fluid-image"] {
            width: 100% !important;
            height: auto !important;
          }
      
          td[class="hide"] {
            display: none !important;
          } 
      
          td[class="mobile-button"] {
            padding: 12px 60px 12px 60px !important;
          }
        
          td[class="mobile-button"] a {
            font-size: 24px !important;
          }
        }
          
      </style>
      </head>
      <body style="margin: 0; padding: 0;">
      
      <!-- CONTAINER TABLE -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td align="center" bgcolor="#111111" style="padding: 20px 0 20px 0;">
            <!-- HIDDEN PREHEADER -->
            <div style="display: none; font-size: 1px; color:#333333; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
              React Development and Design. Sprints and Product Leadership.
            </div>
            <!-- WRAPPER TABLE -->
            <table border="0" cellpadding="0" cellspacing="0" width="600" class="wrapper">
              <!-- LOGO/PREHEADER TEXT -->
              <tr>
                <td>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="left" class="logo">
                        <img src="https://firebasestorage.googleapis.com/v0/b/devpie-7dd4b.appspot.com/o/logo%3Awhite.png?alt=media&token=e9b722b5-c8fb-47d0-a669-c41dabedebf7" alt="DevPie" width="100" border="0" style="display: block;" />
                      </td>
                      <td align="right" class="hide" style="color: #aaaaaa; font-family: Arial, sans-serif; font-weight: normal; font-size: 14px; line-height: 18px;">
                        client release: unfinished mvp
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      
      <!-- CONTAINER TABLE -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td align="center"  bgcolor="#333333" style="padding: 20px 0 20px 0;">
            <!-- WRAPPER TABLE -->
            <table border="0" cellpadding="0" cellspacing="0" width="600" class="wrapper">
              <tr>
                <td>
                  <table border="0" cellpadding="0" cellspacing="0"  width="100%">
                    <tr>
                      <td class="mobile-image-pad">
                        <img src="https://firebasestorage.googleapis.com/v0/b/devpie-7dd4b.appspot.com/o/cool-manager.jpeg?alt=media&token=e5f0eb3d-0bfa-4b31-b7f2-4c579a4b71c3" alt="Look at that full class" width="600" height="236" border="0" style="display: block; padding: 0; color: #ffffff; font-family: Arial, sans-serif; font-weight: bold; font-size: 24px; background-color: #f46e6c; -webkit-border-radius: 4px; border-radius: 4px;" class="fluid-image" />
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding: 20px 0 10px 0; color: #ffffff; font-family: Arial, sans-serif; font-weight: bold; font-size: 32px; line-height: 36px;" class="mobile-title-pad">
                      Account Activation 
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding: 10px 0 10px 0; color: #aaaaaa; font-family: Arial, sans-serif; font-weight: normal; font-size: 18px; line-height: 22px;" class="mobile-text-pad">
                      <span style="font-weight:bold;color:#ffffff;">DevPie Client</span> is an experimental performance tool to manage client projects and automate payments.
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding: 10px 0 10px 0;">
                        <!-- TABLE-BASED BUTTON -->
                        <table border="0" cellpadding="0" cellspacing="0"  width="100%">
                          <tr>
                            <td align="center" style="padding: 20px 0 0 0;">
                              <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td bgcolor="#f46e6c" style="padding: 12px 18px 12px 18px; -webkit-border-radius:3px; border-radius:3px" align="center" class="mobile-button"><a href="${
                                    process.env.REACT_APP_FRONTEND
                                  }/activate/${token}" style="font-size: 16px; font-family: Arial, sans-serif; font-weight: normal; color: #ffffff; text-decoration: none;">Activate &rarr;</a></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      
      <!-- FOOTER -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td align="center" style="padding: 20px 0 20px 0;">
            <!-- WRAPPER TABLE -->
            <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" class="wrapper">
              <tr>
                <td align="center" style="padding: 10px 0 10px 0; color: #666666; font-family: Arial, sans-serif; font-weight: normal; font-size: 14px; line-height: 18px;" class="mobile-text-pad">
                  <span class="apple-links" style="color: #666666; text-decoration: none;">DevPie<br>
                  Kienitzer Str. 100, 12049 Berlin</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      
      </body>
      </html>`;
};

export default verify;
