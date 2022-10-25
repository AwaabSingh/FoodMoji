import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
  },
});



export const sendConfirmationEmail = async(name: string, email: string, confirmationCode: string) => {
   try {
    return await transport.sendMail({
       from: process.env.AUTH_EMAIL,
       to: email,
       subject: "Please confirm your account",
       html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Verify your email address to complete the signup and login to your account</p>
        <a href=http://localhost:5000/api/auth/confirm/${confirmationCode}> Click here</a>
        </div>`,
     });
   } catch (error) {
    console.log(error)
   }
}


// export const sendConfirmationEmail = (
//   name: string,
//   email: string,
//   confirmationCode: string
// ) => {
//   console.log("Check");
//   transport
//     .sendMail({
//       from: process.env.AUTH_EMAIL,
//       to: email,
//       subject: "Please confirm your account",
//       html: `<h1>Email Confirmation</h1>
//         <h2>Hello ${name}</h2>
//         <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
//         <a href=http://localhost:8081/confirm/${confirmationCode}> Click here</a>
//         </div>`,
//     })
//     .catch((err) => console.log(err));
// };