---
layout: default
title: Sqoop
category: Services
type: SERVICES
---
# Using Sqoop

Sqoop is a tool to migrate data from structured datastores into the Haddop file system (HDFS). It works much like any other tool installed with Hadoop, and requires a command with arguments.

## Using Sqoop on Oracle 12c
An example command, run on our system looks like this:

    sqoop import --verbose --connect "jdbc:oracle:thin:hadoop/hadoop@//numbertwo:1521/orcl" --username hadoop -P --table TYLER.TWEETS

### Command Explained
The _--verbose_ option was for debugging purposes, to find the error messages as we tried to make it work with our database instance.

The _--connect_ command is for connecting to the database.

The part in the string is our database's connect string, what sqoop will use to connect to the database and migrate the data.

_--username_ and _-P_ are for giving sqoop access to the database as a user with the right permissions on the specific table that needs to be imported. _-P_ will make sqoop ask for the password in the command window as a prompt, this is more secure than entering the password into the command itself.

###Things to watch out for

The connect string is case sensitive, and will cause many java exceptions to be thrown if there are any mistakes.

The table that is being imported will have to be set up with a primary key, or the import will fail. This may be something that doesn't happen often,
but in the case of our system, importing a twitter data dump carelessly would cause Oracle 12c to import the data without a primary key. 

###The output of the command

Once the sqoop import has run successfully, a directory will be created in the Hadoop File System with the same name as the table that you used in your import.
Running the hadoop _fs -ls_ command without adding the _/_ to the command will show the location in HDFS that holds the imported folder. 
The folder will have files labeled parts-##### where the # symbol are numerical characters. These files are the data from the database system, but
broken up into chunks. In the case of our system, the data took on the form of comma separated values. 

Since the data we imported consisted of tweets, some tweets had commas in their message field, so this would have to be taken into account when running MapReduce jobs on
this data.

