import { Link } from "react-router-dom";

export default function WigetPopularPost () {
    return <aside className="single_sidebar_widget popular_post_widget">
    <h3 className="widget_title">Popular Posts</h3>
    <div className="media post_item">
        <img
            src="/img/blog/popular-post/post1.jpg"
            alt="post"
        />
        <div className="media-body">
            <Link to="detail">
                <h3>Space The Final Frontier</h3>
            </Link>
            <p>02 Hours ago</p>
        </div>
    </div>
    <div className="media post_item">
        <img
            src="/img/blog/popular-post/post2.jpg"
            alt="post"
        />
        <div className="media-body">
            <Link to="detail">
                <h3>The Amazing Hubble</h3>
            </Link>
            <p>02 Hours ago</p>
        </div>
    </div>
    <div className="media post_item">
        <img
            src="/img/blog/popular-post/post3.jpg"
            alt="post"
        />
        <div className="media-body">
            <Link to="detail">
                <h3>Astronomy Or Astrology</h3>
            </Link>
            <p>03 Hours ago</p>
        </div>
    </div>
    <div className="media post_item">
        <img
            src="/img/blog/popular-post/post4.jpg"
            alt="post"
        />
        <div className="media-body">
            <Link to="detail">
                <h3>Asteroids telescope</h3>
            </Link>
            <p>01 Hours ago</p>
        </div>
    </div>
    <div className="br"></div>
</aside>
}