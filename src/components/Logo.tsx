export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Top rectangle - full width */}
            <rect
                x="4"
                y="6"
                width="24"
                height="8"
                rx="2"
                className="fill-white"
            />
            {/* Bottom rectangle - shorter */}
            <rect
                x="4"
                y="18"
                width="16"
                height="8"
                rx="2"
                className="fill-white"
            />
        </svg>
    );
}
