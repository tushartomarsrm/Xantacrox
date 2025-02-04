/* eslint-disable react/prop-types */
const FormField = ({ field, value, onChange, isEditable }) => {
    switch (field.iType) {
      case "text":
      case "number":
      case "date":
        return (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-sm">
            <label className="block text-sm font-semibold mb-2">{field.label}</label>
            <input
              type={field.iType}
              name={field.keY}
              placeholder={field.placeholder}
              value={value}
              disabled={!isEditable}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        );
  
      case "select":
        return (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-sm">
            <label className="block text-sm font-semibold mb-2">{field.label}</label>
            <select
              name={field.keY}
              value={value}
              disabled={!isEditable}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
  
      case "checkbox":
        return (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-sm flex items-center">
            <input
              type="checkbox"
              name={field.keY}
              disabled={!isEditable}
              checked={value === "true"}
              onChange={onChange}
              className="mr-2"
            />
            <span>{field.label}</span>
          </div>
        );
  
      default:
        return null;
    }
  };
  export default FormField;