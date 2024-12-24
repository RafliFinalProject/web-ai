'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function InfoSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="fixed left-4 top-4">
                    <Info className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>About Malaria Detection</SheetTitle>
                </SheetHeader>
                <div className="space-y-4 mt-4">
                    <p className="text-sm text-gray-600">
                        This system uses advanced deep learning algorithms to detect malaria parasites in blood cell images with high accuracy.
                    </p>
                    <div className="space-y-2">
                        <h4 className="font-medium">How it works:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            <li>Upload a blood cell image</li>
                            <li>AI analyzes the cell patterns</li>
                            <li>Results show parasitized or uninfected status</li>
                            <li>Get instant, accurate diagnosis assistance</li>
                        </ul>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}