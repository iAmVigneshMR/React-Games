const NavBar = () => {
    return (
        <nav className="flex sm:justify-center space-x-4">
            {[
                ['Home', '/'],
                ['ChessOne', '/chessOne'],
                ['ChessTwo', '/chessTwo'],
                ['MemoryGame', '/memoryGame'],
            ].map(([title, url], i) => (
                <a key={i} href={url} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</a>
            ))}
        </nav>
    )
}

export default NavBar