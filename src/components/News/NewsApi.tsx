import React from 'react';
import btc1 from "../../images/news/btc1.jpg"
import btc2 from "../../images/news/btcImg.jpg"
import btc3 from "../../images/news/coij.webp"
import btc4 from "../../images/news/final.webp"
import btc5 from "../../images/news/letter.jpg"


const NewsApi = () => {
    const staticNews = [
        {
            title: "Title 1",
            snippet: "cryptocurrency",
            newsUrl: "https://example.com/article1",
            body: "Anglo-Chinese financiall imformation",
            timestamp: Date.now(),
            images: {
                thumbnail: btc1
            }
        },
        {
            title: "Title 2",
            snippet: "Golden Finace",
            body: "Cryptocurrency Advocates' Eight outlooks for 2024: payments, Nodes, Lighting Networks",
            newsUrl: "https://example.com/article2",
            timestamp: Date.now(),
            images: {
                thumbnail: btc2
            }
        },
        {
            title: "Title 2",
            snippet: "twitter",
            body: "SEC officially acknowledgments Pando Asset AG's spot #Bitcoin ETF application",
            newsUrl: "https://example.com/article2",
            timestamp: Date.now(),
            images: {
                thumbnail: btc3
            }
        },
        {
            title: "Title 2",
            snippet: "crypto",
            body: "Interactive Brokers taps OSL for retail crypto trading in Hong Kong",
            newsUrl: "https://example.com/article2",
            timestamp: Date.now(),
            images: {
                thumbnail: btc4
            }
        },
        {
            title: "Title 2",
            snippet: "crypto",
            body: "Bloomberg analysts estimate spot Bitcoin ETF market to hit $100b",
            newsUrl: "https://example.com/article2",
            timestamp: Date.now(),
            images: {
                thumbnail: btc5
            }
        },
        // Add more news objects as needed
    ];

    return (
        <div>
            <div className="container mx-auto p-8">
                <div className='flex flex-row justify-between'>
                    <h2 className='text-xl p-2 font-bold'>News</h2>
                    <h2 className='text-lg  p-2 font-bold text-[#2850E7] '>More</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 shadow-md p-3">
                {staticNews.map((article, index) => (
                    <div key={index} className="flex">
                        <div className="w-full">
                            <a href={article.newsUrl} target="_blank" rel="noopener noreferrer">
                                <div className="bg-white p-4 rounded-lg hover:shadow-lg dark:bg-[#24303F] dark:text-white">
                                    <p className="text-gray-600 mb-4 font-bold">{article.snippet}</p>
                                    <p className="text-gray-600 mb-4">{article.body}</p>
                                    <p className="text-sm text-gray-500">Published: {new Date(article.timestamp).toLocaleString()}</p>
                                </div>
                            </a>
                        </div>
                        <div className="">
                            {article.images && article.images.thumbnail && (
                                <img
                                    src={article.images.thumbnail}
                                    alt={article.title}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsApi;