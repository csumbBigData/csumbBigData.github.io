---
layout: default
title: Cloudera
category: Learning Resources
type: LEARNING_RESOURCES
---   

Cloudera has a downloadable image that is a great way to learn your way around Hadoop, without actually having access to a cluster.  The documentation is not very good at walking you through the whole process of setting up the VM, and getting to a point where you actually start using the VM to run jobs.  Hopefully, this will help.

Head over to <a href="http://www.cloudera.com/downloads/quickstart_vms/5-7.html" target="blank">QuickStart Downloads for CDH 5.7</a> and go to the *Select A Platform* dropdown to select a version that is compatible with VMWare Workstion 12, or VirtualBox.  I can't say why, but I used VMware for this image, and VirtualBox for the Udacity image.  Udacity has a great course that provides its own image.  You can check it out under the Udacity tab in Learning Resources.  

The image is a free download, but you must create an account.  The file is about 5 GB when unpacked.

You will need virtualization software to create the virtual machines.  

 - <a href="https://my.vmware.com/en/web/vmware/free#desktop_end_user_computing/vmware_workstation_player/12_0" target="blank">VMware Workstation 12</a>
 - <a href="http://www.oracle.com/technetwork/server-storage/virtualbox/downloads/index.html#vbox" target="blank">Oracle VirtualBox</a>

To open the image with VMware Workstation

Browse for a Virtual Machine

 1. Open VMware Player
 2. Select File > Open
 3. In the file selection window, find and select the virtual machine package or configuration file for the virtual machine to open. Virtual machine package files have the extension .vmwarevm. Virtual machine configuration files have the extension .vmx.
 4. Click the Open button.
 5. Before you select *Play Virtual Machine*, go to the bottom and click Edit virtual machine settings.
 Select the proper amount of RAM for your image
 - CDH 5 (default) version requires 4 GB RAM
 - Cloudera Express version requires 8 GB RAM
 6. Play Virtual Machine
 
To open with VirtualBox

 1. Open VirtualBox
 2. Select New
 3. Create a name for your VM
 4. Select OS (I used Linux Unbuntu 64 bit, since it's what Hadoop needs to be installed on)
 5. Select the memory size.  4 is required.  More is better, if you can afford it.
 6. Select *Use an existing virtual hard disk file*, and click Create.
 7. Select your new VM, and press Start.
 
Once you launch the VM, you are automatically logged in as the cloudera user. The account details are:

 - username: cloudera
 - password: cloudera

The cloudera account has sudo privileges in the VM. The root account password is cloudera.

The root MySQL password (and the password for other MySQL user accounts) is also cloudera.

Hue and Cloudera Manager use the same credentials.

When the VM starts, the browser will open automatically. Cloudera Manager is installed in the VM, but it is turned off by default.  It allows you to see what services are running on your machine, as well as start and stop services.  Enable it by clicking on the Cloudera Manager desktop icon.

After you enable Cloudera Manager, head back to the browser window.  Here, you can start walking through the <a href="http://www.cloudera.com/developers/get-started-with-hadoop-tutorial/setup.html" target="blank">Getting Started with Hadoop Tutorial</a>.  It starts by showing you how to make sure all of your services are running, and reset them, if necessary.  Then you pull some data into the Hadoop Distributed File System (HDFS) using Sqoop.  After you pull the data, Impala is used to run queries.  You can follow the tutorial for the rest.

Cloudera also has instructions for running 3 different versions of WordCount.  This is the "Hello World" of Hadoop.  You can run this program on the Cloudera Quickstart VM, or on your real cluster.  

They have a detailed walkthrough of the program before they give you the commands to run WordCount.  The Java version is a lot wordier than the Python version.  You can check it out, under WordCount Python, in the MapReduce tab.  

The <a href=" http://tiny.cloudera.com/hadoopTutorialSample" target="none">sample files</a> contain 3 versions of WordCount, as well as input files that have words to count.  

 - <a href="http://www.cloudera.com/documentation/other/tutorial/CDH5/Hadoop-Tutorial/ht_wordcount1.html" target="none">WordCount v1.0</a>. returns a count of all words, where the input contains only letters.  
 - <a href="http://www.cloudera.com/documentation/other/tutorial/CDH5/Hadoop-Tutorial/ht_wordcount2.html" target="none">WordCount v2.0</a> considers input files with commas, and !  
 - <a href="http://www.cloudera.com/documentation/other/tutorial/CDH5/Hadoop-Tutorial/ht_wordcount3.html" target="none">WordCount v3.0</a> shows you how to filter out stop words and punctuation.  

You can build the input text files, or use the ones from the sample.  The .java file is in the download files, as well as a pre-built jar file.  You must use the jar file to run WordCount.




