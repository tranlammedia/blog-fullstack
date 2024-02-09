interface BannerProps {
    title: string;
}
export default function Banner({ title }: BannerProps) {
    return (
        <>
            <section className="banner_area">
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content text-center">
                            <h2>{title}</h2>
                            <div className="page_link">
                                <a href="index.html">Home</a>
                                <a href="about.html">About</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
