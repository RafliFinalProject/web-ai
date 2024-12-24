"use client"

import { motion } from 'framer-motion';

export default function AnimatedHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mb-12"
        >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                Malaria Parasite Detection
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Advanced AI-powered analysis for rapid and accurate malaria diagnosis
            </p>
        </motion.div>
    );
}