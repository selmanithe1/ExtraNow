"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/resend";
import { NewMessageEmail } from "@/emails/templates";

export async function createConversation(clientId: string, extraId: string, missionId?: string) {
    try {
        // Check if conversation already exists
        const existing = await prisma.conversation.findFirst({
            where: {
                clientId,
                extraId,
                missionId: missionId || null
            }
        });

        if (existing) {
            return { success: true, conversation: existing };
        }

        const newConv = await prisma.conversation.create({
            data: {
                clientId,
                extraId,
                missionId: missionId || null
            }
        });

        return { success: true, conversation: newConv };
    } catch (error: any) {
        console.error("Failed to create conversation:", error);
        return { success: false, error: "Erreur de base de données." };
    }
}

export async function getConversations(userId: string, role: "CLIENT" | "EXTRA") {
    try {
        const whereClause = role === "CLIENT" ? { clientId: userId } : { extraId: userId };
        
        const conversations = await prisma.conversation.findMany({
            where: whereClause,
            include: {
                client: { select: { id: true, name: true, companyName: true } },
                extra: { select: { id: true, name: true, avatarUrl: true } },
                mission: { select: { id: true, type: true } },
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            },
            orderBy: { updatedAt: 'desc' }
        });

        return { success: true, conversations };
    } catch (error) {
        console.error("Failed to fetch conversations:", error);
        return { success: false, error: "Impossible de charger les conversations." };
    }
}

export async function getMessages(conversationId: string) {
    try {
        const messages = await prisma.message.findMany({
            where: { conversationId },
            orderBy: { createdAt: 'asc' }
        });

        return { success: true, messages };
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return { success: false, error: "Impossible de charger les messages." };
    }
}

export async function sendMessage(conversationId: string, senderId: string, text: string) {
    try {
        if (!text.trim()) {
            return { success: false, error: "Message vide." };
        }

        const message = await prisma.message.create({
            data: {
                conversationId,
                senderId,
                text
            }
        });

        // Update the conversation's updatedAt timestamp to bubble it to the top
        const updatedConv = await prisma.conversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() },
            include: {
                client: { select: { email: true, name: true, companyName: true } },
                extra: { select: { email: true, name: true } }
            }
        });

        // Send Email Notification
        // Check who is the sender and notify the other party
        try {
            const isClientSender = updatedConv.clientId === senderId;
            const recipientEmail = isClientSender ? updatedConv.extra.email : updatedConv.client.email;
            const recipientName = isClientSender ? updatedConv.extra.name : (updatedConv.client.companyName || updatedConv.client.name);
            const senderName = isClientSender ? (updatedConv.client.companyName || updatedConv.client.name) : updatedConv.extra.name;

            if (recipientEmail && senderName && recipientName) {
                // To avoid spam, we could check if the conversation is old, but for MVP we notify on every message
                await sendEmail({
                    to: recipientEmail,
                    subject: "Nouveau message sur ExtraNow",
                    react: NewMessageEmail({
                        recipientName: recipientName,
                        senderName: senderName || "Un utilisateur"
                    })
                });
            }
        } catch (emailError) {
            console.error("Message saved but email failed:", emailError);
        }

        revalidatePath("/entreprises/dashboard/messages");
        revalidatePath("/extras/messages");

        return { success: true, message };
    } catch (error) {
        console.error("Failed to send message:", error);
        return { success: false, error: "Impossible d'envoyer le message." };
    }
}

export async function markMessagesAsRead(conversationId: string, userId: string) {
    try {
        await prisma.message.updateMany({
            where: {
                conversationId,
                senderId: { not: userId },
                read: false
            },
            data: { read: true }
        });
        
        revalidatePath("/entreprises/dashboard/messages");
        revalidatePath("/extras/messages");
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}
