export default function CaretLeftIcon({
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
                d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
            <path
                fillRule="evenodd"
                d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
        </svg>
    );
}
