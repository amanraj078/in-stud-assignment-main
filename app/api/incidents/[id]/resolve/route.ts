import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// interface RouteContext {
//   params: {
//     id: string;
//   };
// }

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;

    try {
        const incident = await prisma.incident.findUnique({
            where: { id },
        });

        if (!incident) {
            return NextResponse.json(
                { error: "Incident not found" },
                { status: 404 }
            );
        }

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
