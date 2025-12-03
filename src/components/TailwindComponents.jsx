import React from 'react';

// Clean White Card
export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ title, subtitle, action }) => (
  <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

export const CardBody = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

// Crisp Inputs
export const Label = ({ children }) => (
  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
    {children}
  </label>
);

export const Input = (props) => (
  <input
    {...props}
    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition shadow-sm"
  />
);

export const Select = (props) => (
  <select
    {...props}
    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition shadow-sm"
  >
    {props.children}
  </select>
);

// Professional Buttons
export const Button = ({ children, variant = 'primary', className = "", ...props }) => {
  const base = "inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-200",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Clean Table
export const Table = ({ headers, children }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-50/50 border-b border-gray-200">
          {headers.map((h, i) => (
            <th key={i} className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white">
        {children}
      </tbody>
    </table>
  </div>
);

export const TableRow = ({ children, onClick }) => (
  <tr 
    onClick={onClick}
    className={`group transition-colors duration-150 ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
  >
    {children}
  </tr>
);

export const TableCell = ({ children, className = "" }) => (
  <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-600 ${className}`}>
    {children}
  </td>
);

export const Badge = ({ type, text }) => {
  const styles = {
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    danger: "bg-red-50 text-red-700 border border-red-200",
    neutral: "bg-gray-50 text-gray-600 border border-gray-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[type] || styles.neutral}`}>
      {type === 'success' && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"/>}
      {type === 'danger' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"/>}
      {text}
    </span>
  );
};