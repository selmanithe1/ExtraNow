import { Resend } from 'resend';

// Initialize Resend globally
// In development without an API key, we will mock send emails to the console
export const resend = process.env.RESEND_API_KEY 
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

/**
 * Helper function to send an email gracefully
 * Falls back to console.log if Resend isn't configured
 */
export async function sendEmail({
    to,
    subject,
    react
}: {
    to: string;
    subject: string;
    react: React.ReactElement;
}) {
    if (!resend) {
        console.log("-----------------------------------------");
        console.log(`[EMAIL MOCK] To: ${to}`);
        console.log(`[EMAIL MOCK] Subject: ${subject}`);
        console.log("[EMAIL MOCK] Resend API Key is missing. Email not sent.");
        console.log("-----------------------------------------");
        return { success: true, mocked: true };
    }

    try {
        const data = await resend.emails.send({
            from: "ExtraNow <bonjour@extranow.fr>", // Replace with a verified domain eventually
            to: [to],
            subject: subject,
            react: react,
        });

        return { success: true, data };
    } catch (error: any) {
        console.error("Failed to send email via Resend:", error);
        return { success: false, error: error.message };
    }
}
