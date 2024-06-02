import React from 'react';

const AccessCounterBox = ({ count }: { count: number }) => {
  return (
    <>
      あなたは<br />
      { count.toString().padStart(6, "0") }<br />
      番目の訪問者です
    </>
  );
};

export default AccessCounterBox;
