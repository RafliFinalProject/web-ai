'use client';

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { useEffect, useState } from 'react';
import { Command } from 'lucide-react';

export function CommandMenu() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="fixed right-4 top-4 inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none"
            >
                <Command className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline-block">Command Menu</span>
                <kbd className="ml-2 hidden rounded bg-gray-100 px-2 py-0.5 text-xs font-light text-gray-500 sm:inline-block">
                    ⌘K
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Actions">
                        <CommandItem onSelect={() => document.getElementById('image-upload')?.click()}>
                            Upload Image
                        </CommandItem>
                        <CommandItem onSelect={() => window.location.href = '#history'}>
                            View History
                        </CommandItem>
                        <CommandItem onSelect={() => window.location.href = '#about'}>
                            About System
                        </CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Help">
                        <CommandItem onSelect={() => window.location.href = '#documentation'}>
                            Documentation
                        </CommandItem>
                        <CommandItem onSelect={() => window.location.href = '#support'}>
                            Support
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}