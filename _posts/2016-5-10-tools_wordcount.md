---
layout: default
title: Wordcount
category: Tools
---

WordCount is the Hello World of Hadoop.  The basic idea of distributed processing is highlighted in this exercise.

In a centralized system, data is gathered and processed at a central point.  A distributed system reduces processing time significantly by spreading the workload out to the data locations.

## MapReduce
What you should know about this processing paradigm is the distribution of processing, and the roles of the mapper and reducer.

In the Hadoop Distributed File System, data lives on different nodes in the cluster.  MapReduce takes advantage of the processing power held by each of the nodes by asking them to process the data before they return it to the reducer.  This allows the reducer to quickly aggregate the information.

### Example
Let's say that we own two convenience stores, and get daily transaction logs.  
    
Each record will have the date, store name, and total transactions, separated by tabs.  A few days worth of records could look like this

    5/14/2016   quik_e_mart   10000
    5/14/2016   one_stop  8500
    5/15/2016   quik_e_mart   15000
    5/15/2016   one_stop  7500
    5/16/2016   quik_e_mart   13500
    5/16/2016   one_stop  11000

At the end of the month, you would like to calculate the total sales for each.  

*Mapper*

The mapper will be used to filter, and sort the results, to return only the necessary information.  It will extract the store name and total, and return a sorted list, separated by tabs.
  
    one_stop 8500
    one_stop 7500
    one_stop 11000
    quik_e_mart 10000
    quik_e_mart 15000
    quik_e_mart 13500

Remember, that this mapping work is being done on each node, instead of sending everything to one machine to be processed. The processing power of multiple nodes are leveraged in filtering and sorting.  

A mapper implemented in Python for this purpose might look like this.

    import sys

    def mapper():
      for line in sys.stdin:
          data = line.strip().split("\t")
          if len(data) != 3:
              continue;

          date, store, sales = data

          print("{0}\t{1}".format(store, sales))

It reads every line, splits the record at the tabs, and removes any whitespace.  If there are not 3 items in the record, it is missing information, and will be skipped.  The info is then put into a list, and the store and sales are sent to output.

Items must be sorted after they are processed with the mapper.  The results are then sent to the reducer.  

*Reducer*

The reducer's job is a lot easier, thanks to the work being done by all of the data nodes.  Each node returns a list, so the reducer must be smart about how it tallies the results.  

It must only parse the lists, and keep track of which store is being processed.  When a new store is encountered, the sum for the old store can be returned.

    import sys

    def reducer():
        salesTotal = 0
        oldStore = None

        for line in sys.stdin:
            data = line.strip().split("\t")

            if len(data) != 2:
                continue

            thisStore, thisSale = data

            if oldStore and oldStore != thisStore:
                print("{0}\t{1}".format(oldStore, salesTotal))

                salesTotal = 0

            oldStore = thisStore
            salesTotal += float(thisSale)

When the information gets to the reducer, it has been trimmed to the relevant fields by the mapper, and then sorted.  

Like the mapper, the reducer reads every line, splits at tabs, and removes whitespace.  If there are not two items in the record, it is skipped.  It then sums the sales until it gets to a new store.  

The command to test the mapper and reducer locally is

    cat testFile | ./mapper.py | sort | ./reducer.py
    
This will use test data that is stored in testFile.  It will pipe it to the mapper, pipe it to sort, then pipe those results to the reducer.

More information on WordCount can be found in the Cloudera and Udacity sections under Learning Resources.
    
