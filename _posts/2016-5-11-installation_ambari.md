---
layout: default
title: Ambari
category: Installation
type: 'INSTALLATION'
---


# Ambari Installation CentOS 6.7

Before configuring the server, the JDBC driver may need to be installed.

    $yum install mysql-connector-java*

## Set up the FQDN for all hosts
Ambari needs the Fully Qualified Domain Names of the hosts in the cluster in order to work.

Configure the /etc/hosts file and /etc/sysconfig/network files to configure the FQDN.


<img src="{{site.baseurl}}/img/fqdn.PNG">


<img src="{{site.baseurl}}/img/fqdn2.PNG">
<img src="{{site.baseurl}}/img/fqdn3.PNG">

**Adding the repository**

Navigate to the /etc/yum.repos.d/

`$cd /etc/yum.repos.d/
$vi ambari.repo
`

Pass these lines into ambari.repo

`#VERSION_NUMBER=2.2.1.0-161
[Updates-ambari-2.2.1.0]
name=ambari-2.2.1.0 - Updates
baseurl=http://public-repo-1.hortonworks.com/ambari/centos6/2.x/updates/2.2.1.0
gpgcheck=1
gpgkey=http://public-repo-1.hortonworks.com/ambari/centos6/RPM-GPG-KEY/RPM-GPG-KEY-Jenkins
enabled=1
priority=1
`

**Installing from the repository**

`$sudo yum update
$sudo yum install ambari-server -y
`

<img src="{{site.baseurl}}/img/install_from_repo.PNG">

**Set up Ambari-Server**

`$ambari-server setup
Y(Customize ambari-server daemon)
Enter(default user account used)
2(JDK 1.7)
`

<img src="{{site.baseurl}}/img/set_up_ambari_server.PNG">


`$sudo ambari-server start`
    
<img src="{{site.baseurl}}/img/ambari_server_start.PNG">

**Use the Install Wizard to install hadoop and services**

 * In a web browser go to http://<Name of host>:8080
 * Use username and password admin admin to access the console.
 * In the upper left corner click the Ambari symbol. 

<img src="{{site.baseurl}}/img/ambari_install_wizard.PNG">

Enter desired cluster name and hit next.
<img src="{{site.baseurl}}/img/name_your_package.PNG">

Select the HDP 2.4 Stack and select next.
<img src="{{site.baseurl}}/img/select_stack.PNG">

Enter all of the hosts that you would like to add the the cluster
<img src="{{site.baseurl}}/img/enter_all_hosts.PNG">

Navigate to the /root/.ssh/id_rsa file and select the private rsa key.
<img src="{{site.baseurl}}/img/rsa_key.PNG">

After Uploading the correct key enter the SSH Root account Account and click Register and Confirm.
<img src="{{site.baseurl}}/img/host_registration.PNG">

This is the screen that you want to get to. If you do not get to this screen read through the “/var/run/ambari-server/bootstrap/*/bootstrap.err” file to correct any errors.
<img src="{{site.baseurl}}/img/screen_you_want.PNG">

After the installation, hosts will be checked for any additional errors.
Use the HostCleanup script to correct these errors and manually correct errors not fixed by the script.

`$python /usr/lib/python2.6/site-packages/ambari_agent/HostCleanup.py --silent`
    
<img src="{{site.baseurl}}/img/host_checks.PNG">

In order to disable transparent huge page we will need to write a script.

`$vi /etc/init.d/disable-transparent-hugepages`

```Paste the contents into the file.
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
```

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
<img src="{{site.baseurl}}/img/host_checks_passed.PNG">

Choose the services that you would like to install.
<img src="{{site.baseurl}}/img/choose_service.PNG">

Ambari will assign the roles of masters and managers by itself. Correct any issues with the roles.
<img src="{{site.baseurl}}/img/assign_masters.PNG">

Select/deselect machines to assign slaves and clients.
<img src="{{site.baseurl}}/img/assign_slaves.PNG">
<img src="{{site.baseurl}}/img/configurations_need_attention">

Add this entry into the /etc/hosts file before continuing with the next step. 

    54.230.144.71    public-repo-1.hortonworks.com

Review your configurations before you click deploy.
<img src="{{site.baseurl}}/img/review_config.PNG">

Once the Installation is Done you will be brought to this page. 
Your installation is complete!
<img src="{{site.baseurl}}/img/installation_complete.PNG">

**Starting the Services**

<img src="{{site.baseurl}}/img/starting_the_services.PNG">

<img src="{{site.baseurl}}/img/actions_add_service.PNG">

Under the Actions tab is the option to Start All or Stop all services.
You can manually start services by clicking the service and clicking on the services in the Summary section.
<img src="{{site.baseurl}}/img/manual_start.PNG">

The dashboard will bring you to the first page that we came to after the installation. 
<img src="{{site.baseurl}}/img/dashboard.PNG">

**Monitoring Health of clusters**

The dashboard page will show the Metrics, Heatmaps, and Configuration History with the options to add and edit the information shown. From here we are able to see a general layout of the cluster. There is monitoring and information about the disk usage.
<img src="{{site.baseurl}}/img/heatmaps.PNG">

Heatmaps show a heatmap of the Host and services and the usage of resources.
<img src="{{site.baseurl}}/img/select_metric.PNG">

The Config tab show information about datanode and namenodes. The Java heap size and number of threads can be edited from here.
<img src="{{site.baseurl}}/img/configurations_need_attention.PNG">