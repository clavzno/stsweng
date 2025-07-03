const LayoutGrid = ({ children }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {children}
    </div>
  );
};

export default LayoutGrid;
