import React from 'react';
import { KabsaCard } from './KabsaCard';
import { MlokhiaCard } from './MlokhiaCard';
import { ShekhAlmihshiCard } from './ShekhAlmihshiCard';

function PopularMeals() {
  return (
    <section className="bg-white p-5 rounded-lg shadow-md my-10">
      <div className="min-h-screen">
        <h1 className="text-center text-2xl font-bold mb-8 text-[#466919]">Popular Meals</h1>
        <div className="flex flex-wrap justify-center items-stretch gap-6 px-4">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex">
            <KabsaCard />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex">
            <MlokhiaCard />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex">
            <ShekhAlmihshiCard />
          </div>
        </div>
      </div>
    </section>
  );
}



export default PopularMeals;
