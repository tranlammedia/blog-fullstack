export default function CategoryIcon({
    size = 16,
    color = "currentColor",
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
            className="bi bi-layers-fill"
            viewBox="0 0 16 16"
        >
            <path d="M7.765 1.559a.5.5 0 0 1 .47 0l7.5 4a.5.5 0 0 1 0 .882l-7.5 4a.5.5 0 0 1-.47 0l-7.5-4a.5.5 0 0 1 0-.882z" />
            <path d="m2.125 8.567-1.86.992a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882l-1.86-.992-5.17 2.756a1.5 1.5 0 0 1-1.41 0z" />
        </svg>
    );
}
