"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge, ShieldAlert, XCircle } from "lucide-react";
import Navigations from "./Navigations";

interface Incident {
    id: string;
    type: string;
    tsStart: string;
    tsEnd: string;
    thumbnailUrl: string;
    resolved: boolean;
    camera: {
        name: string;
    };
}

function CameraPage() {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/api/incidents?resolved=false")
            .then((res) => res.json())
            .then((data) => {
                setIncidents(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load incidents.");
                setLoading(false);
            });
    }, []);

    const handleResolve = async (id: string) => {
        try {
            const res = await fetch(`/api/incidents/${id}/resolve`, {
                method: "PATCH",
            });
            const updated = await res.json();

            // Update local state
            setIncidents((prev) => prev.filter((i) => i.id !== updated.id));
        } catch (err) {
            console.error("Failed to resolve incident:", err);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Navigations />
            <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {/* 🎥 Video Section */}
                <section className="md:col-span-2 space-y-4">
                    <div className="relative rounded-xl overflow-hidden border border-gray-700">
                        <video
                            src="/camera footage.mp4"
                            className="w-full h-[380px] bg-black object-cover"
                            controls
                        />
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded text-sm">
                            Camera - 01
                        </div>
                        <div className="flex space-x-4 absolute bottom-4 right-2">
                            {[1, 2, 3].map((cam) => (
                                <Image
                                    key={cam}
                                    src={`/cam placeholder ${cam}.png`}
                                    alt={`Camera ${cam}`}
                                    width={120}
                                    height={80}
                                    priority
                                    className="rounded-lg border border-gray-700 cursor-pointer hover:ring-2 hover:ring-yellow-400 transition"
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 📋 Incident List */}
                <section className="space-y-4 h-[480px]">
                    <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-lg font-semibold">
                            <Image
                                src="/alert.png"
                                width={20}
                                height={20}
                                alt=""
                            />
                            {loading
                                ? "Loading..."
                                : `${incidents.length} Unresolved Incidents`}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-white rounded-full border border-gray-700 px-2 py-1">
                            <Image
                                src="/seen.png"
                                width={20}
                                height={20}
                                alt=""
                            />
                            Resolved Incidents
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <div className="flex flex-col overflow-y-auto h-[340px]">
                        {incidents.map((incident) => (
                            <div
                                key={incident.id}
                                className="flex items-center space-x-4 p-3 bg-black rounded-lg border-b border-gray-700"
                            >
                                <Image
                                    src={incident.thumbnailUrl}
                                    alt="incident"
                                    width={80}
                                    height={45}
                                    className="rounded border"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <ShieldAlert className="h-4 w-4 text-red-500" />
                                        <span>{incident.type}</span>
                                    </div>
                                    <div className="text-sm text-gray-300 mt-1">
                                        {incident.camera.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {formatTimestamp(
                                            incident.tsStart,
                                            incident.tsEnd
                                        )}
                                    </div>
                                </div>
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => handleResolve(incident.id)}
                                    className="hover:bg-gray-700"
                                >
                                    Resolve
                                </Button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

function formatTimestamp(start: string, end: string) {
    const s = new Date(start);
    const e = new Date(end);
    const opts: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        day: "numeric",
        month: "short",
        year: "numeric",
    };
    return `${s.getHours()}:${s.getMinutes()} - ${e.getHours()}:${e.getMinutes()} on ${s.toLocaleDateString(
        undefined,
        opts
    )}`;
}

export default CameraPage;
