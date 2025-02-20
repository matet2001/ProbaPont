import nodemailer from "nodemailer";

const { GMAIL_APP_PASSWORD, GMAIL_ADDRESS } = process.env;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: GMAIL_ADDRESS as string,
        pass: GMAIL_APP_PASSWORD as string,
    },
});

export const sendConfirmationEmail = async (
    to: string,
    confirmationLink: string,
) => {
    const mailOptions = {
        from: GMAIL_ADDRESS,
        to,
        subject: "Confirm Your Registration on ProbaPont.git",
        html: `<p>Please click the link below to confirm your registration to ProbaPont.git</p>
           <a href="${confirmationLink}">${confirmationLink}</a>`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
