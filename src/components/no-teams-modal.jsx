import { RiTeamLine } from "react-icons/ri";
import { IoIosAdd } from "react-icons/io";

export const NoTeamsModal = ({ setShowForm }) => {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-8 bg-white/70 backdrop-blur-sm rounded-[40px] border border-slate-200 shadow-sm animate-fade-in w-full text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-2xl ring-2 ring-black/5 flex items-center justify-center mb-8 shadow-inner border border-slate-100 group">
                <RiTeamLine className="text-slate-300 text-5xl" />
            </div>

            <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                No Teams Created
            </h3>

            <p className="text-slate-500 font-medium max-w-sm mb-10 leading-relaxed">
                It's a bit empty here! Start by creating your first team to manage tasks and monitor progress in real-time.
            </p>

            <button
                className="cursor-pointer flex items-center justify-center gap-2 px-8 py-3.5 rounded-[50px] [corner-shape:squircle] bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 text-base group"
                onClick={() => setShowForm(true)}
            >
                <IoIosAdd size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                Create Your First Team
            </button>
        </div>
    );
};
