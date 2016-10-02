---
layout: post
title: "Creating an animated GIF from multiple JPEGS (osx)"
description: "A how-to on making gifs from the command line."
category: osx
tags: [gif, osx]
---

### Requirements

[ImageMagick](http://www.imagemagick.org/script/index.php)
I use [homebrew](http://mxcl.github.com/homebrew/) (`brew install imagemagick`)

[gifcicle](http://www.lcdf.org/gifsicle/)

`brew install gifcicle`

### Open up a terminal to the folder with the jpgs.

*Note, they should be in the frame-order you want them to animate with, so
number them ascending. 1.jpg, 2.jpg, 3.jpg, etc.*

### Put the following script in a file (convert.sh)

This script goes through all the .jpg files in the current directory, and
resizes their width down to 500px, and resizes the height based on the current
aspect ratio of the image.

```
#!/bin/bash
for i in *.jpg
do
  convert -resize 500 $i resized/$i
  echo $i processed
done
```

Save the file, then back in the shell make it executable:

`$ chmod 700 convert.sh`

Make a ‘resized’ folder

`$ mkdir resized`

Run convert.sh

`$ ./convert.sh`

CD into the ‘resized’ folder that was just created, and run mogrify

```
$ cd resized
$ mogrify -path . -format gif *.jpg
```

This will convert all .jpg files to .gif files, which are required for gifcicle to make an animated gif from multiple gif files.

### Use gifcicle to create the final gif

`$ gifsicle --delay=30 --colors=256 --loop *.gif > animated.gif`

Done!

Now you’ve got an animated gif file called animated.gif in the ‘resized’
folder. This particular one will loop forever.
