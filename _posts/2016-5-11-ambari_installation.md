---
layout: default
title: Ambari

category: Installation
---

# Ambari Installation CentOS 6.7

Before configuring the server, the JDBC driver may need to be installed.

    $yum install mysql-connector-java*

## Set up the FQDN for all hosts
Ambari needs the Fully Qualified Domain Names of the hosts in the cluster in order to work.

Configure the /etc/hosts file and /etc/sysconfig/network files to configure the FQDN.

![](https://dl.dropboxusercontent.com/s/0u8gyxzoaar9iku/FQDN.PNG?dl=0)


![](https://dl.dropboxusercontent.com/s/wokcxhn1zaxd5dq/FQDN2.PNG?dl=0 )
![](https://dl.dropboxusercontent.com/s/5kk5mtrdgay40s4/FQDN3.PNG?dl=0)

**Adding the repository**

Navigate to the /etc/yum.repos.d/

    $cd /etc/yum.repos.d/
    $vi ambari.repo

Pass these lines into ambari.repo

    #VERSION_NUMBER=2.2.1.0-161

    [Updates-ambari-2.2.1.0]
    name=ambari-2.2.1.0 - Updates
    baseurl=http://public-repo-1.hortonworks.com/ambari/centos6/2.x/updates/2.2.1.0
    gpgcheck=1
    gpgkey=http://public-repo-1.hortonworks.com/ambari/centos6/RPM-GPG-KEY/RPM-GPG-KEY-Jenkins
    enabled=1
    priority=1

**Installing from the repository**

    $sudo yum update
    $sudo yum install ambari-server -y

![](https://dl.dropboxusercontent.com/s/k5s1ui8mosfecnd/Install%20from%20repo.PNG?dl=0)

**Set up Ambari-Server**

    $ambari-server setup
    Y(Customize ambari-server daemon)
    Enter(default user account used)
    2(JDK 1.7)

![](https://dl.dropboxusercontent.com/s/j0hexvz8fermsj7/Set%20up%20Ambari%20Server.PNG?dl=0)

    $sudo ambari-server start
![](https://dl.dropboxusercontent.com/s/peb2vhvrkajjl1c/Ambari%20Server%20Start.PNG?dl=0)

**Use the Install Wizard to install hadoop and services**
* In a web browser go to http://<Name of host>:8080
* Use username and password admin admin to access the console.
* In the upper left corner click the Ambari symbol. 
![](https://dl.dropboxusercontent.com/s/v68wpu3w97y2rbd/Ambari%20Install%20Wizard.PNG?dl=0)

Enter desired cluster name and hit next.
![](https://dl.dropboxusercontent.com/s/bvjue5e6jir259z/Name%20Your%20Cluster.PNG?dl=0)

Select the HDP 2.4 Stack and select next.
![](https://dl.dropboxusercontent.com/s/2kke15rg5kik8oz/Select%20Stack.PNG?dl=0)

Enter all of the hosts that you would like to add the the cluster
![](https://dl.dropboxusercontent.com/s/5kbkdnlz0dqugv1/Enter%20all%20hosts.PNG?dl=0)

Navigate to the /root/.ssh/id_rsa file and select the private rsa key.
![](https://www.dropbox.com/s/tokt8c2835uv531/rsa%20key.PNG?dl=0)

After Uploading the correct key enter the SSH Root account Account and click Register and Confirm.
![](https://dl.dropboxusercontent.com/s/5wvvnbz8i6og3oj/Host%20Registration.PNG?dl=0)

This is the screen that you want to get to. If you do not get to this screen read through the “/var/run/ambari-server/bootstrap/*/bootstrap.err” file to correct any errors.
![](https://www.dropbox.com/s/gf6swiaip22w0fy/Screen%20you%20want.PNG?dl=0)

After the installation, hosts will be checked for any additional errors.
Use the HostCleanup script to correct these errors and manually correct errors not fixed by the script.

    $python /usr/lib/python2.6/site-packages/ambari_agent/HostCleanup.py --silent
![](https://dl.dropboxusercontent.com/s/8hydynj5puhvrlj/Host%20Checks.PNG?dl=0)

In order to disable transparent huge page we will need to write a script.

    $vi /etc/init.d/disable-transparent-hugepages

Paste the contents into the file.
---------------------------------------------------------------------------------------------------------------------
    ### BEGIN INIT INFO
    # Provides:      	disable-transparent-hugepages
    # Required-Start:	$local_fs
    # Required-Stop:
    # X-Start-Before:	ambari-server ambari-agent
    # Default-Start: 	2 3 4 5
    # Default-Stop:  	0 1 6
    # Short-Description: Disable Linux transparent huge pages
    # Description:   	Disable Linux transparent huge pages, to improve
    #                	database performance.
    ### END INIT INFO
    case $1 in
       start)
       if [ -d /sys/kernmel/mm/transparent_hugepage ]; then
  	    thp_path=/sys/kernel/mm/transparent_hugepage
       elif [ -d /sys/kernel/mm/redhat_transparent_hugepage ]; then
  	    thp_path=/sys/kernel/mm/redhat_transparent_hugepage
       else
  	    return 0
       fi
       echo 'never' > ${thp_path}/enabled
       echo 'never' >${thp_path}/defrag
       unset thp_path
       ;;
    esac

Change the permissions

    $sudo chmod 755 /etc/init.d/disable-transparent-hugepages

Copy the file to all other host machines in the cluster.

    $scp /etc/init.d/disable-transparent-hugepages <OtherMachineName>:/etc/init.d/

##Run these commands on all the machines on the cluster.

Add the file to chkconfig to run the script before ambari-server starts

    $sudo chkconfig --add disable-transparent-hugepages

Start the Script

    $/etc/init.d/disable-transparent-hugepages start

Once you see this and all checks pass on the hosts you can click the next Icon. 
![](https://dl.dropboxusercontent.com/s/2vj5749h084i4zw/Host%20Checks%20Passed.PNG?dl=0)

Choose the services that you would like to install.
![](https://dl.dropboxusercontent.com/s/wastcq87idyogjr/Choose%20Services.PNG?dl=0)

Ambari will assign the roles of masters and managers by itself. Correct any issues with the roles.
![](https://dl.dropboxusercontent.com/s/jd31ghtir01evpf/Assign%20Masters.PNG?dl=0)

Select/deselect machines to assign slaves and clients.
![](https://dl.dropboxusercontent.com/s/x21wcxpsn8hrjxb/Assign%20Slaves.PNG?dl=0)
![](https://dl.dropboxusercontent.com/s/cz2miqe5mzehqve/Configurations%20Need%20Attention.PNG?dl=0)

Add this entry into the /etc/hosts file before continuing with the next step. 

    54.230.144.71    public-repo-1.hortonworks.com

Review your configurations before you click deploy.
![](https://dl.dropboxusercontent.com/s/cei7cpn8iiwoq7u/Review%20Config.PNG?dl=0)
![](https://dl.dropboxusercontent.com/s/hfx9i4gf83iliw4/Review%20Config2.PNG?dl=0)

Once the Installation is Done you will be brought to this page. 
Your installation is complete!
![](https://dl.dropboxusercontent.com/s/drsminmlr75sbbk/Installation%20Complete.PNG?dl=0)

#Starting the Services
![](https://www.dropbox.com/s/ysulpx1fpuxr9cj/Starting%20the%20Services.PNG?dl=0)
![](https://www.dropbox.com/s/uzll4fgwlw135qw/Actions%20Add%20Service.PNG?dl=0)

Under the Actions tab is the option to Start All or Stop all services.
You can manually start services by clicking the service and clicking on the services in the Summary section.
![](https://www.dropbox.com/s/p5e5das50ejpxuz/Manual%20Start.PNG?dl=0)

The dashboard will bring you to the first page that we came to after the installation. 
![](https://dl.dropboxusercontent.com/s/rrxlqlzn9jfygjr/Dashboard.PNG?dl=0)

**Monitoring Health of clusters**

The dashboard page will show the Metrics, Heatmaps, and Configuration History with the options to add and edit the information shown. From here we are able to see a general layout of the cluster. There is monitoring and information about the disk usage.
![](https://dl.dropboxusercontent.com/s/etir9a1b8skpygv/HeatMaps.PNG?dl=0)

Heatmaps show a heatmap of the Host and services and the usage of resources.
![](https://dl.dropboxusercontent.com/s/52p92tktnl2zzrv/Select%20Metric.PNG?dl=0)

The Config tab show information about datanode and namenodes. The Java heap size and number of threads can be edited from here.
![](https://www.dropbox.com/s/cz2miqe5mzehqve/Configurations%20Need%20Attention.PNG?dl=0)