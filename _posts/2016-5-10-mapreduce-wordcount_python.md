---
layout: default
title: WordCount Python
category: MapReduce
type: MAPREDUCE
---

These snippets of Python code are an example
of how a MapReduce job will be developed in Python.
The code demonstrates the wordcount application of 
hadoop. It is possible to feed in a text file to the 
system using this mapper and reducer and the output 
will be the count of the words in the text file.

### Mapper

{% highlight python %}

#!/usr/bin/python
import sys
def mapper():
    for line in sys.stdin:
        data = line.strip().split(" ")
        words = data
        for word in words:	
            print "{0}\t{1}".format(word,"1")
mapper()
{% endhighlight %}

### Reducer

```python
#!/usr/bin/python
import sys
wordCount = {}
def reducer():    
    for line in sys.stdin:        
        line = line.strip()
        word, count = line.split("\t",1)
        try:
            count = int(count)
        except ValueError:
            continue
        try:
            wordCount[word] = wordCount[word] + count
        except:
            wordCount[word] =count 
    for word in wordCount.keys():
        print "{0}\t{1}".format(word,wordCount[word])
reducer()
```



