export const Hero = () => {
    return (
        <section className="flex flex-col items-center justify-center w-full px-4 mt-12 mb-10">
            <div className="max-w-4xl w-full flex flex-col items-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-center mb-8 font-bold text-slate-900 leading-[1.1] tracking-tight">
                    Manage Your Teams, <br className="hidden md:block" />
                    <span className="text-gray-800/70">
                        Assign Tasks, Track Progress
                    </span>
                </h1>

                <p className="max-w-2xl text-slate-500 text-lg md:text-xl text-center font-normal leading-relaxed">
                    <span className="text-slate-800 font-semibold italic"> {" "}Team Tasks</span> gives managers a clear overview of every team,
                    every member, and every task. Assign work, monitor progress,
                    and keep your teams aligned — all in one powerful dashboard.
                </p>
            </div>
        </section>
    );
};
