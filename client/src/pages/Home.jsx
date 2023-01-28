import React from "react";

const Home = () => {
  return (
    <section className="w-full  p-3 bg-[#dadada] flex">
      <div className="w-full flex justify-center items-center flex-col space-y-16 mt-8">
        <h1 className="flex justify-center items-center text-3xl font-semibold">
          Webpage Scraper
        </h1>
        <div className="w-full flex justify-center items-center flex-col space-y-2">
          <input
            type="text"
            placeholder="Enter Website URL"
            className="border border-black rounded-none hover:rounded-none active:rounded-none w-[50%] p-3"
          />
          <p className="text-red-700 font-medium text-lg">error message</p>
        </div>
        <button className="border border-black p-3 w-[30%] bg-slate-500 hover:scale-105 rounded-lg">
          Get Insights
        </button>
        <div className="w-full p-6">
          <h1 className="text-2xl font-semibold mb-10">Results</h1>
          <table className="w-full border border-black ">
            <tr className="border border-black w-full text-xl ">
              <th className="border border-black w-[23%] text-start">Domain Name</th>
              <th className="border border-black w-[10%] text-start">Word Count</th>
              <th className="border border-black w-[10%] text-start">Favourite</th>
              <th className="border border-black w-[23%] text-start">Web Links</th>
              <th className="border border-black w-[23%] text-start">Media Links</th>
              <th className="border border-black w-[10%] text-start">Actions</th>
            </tr>
            <tr className="w-full">
              <td className="border border-black w-[23%]">Alfreds Futterkiste</td>
              <td className="border border-black w-[10%]">Maria Anders</td>
              <td className="border border-black w-[10%]">Germany</td>
              <td className="border border-black w-[23%]">Germany</td>
              <td className="border border-black w-[23%]">Germany</td>
              <td className="border border-black w-[10%]">Germany</td>
            </tr>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Home;
