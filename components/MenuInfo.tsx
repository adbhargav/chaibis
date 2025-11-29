'use client';

import React from 'react';

const MenuInfo = () => {
  const generalInfo = { timing: '10:30 AM – 9:00 PM' };
  const lunch = { title: 'Lunch Specials', timing: '11:30 AM – 3:30 PM' };
  const dinner = { title: 'Dinner', timing: '5:30 PM – 10:00 PM' };

  return (
    <div className="bg-[#120a07] rounded-2xl border border-[#2d1a11] p-6 shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#f5eddc] mb-2">Menu</h2>
        <p className="text-[#f5eddc]/70">{generalInfo.timing}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0b0503] rounded-xl p-5 border border-[#2d1a11]">
          <h3 className="text-lg font-semibold text-[#f5eddc] mb-2">{lunch.title}</h3>
          <p className="text-[#c87534] font-medium">{lunch.timing}</p>
        </div>

        <div className="bg-[#0b0503] rounded-xl p-5 border border-[#2d1a11]">
          <h3 className="text-lg font-semibold text-[#f5eddc] mb-2">{dinner.title}</h3>
          <p className="text-[#c87534] font-medium">{dinner.timing}</p>
        </div>
      </div>
    </div>
  );
};

export default MenuInfo;