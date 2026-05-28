export function VideoEmbed({ url, title }: { url: string; title: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-lg border border-[var(--border)]" style={{ paddingTop: "56.25%" }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={url}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}