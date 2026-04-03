import Select from "react-select";
import { useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { RiTeamLine, RiCloseLine } from "react-icons/ri";

export const AddTeamModal = ({
    show,
    onClose,
    onSubmit,
    teamName,
    setTeamName,
    initialTaskTitle,
    setInitialTaskTitle,
    initialTaskStage,
    setInitialTaskStage,
    STAGES,
    teamNameInputRef,
}) => {
    useEffect(() => {
        if (show && teamNameInputRef?.current) {
            teamNameInputRef.current.focus();
        }
    }, [show, teamNameInputRef]);

    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [show]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in overflow-hidden">
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full max-w-md overflow-hidden modal-animate-in relative">
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-200">
                            <RiTeamLine className="text-white text-xl" />
                        </div> */}
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                            Create New Team
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                        title="Close"
                    >
                        <RiCloseLine size={20} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="flex flex-col">
                    <div className="p-6 flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                                Team Name
                            </label>
                            <input
                                ref={teamNameInputRef}
                                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
                                placeholder="Engineering, Design, Marketing..."
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                                Initial Task Title <span className="text-slate-300 font-normal">(Optional)</span>
                            </label>
                            <input
                                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
                                placeholder="e.g., Set up project repository"
                                value={initialTaskTitle}
                                onChange={(e) => setInitialTaskTitle(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                                Initial Task Stage
                            </label>
                            <Select
                                options={STAGES}
                                value={initialTaskStage}
                                onChange={setInitialTaskStage}
                                isDisabled={!initialTaskTitle.trim()}
                                placeholder="Select Stage..."
                                className="text-sm"
                                classNamePrefix="react-select"
                                menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        borderRadius: '0.75rem',
                                        borderColor: '#e2e8f0',
                                        backgroundColor: '#f8fafc',
                                        padding: '2px',
                                        boxShadow: 'none',
                                        '&:hover': { borderColor: '#2563eb' }
                                    }),
                                    menuPortal: (base) => ({ ...base, zIndex: 9999 })
                                }}
                            />
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end">
                        <button
                            type="button"
                            className="cursor-pointer px-5 py-2 rounded-[50px] [corner-shape:squircle] bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-all text-sm"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer px-3.5 py-2.5 rounded-[50px] [corner-shape:squircle] bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95 text-sm flex items-center gap-2"
                        >
                            <IoIosAdd size={22} />
                            Create Team
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
