const SaveLayoutButton = ({ onSave }) => {
  return (
    <button
      data-testid="save-layout-button"
      onClick={onSave}
      className="bg-green text-white px-4 py-2 rounded hover:bg-opacity-80"
    >
      💾 Save Layout
    </button>
  );
};

export default SaveLayoutButton;
