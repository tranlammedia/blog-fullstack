import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ApiCategory } from "../../services/Api";

interface CountPost {
    _id: string;
    name: string;
    count: number;
}

export default function WigetCategory() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<CountPost[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const fetchData = await ApiCategory.getPostCountByCategory();
                setCategories(fetchData);
            } catch (error) {}
        };
        fetch();
    }, []);


    return (
        <>
            {categories?.length > 0 && (
                <aside className="single_sidebar_widget post_category_widget">
                    <h4 className="widget_title">Post Catgories</h4>
                    <ul className="list cat-list">
                        {categories.map((category) => {
                            return (
                                <li key={category._id}>
                                    <Link
                                        to={`/blog?category=${category.name}-${category._id}`}
                                        className="btn d-flex justify-content-between"
                                    >
                                        <p>{category.name}</p>
                                        <p>{category.count}</p>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="br"></div>
                </aside>
            )}
        </>
    );
}
