---
layout: default
title: WordCount Python
category: MapReduce
type: MAPREDUCE
---

### Mapper

```
    #!/usr/bin/python
    import sys

    def mapper():

        for line in sys.stdin:
            data = line.strip().split(" ")
            words = data
            for word in words:	
                print "{0}\t{1}".format(word,"1")
    mapper()
```

### Reducer

``` 
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



