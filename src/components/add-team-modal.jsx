import Select from "react-select";
import { useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { RiCloseLine } from "react-icons/ri";

const statusDotColors = {
    "Not Started": "bg-slate-400",
    "In Progress": "bg-blue-500",
    Completed: "bg-emerald-500",
};

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
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/30 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-team-title">
            <div className="bg-white rounded-xl shadow-xl flex flex-col w-full max-w-md max-h-[90dvh] overflow-y-auto relative">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 id="create-team-title" className="text-base font-semibold text-slate-800">
                            Create team
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
                            <label htmlFor="team-name" className="text-sm font-medium text-slate-600">
                                Team name
                            </label>
                            <input
                                id="team-name"
                                ref={teamNameInputRef}
                                className="px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors placeholder:text-slate-400"
                                placeholder="Engineering, Design, Marketing..."
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="initial-task-title" className="text-sm font-medium text-slate-600">
                                First task <span className="text-slate-400 font-normal">(optional)</span>
                            </label>
                            <input
                                className="px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors placeholder:text-slate-400"
                                id="initial-task-title"
                                placeholder="e.g., Set up project repository"
                                value={initialTaskTitle}
                                onChange={(e) => setInitialTaskTitle(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="initial-task-stage" className="text-sm font-medium text-slate-600">
                                Task status
                            </label>
                            <Select
                                inputId="initial-task-stage"
                                instanceId="initial-task-stage"
                                options={STAGES}
                                formatOptionLabel={(option) => (
                                    <span className="flex items-center">
                                        <span aria-hidden="true" className={`mr-2 h-2 w-2 shrink-0 rounded-full ${statusDotColors[option.value] || "bg-slate-400"}`} />
                                        {option.label}
                                    </span>
                                )}
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
                                        borderRadius: '0.5rem',
                                        borderColor: '#e2e8f0',
                                        backgroundColor: '#ffffff',
                                        padding: '2px',
                                        boxShadow: 'none',
                                        '&:hover': { borderColor: '#2563eb' }
                                    }),
                                    menuPortal: (base) => ({ ...base, zIndex: 9999 })
                                }}
                            />
                        </div>
                    </div>

                    <div className="px-6 py-4 border-t border-slate-100 flex gap-3 justify-end">
                        <button
                            type="button"
                            className="cursor-pointer px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors text-sm focus-visible:ring-2 focus-visible:ring-blue-300"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer px-3.5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-blue-300"
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
