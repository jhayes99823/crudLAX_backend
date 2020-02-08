# crudLAX_backend

To Run:
<b>node index.js</b>

## Overview of REST API
### Think of it as a circle

Steps in no particular order:
1) Frontend Fetch Call
2) DB Request
3) Backend Response
4) Frontend instructions upon receiveal of Response


It doesn't matter where you start thinking about it but I start on the frontend call
in a fetch statement. (you can go to frontend README or code for example) 
The frontend call you should have everything you need to make the call on the backend.

Once you have the body or query params you will put them in an endpoint.
The type depends on what you are trying to do. There's some information below to help you figure that out.

Once you have made the db connection and call, you MUST send a <b>'res.end'</b> statement back so that you don't 
cause a 'hang'. Even if you have an error coming from the db call you made, send that back. That is used to display
information on the frontend or do whatever you want with it.

# Types of Endpoints
<b> There is an example of all endpoints in the code </b>

## GET
### Similar to the WHERE clause in a SQL statement
Use res.query <br>
Will be something akin to 'localhost:5000/api/user?username=rrogers' <br>
The above statement is what you want to create on the frontend call


## POST
### Similar to INSERT/UPDATE command in SQL statement
Use res.body
The body is kind of a hidden call and isn't visible to user as is by the query params

## DELETE
### Similar to DELETE command in SQL statement
Use res.query <br>
See GET statement above for more info
