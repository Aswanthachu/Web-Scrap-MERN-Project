import React, { useState, useEffect } from "react";
import axios from "axios";
import { isWebUri } from "valid-url";

const Home = () => {
  const [webLink, setWebLink] = useState("");
  const [error, setError] = useState("");
  const [scraps, setScraps] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    setWebLink(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let regex1 = new RegExp(
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
    );
    // let regex2 = new RegExp(
    //   /^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/
    // );

    const scrapingProcess = async (webLink) => {
      setLoading(true);
      try {
        const scrapedData = await axios.post(
          "http://localhost:5000/text/text-scrap",
          { web: webLink }
        );
        console.log(scrapedData);
        if (scrapedData  && scrapedData.status === 200) {
          setLoading(false);
          if (scraps.find((obj) => obj._id === scrapedData.data._id)) {
            setScraps((prevState) => [
              scrapedData.data,
              ...prevState.filter((sc) => sc._id !== scrapedData.data._id),
            ]);
          } else {
            setScraps((prevState) => [scrapedData.data, ...prevState]);
          }
        }
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      }
    };

    if (!isWebUri(webLink)) {
      if (regex1.test(webLink)) {
        scrapingProcess(webLink);
      } 
      else {
        setError("Input a valid website link");
        return;
      }
    } else {
      scrapingProcess(webLink);
    }
  };

  // Load scraped data from background when page is loading..

  useEffect(() => {
    async function scraping() {
      const scrap = await axios.get(
        "http://localhost:5000/text/get-all-scraped-details"
      );
      if (scrap) {
        setScraps(scrap.data);
      }
      // }
    }
    scraping();
  }, []);

  // Handle Delete functionality for a scrap data

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(
        `http://localhost:5000/text/remove-one-scraped-data/${id}`
      );
      setScraps((prevState) => prevState.filter((sc) => sc._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFav = async (e, id) => {
    e.preventDefault();
    console.log(id);
    try {
      await axios.patch(`http://localhost:5000/text/add-to-favourite/${id}`);

      setScraps((prevState) =>
        prevState.map((sc) => (sc._id == id ? { ...sc, favourite: true } : sc))
      );
    } catch (error) {
      console.log(error);
    }
  };

  console.log(scraps);

  return (
    <section className="w-full min-h-screen  p-1 bg-[#dadada] flex max-w-screen">
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
          {error && <p className="text-red-700 font-medium text-lg">{error}</p>}
          {loading && !error && (
            <p className="text-green-700 font-medium text-lg">
              Scraping Datas from Entered Url...Please Wait.
            </p>
          )}
        </div>
        <button
          className="border border-black p-3 w-[30%] bg-slate-500 hover:scale-105 rounded-lg"
          onClick={handleClick}
        >
          Get Insights
        </button>
        {scraps.length > 0 && (
          <div className="w-full p-6">
            <h1 className="text-2xl font-semibold mb-10">Results</h1>
            <table className="w-full border border-black ">
              <tr className="border border-black w-full text-xl">
                <th className="border border-black w-[23%] text-start ">
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
                  <tr className="w-full align-top" key={sc._id}>
                    <td className="border border-black min-w-[23%] text-start pt-5 ">
                      <a
                        href={sc.webLink}
                        className="text-blue-600 w-[30px] truncate"
                        target={"_blank"}
                      >
                        {sc.webLink}
                      </a>
                    </td>
                    <td className="border border-black w-[10%] pt-5">
                      <p className="w-[30px]">{sc.textCount}</p>
                    </td>
                    <td className="border border-black w-[10%] pt-5">
                      <p className="w-[30px]">{sc.favourite.toString()}</p>
                    </td>
                    <td className="border border-black w-[10%] max-w-[23%] align-top">
                      {sc.links.map((link, index) => (
                        <div className="truncate max-w-[300px]">
                          <a
                            key={index}
                            href={link}
                            className="text-blue-600 w-[30px]"
                            target={"_blank"}
                          >
                            {link}
                          </a>
                          <br />
                        </div>
                      ))}
                    </td>
                    <td className="border border-black w-[23%]">
                      {sc.images.map((img, index) => (
                        <div className="truncate max-w-[300px]">
                          <a
                            key={index}
                            href={img}
                            className="text-blue-600 w-[30px]"
                            target={"_blank"}
                          >
                            {img}
                          </a>
                          <br />
                        </div>
                      ))}
                    </td>
                    <td className=" w-[100%] space-y-5 border border-black text-center pt-6">
                      <button
                        className="border p-3 border-black w-fit rounded-lg hover:scale-105 bg-slate-900 text-white"
                        onClick={(e) => {
                          handleDelete(e, sc._id);
                        }}
                      >
                        Remove
                      </button>
                      <button
                        className="border p-3 border-black w-fit rounded-lg hover:scale-105 bg-slate-900 text-white"
                        onClick={(e) => handleAddFav(e, sc._id)}
                      >
                        Add to Fav
                      </button>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
