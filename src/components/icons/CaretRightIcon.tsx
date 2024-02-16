export default function CaretRightIcon({
    size = 30,
    color = "#2b3137",
}: {
    size?: number;
    color?: string;
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size.toString()}
            height={size.toString()}
            fill={color}
            className="bi bi-caret-left-fill"
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
            />
            <path
                fillRule="evenodd"
                d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
            />
        </svg>
    );
}
