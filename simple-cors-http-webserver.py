#! /usr/bin/env python
from SimpleHTTPServer import SimpleHTTPRequestHandler
import BaseHTTPServer

class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers (self):

        print "request %s" % (self)

        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-Width')

        SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
    BaseHTTPServer.test(CORSRequestHandler, BaseHTTPServer.HTTPServer)
