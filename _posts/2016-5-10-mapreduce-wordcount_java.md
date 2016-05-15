---
layout: default
title: Wordcount Java
category: MapReduce
type: MAPREDUCE
---
*Naval Postgraduate School Lab Excerpt*

*from **Oracle Loader for Hadoop with Cloudera HDFS/Oracle12C Part 1***

Prepared by: *Arijit Das, Greg Belli, Erik Lowney, Jim Zhou, Nick Bitto*

## WordCount Outline

The purpose of WordCount is to return a count of each word in the file(s)

![]("https://dl.dropboxusercontent.com/s/v4abyq8vy4iuq5t/word_count_illustration.PNG?dl=0")

`import *;
public class WordCount1 {
    public static class WordCountMapper
    extends Mapper<Object, Text, Text, IntWritable> {
    }    
    public static class WordCountReducer
    extends Reducer<Text,IntWritable,Text,IntWritable> {
    }    
    public static void main(String[] args) throws
    Exception {
    }
}`
    
## Main Function

`public static void main(String[] args) throws Exception
{
    Configuration conf = new Configuration();
    Job job = new Job(conf, "word count");
    job.setJarByClass(WordCount1.class);
    job.setMapperClass(WordCountMapper.class);
    job.setReducerClass(WordCountReducer.class);
    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(IntWritable.class);
    FileInputFormat.addInputPath(job, new
        Path(args[0]));
    FileOutputFormat.setOutputPath(job, new
        Path(args[1]));
    System.exit(job.waitForCompletion(true) ? 0 : 1);
}`
    
Now let's break it down.

Set the name to "word count"

`Configuration conf = new Configuration();
Job job = new Job(conf, "word count");`
    
The name of the class file that will run the job

`job.setJarByClass(WordCount1.class);`
    
The class file that will run the mapper and reducer. In this case the mapper and reducer are nested classes inside the job class.

`job.setMapperClass(WordCountMapper.class);
job.setReducerClass(WordCountReducer.class);`
    
Set the class for the key field and for the value field. The key field will be text and the value field will be an integer. This makes sense in a word count, since the word is the key and how often it appears is the value.

`job.setOutputKeyClass(Text.class);
job.setOutputValueClass(IntWritable.class);`
    
The word count application has two arguments.  The first argument is the input file that we will run the word count on. The second is the filepath where the word count application will write out the output text.

`FileInputFormat.addInputPath(job, new
    Path(args[0]));
FileOutputFormat.setOutputPath(job, new
    Path(args[1]));`

This line will start the job and then block until the job is complete. If the job completes successful the application will exit with a return code of 0, if there is an error it will exit with a return code of 1.

    System.exit(job.waitForCompletion(true) ? 0 : 1);

## Mapper Function

`public static class WordCountMapper
    extends Mapper<Object, Text, Text, IntWritable>
{
    private final static IntWritable one = new
        IntWritable(1);
    private Text word = new Text();
    public void map(Object key, Text value,
        Context context) throws IOException,
        InterruptedException
    {
        String[] words = value.toString().split(" ") ;
        for (String str: words)
        {
            word.set(str);
            context.write(word, one);
        }
    }
}`

Let's break it down.

This is the WordCountMapper class declaration. It extends the Mapper class and requires four arguments. These are KEYIN, VALUEIN, KEYOUT, VALUEOUT. This is there the input and output datatypes for the keys and values are set.   The KEYIN field is set to Object. The key by default will be the byte offset for the value from the input textfile. The VALUEIN is set to Text and will contain the line of text from the input file.

`public static class WordCountMapper
extends Mapper<Object, Text, Text, IntWritable>`
    
The KEYOUT field is set to Text. In the word count application, the key field will be the individual words. The VALUEOUT field is set to IntWritable and will contain a count of how often the word appears.

Text and IntWritable are both Hadoop classes. Text is comparable to String and IntWritable is comparable to Integer. The difference is the Text and IntWritable classes implement interfaces that are used by Hadoop to run the MapReduce.


<pre>public static class WordCountMapper
extends Mapper<Object, Text, <b>Text, IntWritable</b>></pre>

Create a constant variable named one and set it to equal ‘1’. The word count works by splitting up each line by word and assigning each word the value of ‘1’. In the reduce phase the application will count the similar words.


Create a Text variable to hold each individual word once the input Text line is split.

`private final static IntWritable one = new
    IntWritable(1);
private Text word = new Text();`

This function is run when the Mapper is called on the Data Node. Key is the byte offset and is never used in the word count job. Value is the Text line from the input file. Context is a class that allows the task to write data out.

`public void map(Object key, Text value,
    Context context) throws IOException,
    InterruptedException`
    
A string array of every word in the input line is created by splitting the Text at every space character.

Each word in the array is casted from a String into Text.

`String[] words = value.toString().split(" ") ;
    for (String str: words)
    {
        word.set(str);
        context.write(word, one);
    }`
    
The Context class is used to write out the intermediate data. The KEYOUT is the Text that was set in the previous line. The VALUEOUT is the IntWritable that was set to ‘1’. 

The end result of the Map phase is a collection of key-value pairs in the form [word, 1]. Multiple instances of the same word will be added up in the Reduce phase.

`context.write(word, one);`

## Reducer Function

`public static class WordCountReducer extends 
    Reducer<Text,IntWritable,Text,IntWritable> 
{ 
    public void reduce(Text key, Iterable<IntWritable> 
        values, Context context) throws IOException, 
        InterruptedException 
    { 
        int total = 0; 
        for (IntWritable val : values) 
        { 
            total++; 
        } 
        context.write(key, new IntWritable(total));
    } 
}`

The reduce function is called on the individual datanodes after the map phase has completed. The function has three parameters. The first parameter is the key that the datanode will process. The second parameter is a iterable list of values for that key. The third parameter is the context which is used to write out the result.

`public void reduce(Text key, Iterable<IntWritable> 
    values, Context context) throws IOException, 
    InterruptedException`
    
The for loop will count how many values we found for the given key. In the word count example, this means counting how many times an individual word appeared. The value in the key value pair was set to one, so instead of adding  the value in the IntWritable, we can just count++ for each object in the iterable.

`int total = 0; 
    for (IntWritable val : values) 
    { 
        total++; 
    }`

The Context class writes out the result. 

`context.write(key, new IntWritable(total));`