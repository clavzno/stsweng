import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
    id,
    type = 'text',
    label,
    value,
    onChange,
    placeholder = '',
    style = {},
    className = '',
    ...rest
    }) => {
    // Base classes shared by every input instance
const baseInputClasses =
        'w-full px-4 py-3 bg-[#0D122C] border border-gray-600 text-white ' +
        'placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary ' +
        'focus:border-transparent transition-all duration-200 font-roboto text-sm ' +
        'hover:border-primary hover:border-opacity-50';

return (
        <div className="mb-4">
        <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-300 mb-2 font-roboto tracking-wide"
        >
            {label}
        </label>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${baseInputClasses} ${className}`}
            style={style}
            {...rest}
        />
        </div>
);
};

FormInput.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url']),
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    };

FormInput.defaultProps = {
    type: 'text',
    placeholder: '',
    style: {},
    className: '',
    };

export default FormInput;
