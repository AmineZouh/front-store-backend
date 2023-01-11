1) to run the project you have to access from tour prowser the following URL : localhost:3000

2) to run the tests you have to run the following command : npm test

3) to connect to the database you should have two databases one for the developement phase called : full_stack_dev, and an other for the testing phase called : full_stack_test, in addition to that you should have a user called full_stack_user with the following password : root, and should have all the privileges on both databases.

4)the env variables used in this app are the following:

POSTGRES_HOST : this host
POSTGRES_DB : is the name of the database for dev envirenment
POSTGRES_TEST_DB : is the name of the database for test envirenment
POSTGRES_USER : is the user who have access to both databases (test/ dev)
POSTGRES_PASSWORD : is the password for the user POSTGRES_USER
ENV = dev is the environment develement 
SALT_ROUNDS : is used for the bcrypt library to hash he password
TOKEN_SECRET : this is the secret user to create jwt token