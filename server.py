import http.server
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as server:
    print("Server running on http://localhost:8000")
    server.serve_forever()
