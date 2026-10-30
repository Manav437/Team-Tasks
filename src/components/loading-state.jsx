import React from "react";


export const BrandedLoader = ({ message = "Loading workspace…" }) => (
    <div role="status" className="flex items-center justify-center gap-3 py-20 text-sm text-muted">
        <span aria-hidden="true" className="h-4 w-4 rounded-full border-2 border-line border-t-current motion-safe:animate-spin" />
        <span>{message}</span>
    </div>
);

export const SkeletonGrid = ({ count = 6 }) => {
    return (
        <div role="status" aria-label="Loading teams" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="bg-panel border border-line rounded-md p-5 overflow-hidden relative">
                    <div className="flex justify-between items-start mb-5">
                        <div className="w-12 h-6 bg-raised rounded-md animate-pulse" />
                        <div className="flex gap-2">
                            <div className="w-8 h-8 bg-raised rounded-md animate-pulse" />
                            <div className="w-8 h-8 bg-raised rounded-md animate-pulse" />
                        </div>
                    </div>

                    <div className="mb-5 space-y-3">
                        <div className="h-5 bg-raised rounded w-3/4 animate-pulse" />
                        <div className="space-y-1.5">
                            <div className="h-3 bg-raised/50 rounded-full w-1/4 animate-pulse" />
                            <div className="h-1 bg-raised rounded-full w-full animate-pulse opacity-50" />
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-line flex justify-between items-center">
                        <div className="w-32 h-4 bg-canvas rounded animate-pulse" />
                        <div className="w-6 h-6 bg-canvas rounded-full animate-pulse" />
                    </div>


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
                        <div className="w-3 h-3 rounded-full bg-raised animate-pulse" />
                        <div className="w-24 h-4 bg-raised rounded-full animate-pulse" />
                        <div className="w-6 h-5 bg-canvas rounded-full animate-pulse" />
                    </div>

                    <div className="space-y-4">
                        {[...Array(2)].map((_, j) => (
                            <div key={j} className="bg-panel p-4 rounded-md border border-line space-y-4 relative overflow-hidden">
                                <div className="h-6 bg-canvas rounded-md w-5/6 animate-pulse" />
                                <div className="space-y-2">
                                    <div className="h-2 bg-canvas rounded-full w-full animate-pulse" />
                                    <div className="h-2 bg-canvas rounded-full w-2/3 animate-pulse" />
                                </div>
                                <div className="pt-4 border-t border-line flex justify-between">
                                    <div className="w-16 h-3 bg-canvas rounded animate-pulse" />
                                    <div className="w-4 h-4 bg-canvas rounded animate-pulse" />
                                </div>
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-raised/30 to-transparent animate-shimmer" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
