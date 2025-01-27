import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full bg-customWhite h-30 flex items-center">
      <div className="px-4 sm:px-6 flex items-center justify-between w-full">
        {/* Site branding */}
        <div className="flex items-center h-full">
          <button className="h-full">
            <img src="/images/Aspia_logo.png" alt="Aspia Logo" className="h-20" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;