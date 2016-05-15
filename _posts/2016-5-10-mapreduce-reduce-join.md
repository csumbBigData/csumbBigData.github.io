---
layout: default
title: Reduce Join Java
category: MapReduce
type: MAPREDUCE
---

*Naval Postgraduate School Lab Excerpt*

*from **Oracle Loader for Hadoop with Cloudera HDFS/Oracle12C Part 1***

Prepared by: *Arijit Das, Greg Belli, Erik Lowney, Jim Zhou, Nick Bitto*

`import *; 
public class ReduceJoin 
{ 
    public static class SalesRecordMapper extends 
        Mapper<Object, Text, Text, Text>{} 
    public static class AccountRecordMapper extends 
        Mapper<Object, Text, Text, Text>{} 
    public static class ReduceJoinReducer extends 
        Reducer<Text, Text, Text, Text> {} 
    public static void main(String[] args) throws Exception {} 
}`

#### Accounts

|-----|||||--------------:| 
| 001 ||||| John Allen    |
| 002 ||||| Abigail Smith |
| 003 ||||| April Stevens |
| 004 ||||| Nasser Hafez  |

<br>

#### Sales

|-----|||||------:| 
| 001 ||||| 35.99 |
| 002 ||||| 12.49 |
| 004 ||||| 13.42 |
| 003 ||||| 499.99|
| 001 ||||| 78.95 |
| 002 ||||| 21.99 |
| 002 ||||| 93.45 |
| 001 ||||| 9.99  |

<br>
`public static void main(String[] args) throws Exception 
{ 
    Configuration conf = new Configuration(); 
    Job job = new Job(conf, "Reduce-side join"); 
    job.setJarByClass(ReduceJoin.class); 
    job.setReducerClass(ReduceJoinReducer.class); 
    job.setOutputKeyClass(Text.class); 
    job.setOutputValueClass(Text.class); 
    MultipleInputs.addInputPath(job, new Path(args[0]), 
        TextInputFormat.class, SalesRecordMapper.class); 
    MultipleInputs.addInputPath(job, new Path(args[1]), 
        TextInputFormat.class, AccountRecordMapper.class);
    Path outputPath = new Path(args[2]); 
    FileOutputFormat.setOutputPath(job, outputPath); 
    outputPath.getFileSystem(conf).delete(outputPath); 
    System.exit(job.waitForCompletion(true) ? 0 : 1); 
}`

The main function is similar to the WordCount program.

`Configuration conf = new Configuration(); 
Job job = new Job(conf, "Reduce-side join"); 
job.setJarByClass(ReduceJoin.class); 
job.setReducerClass(ReduceJoinReducer.class); 
job.setOutputKeyClass(Text.class); 
job.setOutputValueClass(Text.class);`

Differences: 

 - Multiple file inputs
 - Separate mapper class for each input file
 - Program deletes any previously created file in the output path
 
<!-- endList -->

`MultipleInputs.addInputPath(job, new Path(args[0]), 
    TextInputFormat.class, SalesRecordMapper.class); 
MultipleInputs.addInputPath(job, new Path(args[1]), 
    TextInputFormat.class, AccountRecordMapper.class);`
    
#### Sales Record Mapper

`public static class SalesRecordMapper 
    extends Mapper<Object, Text, Text, Text>
{ 
    public void map(Object key, Text value, 
        Context context ) throws IOException, 
        InterruptedException 
    { 
        String record = value.toString(); 
        String[] parts = record.split("\t"); 
        context.write(new Text(parts[0]), new 
            Text("sales\t"+parts[1])); 
    } 
}`

The Sales Record Mapper takes each line from the Sales file, casts it as a String, then uses the split function to separate the line into a String array based on where the tabs are in the line.

`String record = value.toString(); 
String[] parts = record.split("\t");`

The Sales Record Mapper then outputs the data. The Key is  Text datatype containing the account number. The Value is a Text datatype containing the word “sales” concatenated with the price.

`context.write(new Text(parts[0]), new 
    Text("sales\t"+parts[1])); `
    
An example output from the Sales Record mapper is: [001, sales\t35.99]. 

There is a tab character between sales and 35.99. Keep the concatenation in mind as it will be important in the Reduce phase.

#### Account Record Mapper

`ublic static class AccountRecordMapper 
    extends Mapper<Object, Text, Text, Text>
{ 
    public void map(Object key, Text value,  
        Context context ) throws IOException, 
        InterruptedException 
    { 
        String record = value.toString(); 
        String[] parts = record.split("\t"); 
        context.write(new Text(parts[0]), new 
            Text("accounts\t"+parts[1])); 
    } 
}`

The Account Record Mapper takes each line from the Accounts file, casts it as a String, then uses the split function to separate the line into a String array based on where the tabs are in the line. Names in the file are separated by a space and so will be considered one element.

`String record = value.toString(); 
String[] parts = record.split("\t");`

The Account Record Mapper then outputs the data. The Key is  Text datatype containing the account number. The Value is a Text datatype containing the word “accounts” concatenated with the person’s name.

`context.write(new Text(parts[0]), new 
    Text("accounts\t"+parts[1]));`
            
An important point to note is that both the SalesRecordMapper and the AccountRecordMapper output the same field as the key. This is what will facilitate the join. Also note the concatenation in the AccountRecordMapper. It is similar to the SalesRecordMapper.

#### ReduceJoin Reducer

`public void reduce(Text key, Iterable<Text> values, 
    Context context ) throws IOException, 
    InterruptedException 
{ 
    String name = ""; 
    double total = 0.0; 
    int count = 0; 
    for(Text t: values) 
    { 
        String parts[] = t.toString().split("\t"); 
        if (parts[0].equals("sales")) 
        { 
            count++; 
            total+= Float.parseFloat(parts[1]); 
        } else if (parts[0].equals("accounts")) 
        { 
            name = parts[1]; 
        } 
    } 
    String str = String.format("%d\t%f", count, total); 
    context.write(new Text(name), new Text(str)); 
}`

Data sent to an individual datanode during the Reduce phase is partitioned based on the key field. Since the Sales data and the Accounts data both use a userID as the key field, each datanode will contain all data pertaining to a single salesperson. In the reduce phase we want to process and output data about each salesperson.

`String name = ""; 
double total = 0.0; 
int count = 0;`

 Three variables are created. These will store the salesperson’s data. The name field will contain the salesperson’s name. Total will contain the total cost of the items sold. Count will contain the total number of sales by that salesperson.

Loop through every value for the key assigned to the datanode. In the ReduceJoin program, the values will be in one of two forms:

`for(Text t: values)`

The value is cast to a string and then split based on the tab character. Doing this allows the reducer to process the value differently depending on if we concatenated ‘sales’ or ‘accounts’ to the value during the Map phase.

`String parts[] = t.toString().split("\t"); 
if (parts[0].equals("sales"))`

Values concatenated with ‘sales’ contain the sales data for the salesperson. Each value processed indicates a sale, so the program will increment the count variable and add the sale amount to the running total.

`count++; 
total+= Float.parseFloat(parts[1]);`

Values concatenated with ‘accounts’ contain the salesperson’s name. Their name is assigned to the name variable.

`name = parts[1];`

The sales data is formatted and output using the Context class. The format is a key-value pair.

`String str = String.format("%d\t%f", count, total); 
context.write(new Text(name), new Text(str));` 