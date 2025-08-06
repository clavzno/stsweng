import LayoutGrid from './LayoutGrid';
import DragHandle from './DragHandle';

const sampleCards = ['Card A', 'Card B', 'Card C'];

const DashboardLayoutEditor = () => {
  return (
    <LayoutGrid>
      {sampleCards.map((title, index) => (
        <div key={index} className="bg-white dark:bg-dark-bg rounded-lg shadow p-4 relative">
          <div className="absolute top-2 right-2">
            <DragHandle />
          </div>
          <h3 className="text-lg font-bold text-text dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">Widget content here</p>
        </div>
      ))}
    </LayoutGrid>
  );
};

export default DashboardLayoutEditor;
