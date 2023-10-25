"use server";

import sgMail from "@sendgrid/mail";

type SendEmail = {
  to: string[];
  subject: string;
  templateId: string;
  name?: string;
  message?: string;
  userEmail?: string;
};

export const sendEmail = async ({
  subject,
  to,
  templateId,
  message,
  name,
  userEmail,
}: SendEmail) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  try {
    await sgMail.sendMultiple({
      to,
      subject,
      from: {
        name: "ArtistCastingExplorer",
        email: "info@artistcastingexplorer.com",
      },
      templateId,
      dynamicTemplateData: {
        name,
        message,
        userEmail,
      },
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(error);
  }
};
