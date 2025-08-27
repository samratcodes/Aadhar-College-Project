export function Button({ children, type = 'button', onClick, variant = 'default' }) {
    const base = 'rounded-xl px-6 py-2 font-medium';
    const variants = {
      default: 'bg-blgreenue-600 text-white hover:bg-blue-700',
      outline: 'border border-gray-400 text-gray-700 hover:bg-gray-100',
    };
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${base} ${variants[variant]}`}
      >
        {children}
      </button>
    );
  }
  