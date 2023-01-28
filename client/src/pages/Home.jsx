import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [webLink, setWebLink] = useState("");
  const [error, setError] = useState("");
  const [scraps, setScraps] = useState("");

  const handleChange = (e) => {
    setWebLink(e.target.value);
  };

  // Handle onclick function for scraping

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const scrapedData = await axios.post(
        "http://localhost:5000/text/text-scrap",
        { web: webLink }
      );
      console.log(scrapedData);
    } catch (error) {
      console.log(error);
    }
  };

  // Load scraped data from background when page is loading..

  useEffect(() => {
    async function scraping() {
      const scrap = await axios.get(
        "http://localhost:5000/text/get-all-scraped-details"
      );
      if (scrap) setScraps(scrap.data);
    }
    scraping();
  }, []);

  // Handle Delete functionality for a scrap data

  const handleDelete = async (e, id) => {
    try {
      await axios.delete(
        `http://localhost:5000/text/remove-one-scraped-data/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFav = () => {};

  console.log(scraps);

  return (
    <section className="w-full min-h-screen  p-3 bg-[#dadada] flex max-w-screen">
      <div className="w-full flex justify-center items-center flex-col space-y-16 mt-8">
        <h1 className="flex justify-center items-center text-3xl font-semibold">
          Webpage Scraper
        </h1>
        <div className="w-full flex justify-center items-center flex-col space-y-2">
          <input
            type="text"
            placeholder="Enter Website URL"
            value={webLink}
            className="border border-black rounded-none hover:rounded-none active:rounded-none w-[50%] p-3"
            onChange={handleChange}
          />
          <p className="text-red-700 font-medium text-lg">error message</p>
        </div>
        <button
          className="border border-black p-3 w-[30%] bg-slate-500 hover:scale-105 rounded-lg"
          onClick={handleClick}
        >
          Get Insights
        </button>
        <div className="w-full p-6">
          <h1 className="text-2xl font-semibold mb-10">Results</h1>
          <table className="w-full border border-black ">
            <tr className="border border-black w-full text-xl">
              <th className="border border-black w-[23%] text-start">
                Domain Name
              </th>
              <th className="border border-black w-[10%] text-start">
                Word Count
              </th>
              <th className="border border-black w-[10%] text-start">
                Favourite
              </th>
              <th className="border border-black w-[23%] text-start max-w-[23%]">
                Web Links
              </th>
              <th className="border border-black w-[23%] text-start">
                Media Links
              </th>
              <th className="border border-black w-[10%] text-start">
                Actions
              </th>
            </tr>
            {scraps &&
              scraps.map((sc) => (
                <tr className="w-full" key={sc._id}>
                  <td className="border border-black w-[23%]">{sc.webLink}</td>
                  <td className="border border-black w-[10%]">
                    {sc.textCount}
                  </td>
                  <td className="border border-black w-[10%]">
                    {sc.favourite.toString()}
                  </td>
                  <td className="border border-black w-[23%] max-w-[23%]">
                    {sc.links.map((link, index) => (
                      <div className="text-ellipsis">
                        <a key={index} href={link} className="text-blue-600">
                          {link}
                        </a>
                        <br/>
                      </div>
                    ))}
                  </td>
                  <td className="border border-black w-[23%]">
                    {sc.images.map((img, index) => (
                      <div className="text-ellipsis">
                        <a key={index} href={img} className="text-blue-600">{img}</a>
                        <br />
                      </div>
                    ))}
                  </td>
                  <td className="border border-black w-[10%] flex flex-col">
                    <button
                      className="border p-3 border-black"
                      onClick={() => {
                        handleDelete(sc._id);
                      }}
                    >
                      Remove
                    </button>
                    <button
                      className="border p-3 border-black"
                      onClick={handleAddFav(sc._id)}
                    >
                      Add to Fav
                    </button>
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </section>
  );
};

export default Home;
