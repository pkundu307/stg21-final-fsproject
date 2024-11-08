import nodemailer from 'nodemailer';


export const subscribeUser  = async (req, res) => {
    try {
          const { email } = req.body;
          console.log (email);
          const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: process.env.email,
              pass: process.env.passkey,
            },
          });
          const mailOptions = {
            from: process.env.email,
            to: email,
            subject: "Thanks for subscribing to our NEWSLETTER service",
            text: "This is a test email sent using Nodemailer.",
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email: ", error);
            } else {
              console.log("Email sent: ", info.response);
            }
          });

        // Send a 201 response
        res.status(201).json({ message: 'Subscription successful, confirmation email sent.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while subscribing.' });
    }
};