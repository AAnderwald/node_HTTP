let html =`<!Doctype html><html lang="en"></html>`
import http from "http";                                        // import the http module

// http.createServer ()                                         // using the http module, call the createServer


http.createServer ((request, response)  =>                      // Pass in a request handler callback function to the createServer method that receives request and response objects as parameters
{ 
    let {url, method} = request;                                // Write a conditional statement that assesses the request url, and responds appropriately: 
    
    let content = "404 Not Found";
    let status = 200;
    let contentType = "text/html";

    let chunks = [];

    request.on ("data", (chunk) => chunks.push(chunk));         // Store the chunks in an array         // Add an event listener to the request object that listens for the ‘data’ event to be emitted from the ReadStream
    
    request.on ("end", () =>                                    // Add an event listener to the request object that listens for the ‘end’ event to be emitted from the ReadStream
    {
         
        if (url == "/") {                                       // ‘/’ - Wildcard. Respond with whatever information you wish
            content = "<h2> Home Page <br /><br /> Firefly, one of the best TV shows ever </h2>";
            
        } else if (url == "/about") {                           // ‘/about’ - Respond with an object that has information about yourself
            let object = {
                name: "Anna",
                hobby: "Reading, baking, boxing",
            };
            content = JSON.stringify(object);
            contentType = "application/json";
        } else if (url == "/echo" && method == "POST") {                   // ‘/echo’ - Respond with an object that, a minimum, includes the request method, url and body
            let body = Json.parse (Buffer.concat(chunk).toString ());  // Set a new variable ‘body’ equal to Buffer.concat(array).toString())
            content = JSON.stringify(body);
            contentType = "application/json";
        } else {
            status = 404;                                       // not found or 404
        }
        
        response.writeHead(status, {"Content-Type": contentType});
        response.write(content);
        response.end();                                         // Make sure to end your response with .end()
    });       
})


.listen(3000, () => {                                           //Set your server to listen on port 3000
    console.log (" Server listening on port 3000 . .");
})

