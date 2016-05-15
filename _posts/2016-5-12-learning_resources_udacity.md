---
layout: default
title: Udacity
category: Learning Resources
type: LEARNING_RESOURCES
---

# Udacity Big Data Resources
<a href="https://www.udacity.com/course/intro-to-hadoop-and-mapreduce--ud617" target="none">Intro to Hadoop and MapReduce</a>

This course provides a great overview of the Hadoop ecosystem.  Big data definitions and problems are covered, as well as commands for running jobs, and creating mappers/reducers in Python.  

A virtual machine can be downloaded that simulates the Hadoop environment, and allows the user to run MapReduce jobs, without having an actual cluster in place.

<a href="https://en.wikipedia.org/wiki/Big_data" target="none">Big Data Wiki</a>


### Commands/Notes

Udacity provides a <a href="https://docs.google.com/document/d/1v0zGBZ6EHap-Smsr3x3sGGpDW-54m82kDpPKC2M6uiY/edit#heading=h.yw4dhei2pxlg" target="none">Google Doc</a> where you can download a virtual machine, alternate data sets, and instructions for the virtual machine setup.  Make sure you pay attention to the settings for the memory size on the virtual machine.  

It's a good idea to set your virtual machine up so you can SSH into it, through your computer.  That way, you can easily transfer files back and forth.  Instructions on that are <a href="https://docs.google.com/document/d/1MZ_rNxJhR4HCU1qJ2-w7xlk2MTHVqa9lnl_uj-zRkzk/pub" target="none">here</a>.

This is one of the 
**Testing mapper or reducer locally:**

It is a good idea to take a small sample of the data and test mapper/reducer.
Take first 50 lines of test file and send to testfile.txt

    head -50 ../data/purchases.txt > testfile

Next, pipe testfile.txt to mapper.  This will print mapper output to stdout.

    cat testfile | ./mapper.py

If that works correctly, try the mapper and reducer.  We will also sort between map and reduce.

    cat testfile | ./mapper.py | sort | ./reducer.py

After completing the local test, run the job on the cluster/virtual machine.

FORMAT: hs mapper reducer inputDirectory newOutputDirectory

    hadoop mapper.py reducer.py myinput output