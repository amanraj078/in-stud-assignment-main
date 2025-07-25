import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const resolvedParam = searchParams.get("resolved");

    let whereClause = {};
    if (resolvedParam !== null) {
        whereClause = { resolved: resolvedParam === "true" };
    }

    const incidents = await prisma.incident.findMany({
        where: whereClause,
        orderBy: {
            tsStart: "desc",
        },
        include: {
            camera: true,
        },
    });

    return NextResponse.json(incidents);
}
