
export const NoTeamsModal = ({ setShowForm }) => {
    return (
        <div className="flex flex-col items-center w-full py-16">
            <div className="text-lg text-gray-600 mb-2">No teams found yet.</div>
            <div className="text-sm text-gray-400 mb-4 italic">
                It's quieter than a library in here... Time to start your first team!
            </div>
            <button
                className="cursor-pointer px-5 py-2 rounded-lg font-semibold transition-colors shadow bg-green-600 text-white hover:bg-green-700"
                onClick={() => setShowForm(true)}
            >
                + Add Your First Team
            </button>
        </div>
    );
};
