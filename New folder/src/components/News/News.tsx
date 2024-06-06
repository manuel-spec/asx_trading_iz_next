import React from 'react'
import NewsApi from './NewsApi';

const News = () => {
    return (
        <div>
            <NewsApi length={30} />
        </div>
    )
}

export default News
