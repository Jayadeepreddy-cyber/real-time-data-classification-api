# Real-time data classification API
Build a data classification API using WebSockets where signup and login endpoints are created and authenticated, mongo DB is used for data storage.
Signup endpoints take user details- username, email, and password and return a token used to log in.
User details are then stored in the database.
The login endpoint takes the expression as input with a valid token as header and returns the expression's result.
## How to run
node server.js
## Unit Testing
## Expression                                                                                                                                                  
### " minimum of maximum of count of a and count of b and maximum of count of c and count of d is greaterthan 4 in sdhbanhsd"                                   -- Passed
### " sum of maximum of count of reddy and count of z and sum of count of 123 and count of jayadeep is lessthanequalto 1 in jayadeep reddy 123jhsdaad signzy"   --  Passed
### " count of signzy is equalto 2 in signzy jayadeep reddy project"                                                                                            --  Passed
### " minimum of count of 1 and count of a and count of name is not equalto 2 in 1 wewegjhbaa kejr name"                                                        --  Passed      ### " sum of count of apple and count of 2 is greaterthanequalto 3 in an apple a day keeps the doctor away                                                      -- Passed
### " count of a in wejbbmsbama"                                                                                         -- The parser could not parse the string due to invalid format

## Load tests using k6
![Screenshot 2024-06-24 121533](https://github.com/Jayadeepreddy-cyber/real-time-data-classification-api/assets/61975079/29fe3bd8-7757-4025-a767-856c32bb5749)
