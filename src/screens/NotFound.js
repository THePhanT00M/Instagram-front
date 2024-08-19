function NotFound() {
    return (
        <div>
            <div>Sorry, this page isn't available.</div>
            <div>
                <span>The link you followed may be broken, or the page may have been removed.</span>
                <button onClick={() => window.location.href = "/"} style={{ color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                    Go back to Instagram.
                </button>
            </div>
        </div>
    );
}

export default NotFound;
