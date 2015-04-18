# rogueminds.org

## Step-by-step Installation
This section provides a little more detailed understanding of what goes into getting the application up and running. Though it is really simple to use, it might help to have an understanding of the tools involved here, like Grunt and Bower.

Okay, ready to go? Here it is:

Find a suitable location for the project.

    $ cd /Users/<USERNAME>/projects/html

Fork this repository into your own `namespace` by visiting the URL below:

> [https://github.com/rogueminds/rogueminds.org/fork][6]

Clone your recently forked repository using the SSH URI. Update the command below with the URL of your fork, which can be found in the top right corner of your BitBucket namespace:

    $ git clone git@github.com:<USERNAME/rogueminds.org.git

Switch to the project's directory:

    $ cd rogueminds.org

Add `rogueminds/rogueminds.org` as the upstream repository. This will allow you to keep your namespace up to date with upstream updates.

    $ git remote add upstream git@github.com:rogueminds/rogueminds.org.git

Install the build dependencies locally:

    $ npm install -g grunt-cli
    $ npm install -g bower
    $ npm install

To ensure your setup works, launch grunt:

    $ grunt watch

## Live Reload!
The application include [Live Reload][8], so you no longer have to refresh your page after making changes! You need a Live Reload browser plugin for this.

* Chrome - [Chrome Webstore][9]
* Firefox - [Download from Live Reload][10]
* Safari - [Download from Live Reload][11]

## Production Builds

When you're ready to push your app into production, just run the compile command:

    $ grunt compile

This will concatenate and minify your sources and place them by default into the `dist/` directory. There will only be one file: `index.html`.

Also, a complete build is always available by simply running the default task, which runs `build` and then `compile`:

    $ grunt

[1]: https://github.com/rogueminds/rogueminds.org
[2]: https://www.vagrantup.com/downloads.html
[3]: https://www.virtualbox.org/wiki/Downloads
[4]: http://brew.sh/#install
[5]: http://msysgit.github.io/
[6]: https://github.com/rogueminds/rogueminds.org/fork
[8]: http://livereload.com/
[9]: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
[10]: http://download.livereload.com/2.0.8/LiveReload-2.0.8.xpi
[11]: http://download.livereload.com/2.0.9/LiveReload-2.0.9.safariextz
