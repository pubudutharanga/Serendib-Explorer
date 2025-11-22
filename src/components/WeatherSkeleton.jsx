// src/components/WeatherSkeleton.jsx
import React from 'react';
import { motion } from 'framer-motion';

const WeatherSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gradient-to-r from-slate-200 to-slate-300 h-40 rounded-t-2xl"></div>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherSkeleton;