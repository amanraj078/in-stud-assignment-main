import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
    req: NextRequest,
    context: { params: { id: string } }
) {
    const id = context.params.id;

    try {
        // Get current state
        const incident = await prisma.incident.findUnique({
            where: { id },
        });

        if (!incident) {
            return NextResponse.json(
                { error: "Incident not found" },
                { status: 404 }
            );
        }

        // Flip resolved
        const updatedIncident = await prisma.incident.update({
            where: { id },
            data: {
                resolved: !incident.resolved,
            },
        });

        return NextResponse.json(updatedIncident);
    } catch (e) {
        return NextResponse.json(
            { error: "Failed to update" },
            { status: 500 }
        );
    }
}
