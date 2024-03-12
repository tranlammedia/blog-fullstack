import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostType } from "../../interfaces";
import { ApiPost } from "../../services/Api";
import { formatTimeAgo } from "../../helpers/convert";
import "./styles.css";

export default function WigetPopularPost() {
    const [popularPosts, setPopularPosts] = useState<PostType[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const fetchData = await ApiPost.getPostsForReader({
                    sortby: "views",
                    perpage: 5
                });
                setPopularPosts(fetchData.data);
            } catch (error) {}
        };
        fetch();
    }, []);
    return (
        <aside className="single_sidebar_widget popular_post_widget">
            <h3 className="widget_title">Popular Posts</h3>
            {popularPosts?.length > 0 &&
                popularPosts.map((post) => {
                    return (
                        <div key={post._id} className="media post_item">
                            <img
                                src={
                                    post.featureImageUrl ||
                                    "https://via.placeholder.com/100x60"
                                }
                                alt="post"
                                className="media-img"
                            />
                            <div className="media-body">
                                <Link to={"/blog/" + post._id}>
                                    <h3>{post.title} </h3>
                                </Link>
                                <p>{formatTimeAgo(post.createdAt)}</p>
                            </div>
                        </div>
                    );
                })}

            <div className="br"></div>
        </aside>
    );
}
