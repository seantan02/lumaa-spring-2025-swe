** Minimal AI involved. Feel free to run your README.md on Claude or ChatGPT and find that I don't use things like direct SQL query because ORM is industrial standard for security priority while the trade off is performance (which is what vanilla SQL queries pros is but do we want a broken fast system?) **

## Note
1. For different database than PostgreSQL, please refer to docs here to install required library: https://typeorm.io


## Future improvements:
1. Error Handling Middleware: A centralized error handler that provides consistent error responses and better error logging
2. Pagination: Optimize the task listing for GET route especially to prevent performance issue when database is large
3. Add CORS middleware: To allow only selected sites to communicate with our system for extra security 
4. SSL connection: Create a env variable allowing separation between dev and production mode that on production mode it should require SSL and other security in place
- More improvements:
    a. Implement logging (at least one logger)
    b. Add API documentation
    c. Implement rate limiting
    d. Add refresh tokens
    e. Add security headers
    f. Implement request sanitization
    g. Create service layer
    h. Add request/response DTOs
    i. Implement proper error handling middleware