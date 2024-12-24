"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useState } from 'react';

interface HistoryItem {
    id: string;
    date: string;
    result: string;
    confidence: number;
    imageUrl: string;
}

export function AnalysisHistory() {
    const [history] = useState<HistoryItem[]>([
        {
            id: '1',
            date: '2024-03-25',
            result: 'Uninfected',
            confidence: 0.95,
            imageUrl: '/placeholder-1.jpg'
        },
        {
            id: '2',
            date: '2024-03-24',
            result: 'Parasitized',
            confidence: 0.88,
            imageUrl: '/placeholder-2.jpg'
        }
    ]);

    return (
        <div className="mt-8">
            <Tabs defaultValue="recent" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="recent">Recent Analysis</TabsTrigger>
                    <TabsTrigger value="statistics">Statistics</TabsTrigger>
                </TabsList>
                <TabsContent value="recent">
                    <div className="space-y-4">
                        {history.map((item) => (
                            <HoverCard key={item.id}>
                                <HoverCardTrigger asChild>
                                    <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm cursor-pointer hover:bg-white/60 transition-colors">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium">{item.result}</p>
                                                <p className="text-sm text-gray-500">{item.date}</p>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {(item.confidence * 100).toFixed(1)}% confidence
                                            </div>
                                        </div>
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                    <div className="space-y-2">
                                        <img
                                            src={"/fallback-malaria.jpg"}
                                            alt="Analysis preview"
                                            className="w-full h-40 object-cover rounded-md"
                                        />
                                        <p className="text-sm font-medium">Analysis Details</p>
                                        <p className="text-sm text-gray-500">
                                            Analysis performed on {item.date} with {(item.confidence * 100).toFixed(1)}% confidence level.
                                        </p>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="statistics">
                    <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium">Analysis Overview</h3>
                                <p className="text-sm text-gray-500">Total analyses: 245</p>
                                <p className="text-sm text-gray-500">Average confidence: 92%</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Detection Distribution</h3>
                                <p className="text-sm text-gray-500">Parasitized: 35%</p>
                                <p className="text-sm text-gray-500">Uninfected: 65%</p>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}