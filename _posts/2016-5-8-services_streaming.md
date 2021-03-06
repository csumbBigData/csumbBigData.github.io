---
layout: default
title: Streaming
category: Services
type: SERVICES
---

Hadoop Streaming allows MapReduce jobs to be run in any programming language.

Even though Java is the native language of Hadoop, we used Python for ease of use.  Python scripts are significantly shorter, and allow concepts to be explored, instead of spending a lot of time learning verbose Java commands.  

The full command to use Hadoop Streaming is very long as it requres the path to the hadoop-streaming jar in the hadoop install directory, the mapper and reducer, and required options for those files. An example of this is below for Python on our specific system.  The install path may be different based on the setup on system settings:

    yarn jar /usr/hdp/2.4.0.0-169/hadoop-mapreduce/hadoop-streaming-2.7.1.2.4.0.0-169.jar -mapper ./Mapper.py -reducer ./Reducer.py -file ./Mapper.py -file ./Reducer.py -input /mapRedInDir -output /mapRedOutDir
    
## Streaming options

The path on the -input option specifies the path to an input directory in the hadoop file system (HDFS) which has the data that you wish to run the MapReduce job on. The -output option specifies the output directory on the hadoop file system. The output directory must not exist when the command is run, because hadoop will create the output directory.

On our system we used the yarn command because our system has that tool installed. The _yarn_ command can be replaced with _hadoop_ if the Yarn service is not installed.

## Aliasing the command
We created an alias for this command, to make running jobs easier. This can be done by adding an alias to the .bashrc file of the user with write access to HDFS. 
   
       # User specific aliases and functions
     run_mapreduce(){
        yarn jar /usr/hdp/2.4.0.0-169/hadoop-mapreduce/hadoop-streaming-2.7.1.2.4.0.0-169.jar -mapper $1 -reducer $2 -file $1     -file $2 -input $3 -output $4
        }
     alias hs=run_mapreduce


The alias code makes it possible to run the previous command in the following format:

    hs ./Mapper.py ./Reducer.py /mapRedInDir /mapRedOutDir
    
While the Mapper and Reducer files were in python, this will work for any language code.
