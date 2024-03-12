import { useEffect, useState } from "react";
import { TagType } from "../../interfaces";
import { ApiTag } from "../../services/Api";
import { Link } from "react-router-dom";

export default function WigetTags() {
    const [tags, setTags] = useState<TagType[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const fetchData = await ApiTag.getPostCountByTag();
            setTags(fetchData);
        };
        fetch();
    }, []);
    return (
        <aside className="single-sidebar-widget tag_cloud_widget">
            <h4 className="widget_title">Tag Clouds</h4>
            <ul className="list">
                {tags?.length > 0 && 
                    tags.map((tag) => { 
                        return (
                            <li key={tag._id}>
                                <Link
                                    to={`/blog?tag=${tag.name}-${tag._id}`}
                                >
                                    {tag.name}
                                </Link>
                            </li>
                        );
                    })}
             
            </ul>
        </aside>
    );
}
