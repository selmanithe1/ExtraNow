import { sendEmail } from "../src/lib/resend";
import { ApplicationAcceptedEmail, NewApplicationEmail, NewMessageEmail } from "../src/emails/templates";
import * as React from "react";

async function testEmails() {
    console.log("=== Testing 'Application Accepted' Email ===");
    await sendEmail({
        to: "test-extra@example.com",
        subject: "Votre candidature a été acceptée !",
        react: ApplicationAcceptedEmail({
            extraName: "Jean Dupont",
            companyName: "Hôtel Le Bristol",
            missionType: "Chef de Rang",
            missionDate: "2024-05-15"
        })
    });

    console.log("\n=== Testing 'New Application' Email ===");
    await sendEmail({
        to: "test-client@example.com",
        subject: "Nouvelle candidature pour Chef de Rang",
        react: NewApplicationEmail({
            companyName: "Hôtel Le Bristol",
            extraName: "Jean Dupont",
            missionType: "Chef de Rang"
        })
    });

    console.log("\n=== Testing 'New Message' Email ===");
    await sendEmail({
        to: "test-user@example.com",
        subject: "Nouveau message reçu",
        react: NewMessageEmail({
            recipientName: "Hôtel Le Bristol",
            senderName: "Jean Dupont"
        })
    });
}

testEmails().catch(console.error);
