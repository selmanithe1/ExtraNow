import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get("Stripe-Signature") as string;
    
    let event;

    try {
        if (!process.env.STRIPE_WEBHOOK_SECRET) {
            console.warn("No STRIPE_WEBHOOK_SECRET set. Skipping signature verification (not recommended for production).");
            event = JSON.parse(body);
        } else {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        }
    } catch (error: any) {
        console.error("Webhook Error:", error.message);
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;
        const metadata = session.metadata;

        if (metadata?.missionId) {
            try {
                // Update mission status to EN_ATTENTE (active/paid)
                await prisma.mission.update({
                    where: { id: metadata.missionId },
                    data: { status: "EN_ATTENTE" }
                });

                // Update payment status to PAID
                await prisma.payment.update({
                    where: { missionId: metadata.missionId },
                    data: { status: "PAID" }
                });

                console.log(`Payment successful for mission: ${metadata.missionId}`);
            } catch (error) {
                console.error("Database update error for mission webhook:", error);
            }
        }
    }

    return NextResponse.json({ received: true }, { status: 200 });
}
