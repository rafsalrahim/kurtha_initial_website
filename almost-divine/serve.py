#!/usr/bin/env python3
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os

ROOT = Path(__file__).resolve().parent / "dist"
PORT = int(os.environ.get("PORT", "8081"))


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        super().end_headers()

    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path == "/":
            return super().do_GET()
        rel = (ROOT / path.lstrip("/")).resolve()
        try:
            rel.relative_to(ROOT)
        except ValueError:
            self.send_error(403)
            return
        if rel.is_file():
            return super().do_GET()
        self.path = "/index.html"
        return super().do_GET()


if __name__ == "__main__":
    httpd = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print(f"almost-divine-v2 serving {ROOT} on 0.0.0.0:{PORT}", flush=True)
    httpd.serve_forever()
