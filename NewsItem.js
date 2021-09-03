import React from 'react'

const NewsItem =(props)=> {
    
        let { title, description, img, url, author, date, source } = props
        return (
            <div className='container my-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <div className="card" style={{ width: '18rem' }}>
                            <img src={!img ? 'NO Image Found' : img} className="card-img-top" alt=".." />
                            <div className="card-body">
                                <h5 className="card-title">{title}{title.length > 40 ? '...' : title}<span className='position-absolute top-0  translate-middle badge rounded-pill bg-danger' style={{left:'90%', zIndex:'1'}}>{source}</span></h5>
                                <p className="card-text">{description}..</p>
                                <p className="card-text"><small className="text-muted">By {!author ? 'Unknown' : author} at {new Date(date).toGMTString()} </small></p>
                                <a href={url} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
export default NewsItem
