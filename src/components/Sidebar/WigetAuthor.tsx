import FacebookIcon from "../icons/FacebookIcon";
import GitHubIcon from "../icons/GitHubIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import YouTubeIcon from "../icons/YouTubeIcon";

export default function WigetAuthor() {
    return (
        <aside className="single_sidebar_widget author_widget">
            <img
                className="author_img rounded-circle"
                src="/img/blog/Avatar.jpg"
                alt=""
            />
            <h4>Trần Lâm</h4>
            <p>Future Tech Professional</p>
            <div className="social_icon">
                <a
                    href="https://www.linkedin.com/in/tranledienlam/"
                    target="blank"
                >
                    <LinkedinIcon size={20}/>
                </a>
                <a href="https://github.com/tranledienlam" target="blank">
                    <GitHubIcon size={20}/>
                </a>
                <a href="https://www.facebook.com/tranledienlam" target="blank">
                    <FacebookIcon size={20}/>
                </a>
                <a
                    href="https://www.youtube.com/channel/UCK_WJZUMybvHeK-vcFYOx6w"
                    target="blank"
                >
                    <YouTubeIcon size={20}/>
                </a>
            </div>
            <p>
                Đây là dự án FE - BE đầu tiên, mình đang phát triển.
            </p>
            <div className="br"></div>
        </aside>
    );
}
