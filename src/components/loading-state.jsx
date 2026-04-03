import React from "react";
import { RiGeminiFill } from "react-icons/ri";

export const BrandedLoader = ({ message = "Synchronizing Workspace..." }) => {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-8 w-full animate-fade-in">
            <div className="relative group mb-10">
                <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full animate-pulse" />
                <div className="relative w-24 h-24 bg-white/70 backdrop-blur-md rounded-[32px] border border-white/50 shadow-2xl flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50" />
                    <RiGeminiFill className="text-blue-600 text-5xl relative z-10 animate-spin-slow" />
                    <div className="absolute inset-0 border-2 border-blue-100 rounded-[32px] animate-ping opacity-20" />
                </div>
            </div>

            <div className="flex flex-col items-center gap-3">
                <h3 className="text-lg font-black text-slate-800 tracking-tight text-center">
                    Agentic Syncing
                </h3>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-50/50 border border-blue-100 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                        {message}
                    </span>
                </div>
            </div>
        </div>
    );
};

export const SkeletonGrid = ({ count = 6 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full animate-fade-in">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-sm border border-slate-100 rounded-3xl p-6 shadow-sm overflow-hidden relative">
                    <div className="flex justify-between items-start mb-8">
                        <div className="w-12 h-6 bg-slate-100 rounded-lg animate-pulse" />
                        <div className="flex gap-2">
                            <div className="w-8 h-8 bg-slate-100 rounded-xl animate-pulse" />
                            <div className="w-8 h-8 bg-slate-100 rounded-xl animate-pulse" />
                        </div>
                    </div>
                    
                    <div className="mb-8 space-y-3">
                        <div className="h-8 bg-slate-100 rounded-xl w-3/4 animate-pulse" />
                        <div className="space-y-1.5">
                            <div className="h-3 bg-slate-100/50 rounded-full w-1/4 animate-pulse" />
                            <div className="h-2.5 bg-slate-100 rounded-full w-full animate-pulse opacity-50" />
                        </div>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-slate-50/50 flex justify-between items-center">
                        <div className="w-32 h-4 bg-slate-50 rounded animate-pulse" />
                        <div className="w-6 h-6 bg-slate-50 rounded-full animate-pulse" />
                    </div>

                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
            ))}
        </div>
    );
};

export const SkeletonBoard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full animate-fade-in">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-3 h-3 rounded-full bg-slate-200 animate-pulse" />
                        <div className="w-24 h-4 bg-slate-100 rounded-full animate-pulse" />
                        <div className="w-6 h-5 bg-slate-50 rounded-full animate-pulse" />
                    </div>
                    
                    <div className="space-y-4">
                        {[...Array(2)].map((_, j) => (
                            <div key={j} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4 relative overflow-hidden">
                                <div className="h-6 bg-slate-50 rounded-lg w-5/6 animate-pulse" />
                                <div className="space-y-2">
                                    <div className="h-2 bg-slate-50 rounded-full w-full animate-pulse" />
                                    <div className="h-2 bg-slate-50 rounded-full w-2/3 animate-pulse" />
                                </div>
                                <div className="pt-4 border-t border-slate-50 flex justify-between">
                                    <div className="w-16 h-3 bg-slate-50 rounded animate-pulse" />
                                    <div className="w-4 h-4 bg-slate-50 rounded animate-pulse" />
                                </div>
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-slate-100/50 to-transparent animate-shimmer" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
