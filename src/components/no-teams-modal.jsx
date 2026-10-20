import { RiTeamLine } from "react-icons/ri";
import { IoIosAdd } from "react-icons/io";

export const NoTeamsModal = ({ setShowForm }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-xl border border-slate-200 w-full text-center">
            <div className="mb-4 text-slate-400">
                <RiTeamLine className="text-3xl" />
            </div>

            <h3 className="text-base font-semibold text-slate-900 mb-2">
                No teams yet
            </h3>

            <p className="text-sm text-slate-500 max-w-xs mb-5 leading-relaxed">
                Create a team to start organizing tasks and tracking progress.
            </p>

            <button
                className="cursor-pointer flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm focus-visible:ring-2 focus-visible:ring-blue-300"
                onClick={() => setShowForm(true)}
            >
                <IoIosAdd size={22} />
                Create team
            </button>
        </div>
    );
};
