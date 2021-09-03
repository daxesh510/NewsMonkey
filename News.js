import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// import App from './App';

const News = (props) => {


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [state, setState] = useState({
        
        loading: true,
        page: 1,
        pagesize: 7
    })

    const [articles, setArticles] = useState([])

    const [totalResults, setTotalResults] = useState(0)
    document.title = `${capitalizeFirstLetter(props.category)}-NewsMonkey`





        const updateNews = async () => {
            props.setProgress(10);
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=35d0e0cb72ef49fe853fe6f9a4bf9f86&page=1&pagesize=${state.pagesize}`;
            setState({ loading: true });
            let data = await fetch(url);
            props.setProgress(30);
            let response = await data.json();
            props.setProgress(70);
            console.log(response);
            setState({
                
                loading: false
            })
            setTotalResults(response.totalResults)
            setArticles(response.articles)
            props.setProgress(100);
        }
        
        useEffect(() => {
            updateNews();
        }, [])



       const  handleNext = async () => {
            // if (!(state.page + 1 > Math.ceil(state.totalResults / state.pagesize))) {
            //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=35d0e0cb72ef49fe853fe6f9a4bf9f86&page=${state.page + 1}&pagesize=${state.pagesize}`;
            //     setState({ loading: true });
            //     let data = await fetch(url);
            //     let response = await data.json();
            //     setState({
            //         page: state.page + 1,
            //         articles: response.articles,
            //         loading: false
            //     })
            // }
            setState({ page: state.page + 1 });
            updateNews();
        }

       const handlePrev = async () => {
            // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=35d0e0cb72ef49fe853fe6f9a4bf9f86&page=${state.page - 1}&pagesize=${state.pagesize}`;
            // setState({ loading: true });
            // let data = await fetch(url);
            // let response = await data.json();
            // console.log(response);
            // setState({
            //     page: state.page - 1,
            //     articles: response.articles,
            //     loading: false
            // })
            setState({ page: state.page - 1 });
            updateNews();
        }

    const fetchData = async () => {
        setState({ page: state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=35d0e0cb72ef49fe853fe6f9a4bf9f86&page=1&pagesize=${state.pagesize}`;
        let data = await fetch(url);
        let response = await data.json();
        console.log(response);
        setArticles(articles.concat(response.articles))
        setTotalResults(response.totalResults)

    }


    return (
        <>
            <h2 className='text-center'> News Monkey - Top {capitalizeFirstLetter(props.category)} News</h2>
            {state.loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length} //This is important field to render the next data
                next={fetchData}
                hasMore={articles.length !== articles.totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className='row'>

                        {!state.loading && articles.map((elm) => {
                            return <div className='col-md-4' key={elm.url}>
                                <NewsItem title={elm.title ? elm.title.slice(0, 42) : " "} description={elm.description ? elm.description.slice(0, 92) : " "} img={elm.urlToImage} url={elm.url} author={elm.author} date={elm.publishedAt} source={elm.source.name} />
                            </div>
                        })}

                        <div className="container  d-flex justify-content-between">
                            <button type="button" disabled={state.page <= 1} className="btn btn-dark"  onClick={handlePrev} > &larr; Previous</button>
                            <button type="button" disabled={state.page + 1 > Math.ceil(totalResults / state.pagesize)} onClick={handleNext}  className="btn btn-dark" >Next &rarr;</button>
                        </div>
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

export default News
