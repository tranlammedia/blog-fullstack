import { Link } from "react-router-dom";
import WigetPopularPost from "./WigetPopularPost";
import WigetSearch from "./WigetSearch";
import WigetAuthor from "./WigetAuthor";
import WigetAds from "./WigetAds";
import WigetCategory from "./WigetCategory";
import WigetNewsletter from "./WigetNewsletter";
import WigetTags from "./WigetTags";

export default function Sidebar() {
    return (
        <div className="blog_right_sidebar">
            <WigetSearch />
            <WigetAuthor />
            <WigetPopularPost />
            <WigetAds />
            <WigetCategory />
            <WigetNewsletter />
            <WigetTags />
        </div>
    );
}
