import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Step 1: Create 3+ Cameras
    const cameras = await prisma.camera.createMany({
        data: [
            { name: "Shop Floor A", location: "Level 1 - East Wing" },
            { name: "Vault", location: "Level -2 - Restricted Zone" },
            { name: "Entrance", location: "Ground Floor - Main Gate" },
            { name: "Loading Dock", location: "Rear Exit" },
        ],
    });

    // Fetch the created cameras
    const allCameras = await prisma.camera.findMany();

    // Helper to generate timestamps within a single 24-hour period (e.g., July 22, 2025)
    const baseDate = new Date("2025-07-22T00:00:00Z");
    function addMinutes(date: Date, minutes: number): Date {
        return new Date(date.getTime() + minutes * 60000);
    }

    // Step 2: Create 12+ Incidents
    const incidentsData = [
        {
            cameraId: allCameras[0].id,
            type: "Unauthorized Access",
            tsStart: baseDate,
            tsEnd: addMinutes(baseDate, 5),
            thumbnailUrl: "/cam placeholder 1.png",
            resolved: false,
        },
        {
            cameraId: allCameras[0].id,
            type: "Face Recognised",
            tsStart: addMinutes(baseDate, 15),
            tsEnd: addMinutes(baseDate, 18),
            thumbnailUrl: "/cam placeholder 2.png",
            resolved: true,
        },
        {
            cameraId: allCameras[1].id,
            type: "Gun Threat",
            tsStart: addMinutes(baseDate, 30),
            tsEnd: addMinutes(baseDate, 35),
            thumbnailUrl: "/cam placeholder 3.png",
            resolved: false,
        },
        {
            cameraId: allCameras[1].id,
            type: "Unauthorized Access",
            tsStart: addMinutes(baseDate, 50),
            tsEnd: addMinutes(baseDate, 53),
            thumbnailUrl: "/cam placeholder 1.png",
            resolved: false,
        },
        {
            cameraId: allCameras[1].id,
            type: "Face Recognised",
            tsStart: addMinutes(baseDate, 60),
            tsEnd: addMinutes(baseDate, 62),
            thumbnailUrl: "/cam placeholder 2.png",
            resolved: true,
        },
        {
            cameraId: allCameras[2].id,
            type: "Gun Threat",
            tsStart: addMinutes(baseDate, 75),
            tsEnd: addMinutes(baseDate, 80),
            thumbnailUrl: "/cam placeholder 3.png",
            resolved: true,
        },
        {
            cameraId: allCameras[2].id,
            type: "Face Recognised",
            tsStart: addMinutes(baseDate, 95),
            tsEnd: addMinutes(baseDate, 100),
            thumbnailUrl: "/cam placeholder 2.png",
            resolved: false,
        },
        {
            cameraId: allCameras[2].id,
            type: "Unauthorized Access",
            tsStart: addMinutes(baseDate, 120),
            tsEnd: addMinutes(baseDate, 125),
            thumbnailUrl: "/cam placeholder 3.png",
            resolved: true,
        },
        {
            cameraId: allCameras[3].id,
            type: "Gun Threat",
            tsStart: addMinutes(baseDate, 140),
            tsEnd: addMinutes(baseDate, 145),
            thumbnailUrl: "/cam placeholder 1.png",
            resolved: false,
        },
        {
            cameraId: allCameras[3].id,
            type: "Unauthorized Access",
            tsStart: addMinutes(baseDate, 160),
            tsEnd: addMinutes(baseDate, 165),
            thumbnailUrl: "/cam placeholder 2.png",
            resolved: true,
        },
        {
            cameraId: allCameras[3].id,
            type: "Face Recognised",
            tsStart: addMinutes(baseDate, 180),
            tsEnd: addMinutes(baseDate, 182),
            thumbnailUrl: "/cam placeholder 3.png",
            resolved: false,
        },
        {
            cameraId: allCameras[0].id,
            type: "Gun Threat",
            tsStart: addMinutes(baseDate, 200),
            tsEnd: addMinutes(baseDate, 205),
            thumbnailUrl: "/cam placeholder 1.png",
            resolved: true,
        },
    ];

    await prisma.incident.createMany({
        data: incidentsData,
    });

    console.log("Seed data inserted.");
}

main()
    .catch((e) => {
        console.error("Error seeding data:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
