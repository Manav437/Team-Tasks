import Select from "react-select";
import { useRef, useEffect } from "react";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/70 overflow-hidden">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 w-19/20 max-w-lg border border-gray-200 relative modal-animate-in">
                {/* <button
                    className="cursor-pointer absolute top-1 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                    onClick={onClose}
                    aria-label="Close"
                    type="button"
                >
                    &times;
                </button> */}
                <h2 className="underline underline-offset-2 text-xl text-center font-bold mb-4 text-slate-800">
                    Add New Team
                </h2>
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Team Name
                        </label>
                        <input
                            ref={teamNameInputRef}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400"
                            placeholder="Team Name"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Initial Task Title{" "}
                            <span className="text-gray-400 font-normal">
                                (optional)
                            </span>
                        </label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400"
                            placeholder="Initial Task Title"
                            value={initialTaskTitle}
                            onChange={(e) =>
                                setInitialTaskTitle(e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Initial Task Stage
                        </label>
                        <Select
                            className="w-full"
                            options={STAGES}
                            value={initialTaskStage}
                            onChange={setInitialTaskStage}
                            isDisabled={!initialTaskTitle.trim()}
                            placeholder="Select Stage"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderColor: "#d1d5db",
                                    minHeight: "38px",
                                    boxShadow: "none",
                                }),
                            }}
                        />
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button
                            type="button"
                            className="cursor-pointer px-3 py-1.5 rounded bg-gray-200"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer px-2 py-1.5 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
                        >
                            Add Team
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
