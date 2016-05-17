---
layout: default
title: GitHub and Jekyll
category: Learning Resources
type: LEARNING_RESOURCES
---

# Powered by GitHub and Jekyll

The primary goal of the capstone project, that necessitated this website, was to pass information along to future students.  Our first idea was to create a Wiki page on GitHub, and use that as the primary way disseminate the data.  The problem with that, is the Wiki page is hidden away, and has limited layout options.  

That's where Jekyll comes into play.  It is a fantastically easy way to create a static website, using GitHub as a content server.  This information may be helpful if you would like to contribute, or just because you want an easy way to make a website.  

## Markdown

<a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="blank">Markdown</a> is one of the native ways to format data on GitHub Wikis.  It is very intuitive, and easy to read.

A few quick examples:

\# Header1

# Header1


\#\# Header2

## Header2

\*\*Bold\*\*

**Bold**

\*Italic\*

*Italic*

\`Code Block`

`Code Block`

## Jekyll

<a href="https://jekyllrb.com/" target="blank">Jekyll</a> is a static website generator, which allows you to use Markdown, CSS, javascript, and HTML to format pages.  It also takes advantage of the template engine <a href="https://github.com/Shopify/liquid/wiki" target="blank">Liquid</a>, to allow the creation of easy, and good looking layouts.

*Definition of Jekyll from its site*

Jekyll is, at its core, a text transformation engine. The concept behind the system is this: you give it text written in your favorite markup language, be that Markdown, <a href="http://redcloth.org/textile" target="blank">Textile</a>, or just plain HTML, and it churns that through a layout or a series of layout files. Throughout that process you can tweak how you want the site URLs to look, what data gets displayed in the layout, and more. This is all done through editing text files; the static web site is the final product.

Static websites are useful for blogs, API documentation, or other content that does not change often.  It significantly reduces server loads by only having to produce a static page, instead of creating the information dynamically from database tables.  

It is a coder's dream!!  Edit the files locally, preview the affects in a web browser, with Jekyll serving up the pages, and push to your site when it's ready.  In this case, I pushed to GitHub.

GitHub offers hosting for one site per GitHub account.  That's what this site is running on right now.  The website for the GitHub account csumbBigData, is followed by .github.io --> csumbbigdata.github.io

I am also using DropBox to host the pictures used in the installation pages, although you can also host them from the GitHub repo.  Instructions for doing this are <a href="http://benwilhelm.com/the-website/nerd-stuff/2014/12/21/building-an-image-heavy-jekyll-site/" target="blank">here</a>.  The instructions do not mention that you must create a new folder called Public, in Dropbox.

Installation of Jekyll on a Windows system is a little tricker than a Mac.  It required the installation of <a href="https://chocolatey.org/" target="blank">Chocolatey</a>, which is then used to install Ruby and Jekyll.  Complete instructions for this installation are <a href="https://davidburela.wordpress.com/2015/11/28/easily-install-jekyll-on-windows-with-3-command-prompt-entries-and-chocolatey/" target="blank">here</a>.

 - Jekyll <a href="https://jekyllrb.com/docs/installation/" target="blank">installation</a> for non-Windows systems.

### Website
Jekyll comes with a default blog template that is installed, along with the Jekyll scaffold, when the new command is used.  After Jekyll been installed, you can start a new site by completing the following.  

Using the command prompt, navigate to the directory where you would like to keep the files, and enter these commands.

    $jekyll new my-site
    $cd my-site
    $jekyll serve


If a directory is not empty, Jekyll will not create a new scaffold in it, unless the \--force flag is appended.

    jekyll new <site_name> --force
    
 * *Caution:* This will overwrite any files that have the same name as a new Jekyll directory, such as index.html
 * Creating a new scaffold is not necessary if you download a template.
    * Simply use `jekyll serve` in the command prompt, at the root directory of the template.
    
This will create a Jekyll scaffold for a new blog-type web page.   Markdown files placed in the _posts folder will automatically be rendered into HTML, and displayed as a list of links from the newest, to the oldest. Dates must be placed in front of the names.  A default file is kept in there for reference.

<a href="https://jekyllrb.com/docs/frontmatter/" target="blank">Front matter</a> must be included in every file.  Title, layout, tags, categories, and other information can be specified here.

    ----
    title: My Jekyll Site
    layout: default
    ---

   
There are many excellent-looking Jekyll <a href="http://jekyllthemes.org/" target="blank">templates</a> that are easy to implement.  To use one:

 - Download and unpack the files.  
 - Navigate in cmd to the root directory
 - Use the following command
 
<!-- endList -->

    jekyll serve
    
Navigate to localhost:4000, and check out your site!

The <a href="http://jekyllthemes.org/themes/documentation-theme-jekyll/" target="blank">documentation</a> theme template has set the default port to 4005.  Jekyll will give you the server address after you enter the serve command. Make sure you check the port number, if you're having trouble connecting.  

![](https://dl.dropboxusercontent.com/s/sjzj0p7b6gtmipx/jekyll_serve.PNG?dl=0) 


If you check in the root folder, you will find several files and folders that are common to every Jekyll site.  

 - index.html - The html file that is generated from all the content, css, and scripts.
 - _posts - Holds content.  Date is used to control ordering.  Files with most recent dates are displayed first.
 - _layouts - Holds layout html files.  default.html is usually included.
 - _includes - Holds header and footer layout html files.  These can be used in the main layout html file.
 - _site - Holds html files that are generated from the _posts folders, as well as index.  Also holds css and javascript files.
 
*Note*

You can edit the idex.html file directly, and send that to your web server.  You must remember though, that it is regenerated through templates, css and javascript.  

If you make a change to any files while the Jekyll server is watching the folder, the html file will be regenerated, and the change will be lost.  The layout, css, or javascript must be changed to make sure the edit is reflected in the index.html every time changes are made, and index.html is regenerated.  

**More Resources**

 - Jekyll Bootstrap is no longer maintained, but the <a href="http://themes.jekyllbootstrap.com/preview/twitter/lessons/2011/12/29/jekyll-introduction/" target="blank">Jekyll introduction</a> gives a great overview of how everything works.
 - <a href="https://pages.github.com/" target="blank">GitHub Pages</a> will walk you through setting up your own site. 

This site is using the <a href="http://jekyllthemes.org/themes/carte/" target="blank">Carte</a> template.  

