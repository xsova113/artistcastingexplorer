import sgMail from "@sendgrid/mail";

type SendEmail = {
  to: string[];
  subject: string;
  text: string;
  templateId: string;
};

export const sendEmail = async ({
  subject,
  to,
  templateId,
}: SendEmail) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  try {
    await sgMail.sendMultiple({
      to,
      subject,
      from: "xsova113@gmail.com",
      templateId,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(error);
  }
};
