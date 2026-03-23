export default function CarouselItem({children}) {
    return (
        <div className="relative aspect-video w-full overflow-hidden bg-amber-700">
            {children}
        </div>
    )
}
