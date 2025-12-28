export default function Logo({ className = "w-8 h-8", color = "text-accent" }: { className?: string; color?: string }) {
    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 8a2 2 0 012-2h16a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2V8zm0 10a2 2 0 012-2h10a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4z"
                className={color === "text-background" ? "fill-white" : "fill-accent"}
            />
            <rect
                x="22"
                y="16"
                width="4"
                height="8"
                rx="2"
                className={color === "text-background" ? "fill-white/50" : "fill-accent/50"}
            />
        </svg>
    );
}
