import React, { useEffect, useState } from 'react';

const BlockyBackground = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const numBlocks = 40; // Adjust for density of falling blocks
    const newBlocks = Array.from({ length: numBlocks }).map((_, i) => {
      const sizeValue = Math.random() * 25 + 15; // Block size: 15px to 40px
      return {
        id: i,
        left: `${Math.random() * 96}%`, // Horizontal position (0-96% to keep mostly in view)
        size: `${sizeValue}px`,
        animationDelay: `${Math.random() * 7}s`, // Staggered fall start (0-7s)
        animationDuration: `${Math.random() * 3 + 4}s`, // Fall duration (4-7s)
        // CSS variables to be used by the animation
        finalBottomOffsetVar: `${Math.random() * 50 + 5}px`, // Stack in a 5px-55px band from viewport bottom
        blockSizeVar: `${sizeValue}px`,
      };
    });
    setBlocks(newBlocks);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none"> {/* Changed z-index */}
      {blocks.map(block => (
        <div
          key={block.id}
          className="absolute bg-primary opacity-0" // Initial state: invisible, color from primary
          style={{
            left: block.left,
            width: block.size,
            height: block.size,
            borderRadius: '3px', // Slightly rounded corners
            animationName: 'fall-and-stack',
            animationDuration: block.animationDuration,
            animationDelay: block.animationDelay,
            animationFillMode: 'forwards', // Stay at the end state of the animation
            animationTimingFunction: 'ease-in', // Blocks accelerate slightly as they fall
            // Pass CSS variables to the keyframes animation
            '--final-bottom-offset': block.finalBottomOffsetVar,
            '--block-actual-height': block.blockSizeVar,
          }}
        />
      ))}
    </div>
  );
};

export default BlockyBackground;

// Add this to your global CSS (e.g., index.css or App.css):
/*
@keyframes fall-and-stack {
  0% {
    transform: translateY(-150vh); // Start well above the viewport
    opacity: 0;
  }
  20% { 
    opacity: 0.8; // Become visible as they enter the screen (can adjust timing)
  }
  100% {
    // Translate to a position where the bottom of the block is 'var(--final-bottom-offset)' 
    // from the viewport bottom.
    transform: translateY(calc(100vh - var(--block-actual-height) - var(--final-bottom-offset)));
    opacity: 1;
  }
}
*/