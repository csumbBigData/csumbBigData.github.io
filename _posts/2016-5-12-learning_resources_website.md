---
layout: default
title: Website
category: Learning Resources
type: LEARNING_RESOURCES
---

# Powered by GitHub and Jekyll

It is always great when you find a simple, new solution to an old problem.

The primary goal of the capstone project, that necessitated this website, was to pass information along to future students.  Our first idea was to create a Wiki page on GitHub, and use that as the primary way disseminate the data.  The problem with that, is the Wiki page is hidden away, and has limited layout options.  

That's where Jekyll comes into play.  It is a fantastically easy way to create a static website, using GitHub as a content server.  This information may be helpful if you would like to contribute, or just because you want an easy way to make a website.  

## Markdown

<a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="none">Markdown</a> is one of the native ways to format data on GitHub Wikis.  It is very intuitive, and easy to read.

A few quick examples:

\# Header1

# Header1


\#\# Header2

## Header2

\*\*Bold\*\*

**Bold**

\*Italic\*

*Italic*

## Jekyll

<a href="https://jekyllrb.com/" target="blank">Jekyll</a> is a static website generator, which allows you to use Markdown and HTML to format pages.  It also takes advantage of the template engine <a href="https://github.com/Shopify/liquid/wiki" target="blank">Liquid</a>, to allow the creation of easy, and good looking layouts.

*Definition of Jekyll from its site*

Jekyll is, at its core, a text transformation engine. The concept behind the system is this: you give it text written in your favorite markup language, be that Markdown, Textile, or just plain HTML, and it churns that through a layout or a series of layout files. Throughout that process you can tweak how you want the site URLs to look, what data gets displayed in the layout, and more. This is all done through editing text files; the static web site is the final product.

Static websites are useful for blogs, API documentation, or other content that does not change often.  It significantly reduces server loads by only having to produce a static page, instead of creating the information dynamically from database tables.  

It is a coder's dream!!  Edit the files locally, preview the affects in a web browser, with Jekyll serving up the pages, and push to your site when it's ready.  

GitHub offers hosting for one site per GitHub account.  That's what this site is running on right now.  The website for the GitHub account csumbBigData, is followed by .github.io -> csumbbigdata.github.io

I am also using DropBox to host the pictures used in the installation pages.  Instructions for doing this <a href="http://benwilhelm.com/the-website/nerd-stuff/2014/12/21/building-an-image-heavy-jekyll-site/" target="blank">here</a>.

Installation of Jekyll on a Windows system is a little tricker than a Mac.  It required the installation of <a href="https://chocolatey.org/">Chocolatey</a>, which is then used to install Ruby and Jekyll.  Complete instructions for this installation are <a href="https://davidburela.wordpress.com/2015/11/28/easily-install-jekyll-on-windows-with-3-command-prompt-entries-and-chocolatey/">here</a>.

 - Jekyll <a href="https://jekyllrb.com/docs/installation/" target="blank">installation</a> for non-Windows systems.

### Website
Jekyll comes with a default blog template that is installed when the new command is used.  After it has been installed, you can start a new site by completing the following.  Using the command prompt, navigate to the directory where you would like to keep the files, and enter these commands.

    jekyll new my-site
    cd my-site
    jekyll serve
    
This will create a Jekyll scaffold for a new blog-type web page.   Markdown files placed in the _posts folder will automatically be rendered into HTML, and displayed as a list of links from the newest, to the oldest. Dates must be placed in front of the names.  

Front matter must be included in every file.  Title, layout, tags, categories, and other information can be specified here.

    ----
    title: My Jekyll Site
    layout: default
    ---
    
There are many excellent-looking Jekyll <a href="http://jekyllthemes.org/" target="blank">templates</a> that are easy to implement.

 - Download and unpack the files.  
 - Navigate in cmd to the directory
 - Use the following command
 
<!-- endList -->

    jekyll serve --watch
    
Navigate to localhost:4000 and check out your site!

If a directory is not empty, Jekyll will not create a new scaffold in it, unless the \--force flag is appended.

    jekyll new <site_name> --force
    
 * *Caution:* This will overwrite any files that have the same name as a new Jekyll directory, such as index.html
    
The \--watch flag can be used to serve a directory where you do not want to add Jekyll's default scaffold to.

    jekyll serve --watch

This command was used with this site, after downloading the template, and navigating to its directory.  


Some templates set the default port to something other than 4000.  Jekyll will give you the server address after you enter the serve command. I downloaded a template from jekyllthemes.org/ that used a template that specified 4005 as the default port.

![](https://dl.dropboxusercontent.com/s/j560phg42v4xi1m/jekyll_serve.PNG?dl=0) 

This site is using the <a href="http://jekyllthemes.org/themes/carte/" target="blank">Carte</a> template.  



