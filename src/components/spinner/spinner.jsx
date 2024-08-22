import React from 'react';
import './spinner.css';

export function SpinnerLoader({ isLoading }) {
  return (
    <>
      {isLoading ? (
        <div className="loading">
          <span className="text-black">Loading</span>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
