import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Button from "../button";
import { useContext } from "react";
import { SearchContext } from "../SearchContext";
import React from "react";

const Newsfetch = () => {
  let [newsDisplay, setNewsDisplay] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  const { searchTerm } = useContext(SearchContext);
  const itemsPerPage = 8;
  const API = "https://api.first.org/data/v1/news";

  async function fetchNews() {
    try {
      let response = await fetch(API);
      let data = await response.json();
      setNewsDisplay(data.data || []);
    } catch (error) {}
  }

  useEffect(() => {
    fetchNews();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = newsDisplay.slice(indexOfFirstItem, indexOfLastItem);

  function handleNextPage() {
    if (currentPage < Math.ceil(newsDisplay.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const paginatedNews = newsDisplay.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filteredNews = paginatedNews.filter((news) => {
    const newsData = `${news.title} ${news.published}`.toLowerCase();
    return newsData.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <hr />
      <section className={styles.newsContainer}>
        {paginatedNews.length === 0 ? (
          <p>Loading...</p>
        ) : (
          (searchTerm ? filteredNews : paginatedNews).map((news) => (
            <div key={news.id} className={styles.newsFetchBox}>
              <div className={styles.newsImage}>
                <img src={news?.image} alt="Images" />
              </div>
              <div className={styles.newsContentBox}>
                <h2>{news.title}</h2>
                <p>{news.published}</p>
                <Button
                  onClick={() => window.open(news.link, "_blank")}
                  text="Full Details"
                  btnstyles="secondary"
                />
              </div>
            </div>
          ))
        )}
      </section>
      <div className={styles.pagination}>
        <div className={`${currentPage === 1 ? styles.notActive : ""}`}>
          <Button
            onClick={handlePreviousPage}
            text="Previous"
            btnstyles="secondary"
            disabled={currentPage === 1}
          />
        </div>
        <p>Page: {currentPage}</p>
        <Button
          onClick={handleNextPage}
          text="Next"
          btnstyles="secondary"
          disabled={indexOfLastItem >= newsDisplay.length}
        />
      </div>
    </>
  );
};

export default Newsfetch;
