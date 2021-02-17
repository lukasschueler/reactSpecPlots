import sys
sys.path.insert(1, '/home/lukas/hiwi/project/reactplots/back')
from http.server import BaseHTTPRequestHandler, HTTPServer, SimpleHTTPRequestHandler
import socketserver
import pickle
import json
import cgi
import time
import os
from tools import Tools


class Server(SimpleHTTPRequestHandler):
    
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
    def do_HEAD(self):
        self._set_headers()
        
    def do_GET(self):

            
        if self.path == "/extract":
            
            self._set_headers()

            print("---------------DATABASEENTRY REQUESTED------------->")
            self._set_headers()
            with open('database.txt', 'r') as base:
                content = json.load(base)
            
            output = json.dumps(content)
            self.wfile.write(output.encode())
            
        elif self.path == "/getData":
            print("Somebody accessing data")
            
            self._set_headers()

            path = "short.txt"
            if os.path.isfile(path):
                with open(path, 'r') as base:
                    print("-------------READINGFROMFILE------------>")
                    content = base.read()
                    data = Tools.processTXT(self,content)
                    
                    output = json.dumps(data)
                    self.wfile.write(output.encode())
                          
        else:
            super().do_GET()
            

    # POST echoes the message adding a JSON field
    def do_POST(self):
        
        ctype, pdict = cgi.parse_header(self.headers['Content-type'])

        
        if ctype != 'application/json':
            self.send_response(400)
            self.end_headers()
            return
            
        # read the message and convert it into a python dictionary
        length = int(self.headers['Content-length'])
        message = json.loads(self.rfile.read(length))

        
        # add a property to the object, just to mess with data
        if self.path == "/saveData":
            path = "database.txt"
            if os.path.isfile(path):
                with open('database.txt', 'r') as base:
                    print("-------------READINGFROMDATABASE------------>")
                    store = json.load(base)
                    store.append(message)
                    
                with open("database.txt", "w") as base:
                    print("-----------SAVINGDATABASE------------->")
                    json.dump(store,base)
                
            else:
                store = []
                store.append(message)
                with open (path, "w") as base:
                    print("-----------BUIDLINGDATABASE--------------->")
                    json.dump(store, base)
                    print("-----------SAVINGTODATABASE------------->")
                    
                    
            
                    
        elif self.path == "/uploadData":
            self._set_headers()
            

            unpack = message["content"]
            result =  Tools.processTXT(self,unpack)
            package = result

            output = json.dumps(package)
            self.wfile.write(output.encode())
            
        elif self.path =="/smoothData":
            self._set_headers()
            
            data = message["data"]
            windowSize = int(message["windowSize"])
            degree = int(message["degree"])
            
            smoothedData = Tools.cleanData(self, data, windowSize, degree)
            output = json.dumps(smoothedData)
            self.wfile.write(output.encode())
            
        
        elif self.path == "/normalizeData":
            self._set_headers()
            
            data = message["data"]
            
            normalizedData = Tools.normalize(self, data)
            output = json.dumps(normalizedData)
            self.wfile.write(output.encode())


            
        elif self.path == "/nullrefData":
            self._set_headers()
            
            data = message["data"]
            reference = message["nullReference"]

            
            
            normalizedData = Tools.normalize(self,reference)
            output = json.dumps(normalizedData)
            self.wfile.write(output.encode())
            
        elif self.path == "/markMaxima":
            self._set_headers()
            
            data = message["data"]
            
            maxima = Tools.getMaxima(self, data)
            output = json.dumps(maxima)
            self.wfile.write(output.encode())

            



            


     
                
            
def run(server_class=HTTPServer, handler_class=Server, port=8008):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    
    try:
        print (time.asctime(), "Server Starts - %s:%s" % (server_address, port))
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
        httpd.server_close()    
    print()
    print (time.asctime(), "Server Stops - %s:%s" % (server_address, port))
    
    
    
if __name__ == "__main__":
    from sys import argv
    
    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()
        
        
        
        
        
