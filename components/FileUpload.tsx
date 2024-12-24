"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, ImageIcon, CheckCircle2, XCircle } from 'lucide-react';

export default function FileUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [prediction, setPrediction] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
            setPrediction(null);
            setError(null);
        }
    };

    const handleSubmit = async () => {
        if (!file) return;
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch('http://localhost:5000/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to process image');
            const data = await response.json();
            setPrediction(data.prediction);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Card className="w-full max-w-3xl mx-auto backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardContent className="p-6">
                    <div className="space-y-6">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="image-upload"
                        />
                        <label
                            htmlFor="image-upload"
                            className="group relative flex flex-col items-center justify-center w-full h-72 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50/50 transition-all duration-200"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex flex-col items-center justify-center p-6 text-center"
                            >
                                <Upload className="w-12 h-12 mb-4 text-gray-400 group-hover:text-gray-500 transition-colors" />
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                            </motion.div>
                        </label>

                        <AnimatePresence mode="wait">
                            {preview && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="relative rounded-xl overflow-hidden shadow-lg"
                                >
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-auto max-h-[400px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </motion.div>
                            )}

                            {prediction && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-4"
                                >
                                    <Alert className={`
                    ${prediction === 'Parasitized'
                                            ? 'bg-red-50/80 border-red-200 text-red-800'
                                            : 'bg-green-50/80 border-green-200 text-green-800'}
                    backdrop-blur-sm
                  `}>
                                        <div className="flex items-center gap-2">
                                            {prediction === 'Parasitized' ? (
                                                <XCircle className="h-5 w-5 text-red-600" />
                                            ) : (
                                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                            )}
                                            <AlertDescription className="text-lg font-medium">
                                                {prediction}
                                            </AlertDescription>
                                        </div>
                                    </Alert>
                                </motion.div>
                            )}

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <Alert variant="destructive" className="bg-red-50/80 backdrop-blur-sm">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {file && !prediction && !error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-center"
                            >
                                <Button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="px-8 py-6 text-lg bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-700 hover:to-cyan-700 transition-all duration-200"
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Analyzing...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <ImageIcon className="w-5 h-5" />
                                            <span>Analyze Image</span>
                                        </div>
                                    )}
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}