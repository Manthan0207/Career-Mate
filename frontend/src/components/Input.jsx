import React from "react";

function Input({ icon: Icon, ...props }) {
    return (
        <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon className="w-5 h-5 text-indigo-600" />
            </div>

            <input
                {...props}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          transition duration-200"
            />
        </div>
    );
}

export default Input;
