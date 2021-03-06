# Using Sencha Cmd with Ext JS

{@img ../command/sencha-command-128.png}

This guide walks through the process of using Sencha Cmd with Ext JS applications starting
with the `sencha generate app` command and ending with a running application.

This guide applies mostly to *new* single-page Ext JS applications. If you have an *existing*
single-page application you might consider using Sencha Cmd to build an application
skeleton based on this guide and then migrate your application code to this preferred
structure. This will provide you with the maximum leverage from Sencha Cmd. If this option
is not right for your app, you can still use Sencha Cmd to help with many aspects of your
development. For developing single-page applications with a custom folder structure, see
[Single-Page Ext JS Apps](#/guide/command_app_single).

If you work with applications that have multiple pages, it will be helpful to start by
learning about the simple uses of Sencha Cmd described in this and the
[Single-Page Ext JS Apps](#/guide/command_app_single) guide. For details on developing
more complex, multipage Ext JS applications, refer to
[Multi-Page and Mixed Apps](#/guide/command_app_multi).

## Generating Your Application

Our starting point is to generate an application skeleton. This is done using
the following command:

    sencha generate app MyApp /path/to/MyApp

**Important.** The above command must be able to determine the appropriate SDK. This can
be satisfied by either executing this command from a folder containing an extracted SDK
distribution or by using the `-sdk` switch like so:

    sencha -sdk /path/to/SDK generate app MyApp /path/to/MyApp

The application files generated by this command should have the following structure:

    .sencha/                # Sencha-specific files (e.g. configuration)
        app/                # Application-specific content
            sencha.cfg      # Configuration file for Sencha Cmd
            plugin.xml      # Plugin for Sencha Cmd
        workspace/          # Workspace-specific content (see below)
            sencha.cfg      # Configuration file for Sencha Cmd
            plugin.xml      # Plugin for Sencha Cmd

    ext/                    # A copy of the Ext JS SDK
        cmd/                # Framework-specific content for Sencha Cmd
            sencha.cfg      # Configuration file for Sencha Cmd
        src/                # The Ext JS source
        ext-*.js            # Pre-compiled and bootstrap files
        ...

    index.html              # The entry point to your application
    app.json                # Application configuration
    app/                    # Your application's source code in MVC structure
        app.js              # Your application's initialization logic
        model/              # Folder for application model classes.
        store/              # Folder for application stores
        view/               # Folder for application view classes.
            Main.js         # The initial default View
        controller/         # Folder for application controllers.
            Main.js         # The initial default Controller

    resources/
        css/
            app.css         # The main stylesheet, compiled from ../sass/app.scss
            default/        # Contains content generated for the default theme
                theme.css   # The CSS file generated from ../sass/default

        sass/
            app.scss        # The SASS file which compiles to ../css/app.css
            default/        # Contains the SASS code for the default theme

        theme/              # This folder contains Theme Builder information
            custom.js       # Contains any theme customizations (like custom components)
            manifest.js     # Generated (do not edit)
            render.js       # Generated (do not edit)
            shortcuts.js    # Generated (do not edit)
            styles.css      # Generated (do not edit)
            default/        # The name of the theme ("default" is generated initially)
                theme.html  # The control file for generating a theme

    build/                  # The folder where build output is placed.

There is no distinction between workspace and app content in a single-page application.
This distinction becomes important for multi-page applications as described in
[Multi-page and Mixed Apps](#/guide/command_app_multi).

## Extending Your Application

The `sencha generate` command helps you quickly generate common MVC components such as
controllers or models:

    sencha help generate

You should see this:

    Sencha Cmd v3.0.0.???
    HELP -- generate

    COMMANDS:
    * app - Generates a starter application
    * controller - Generates a Controller for the current application
    * model - Generates a Model for the current application
    * profile - (Touch Only) Generates a profile for the current application
    * store - Generates a Store for the current application
    * view - Generates a View for the current application

**Important.** In order to execute these commands, the current directory **must** be the
top-level folder of your application (in this case, "/path/to/MyApp").

### Adding New Models

Adding a model to your application is done by making the `"/path/to/MyApp"` your current
directory and running Sencha Cmd, like this:

    cd /path/to/MyApp
    sencha generate model User id:int,name,email

This command adds a model to the application called `User` with the given 3 fields.

### Adding New Controllers

Adding a controller is similar to adding a model:

    cd /path/to/MyApp
    sencha generate controller Central

There are no other parameters in this case beyond the controller name.

### Adding New Views

Adding a view to your application is also similar:

    cd /path/to/MyApp
    sencha generate view SomeView

There are no other parameters in this case beyond the view name.

## Building Your Application

All that is required to build your application is to run the following command:

    sencha app build

**Important.** In order to execute this command, the current directory **must** be the
top-level folder of your application (in this case, `"/path/to/MyApp"`).

This command will build your markup page, JavaScript code, SASS and themes into the `"build"`
folder.

## Customizing The Build

There are various configuration options available in the `".sencha/app/sencha.cfg"` file. In
the case of a single-page application, it is best to ignore the `".sencha/workspace"`
folder, which also has a config file.

When configuration options cannot accomplish the task, the next level of customization is
to extend the generated "build.xml" [Ant](http://ant.apache.org/) script. All that the
`sencha app build` command does inside Sencha Cmd itself is some basic validations before
calling in to the `"build"` target of this build script. This means the entire build process
can be examined, extended and if necessary, even modified.

### The classpath

The `sencha app build` command knows where to find the source of your application due to
the `app.classpath` configuration value stored in `".sencha/app/sencha.cfg"`. By default,
this value is:

    app.classpath=${app.dir}/app

Adding directories to this comma-separated list informs the compiler where to find the
source code required to build the application.

### Ant Extension Points

The generated `"build.xml"` [Ant](http://ant.apache.org/) script is a minimal Ant script that
uses an Ant `import` task to import `"build-impl.xml"`. The `"build.xml"` file is intended to
be edited after it is generated. The `"build-impl.xml"` file, however, will be upgraded
(replaced) by the `sencha app upgrade` command described below and is best left alone.

In addition to the `import` task, `"build.xml"` contains a comment block describing all of
the various extension points it provides. These are in the form of optional Ant targets and
are typically named after their build process step but with prefixes of `"-before-"` and
`"-after-"`. In other words, the `"sass"` build step is wrapped by targets that will be invoked
before and after the `"sass"` target named `"-before-sass"` and `"-after-sass"`.

To perform additional processing before or after any build step, add an appropriately named
target to `"build.xml"`. These targets will be invoked by `sencha app build`. These will also
be invoked if you use Ant to directly invoke a particular target.

**Note.** Because `sencha app build` simply invokes the `"build"` target of the Ant `"build.xml"`
file, you can equivalently invoke a build directly from Ant. This can be useful in IDE's
like Eclipse and NetBeans for invoking your builds but also in a Continuous Integration
server that understands Ant (which is just about all of them).

## Custom Themes

All applications start with a default theme, so it is typically not necessary to add any
themes. To enable an application to support multiple themes, the first step is to use the
following:

    cd /path/to/MyApp
    sencha generate theme red

This creates the following folders and some starter content:

 * `./resources/theme/red`
 * `./resources/css/red`
 * `./resources/sass/red`

For details on how to manage and build themes, see [Building Themes](#/guide/command_theme).

## Upgrading Your Application

Generated applications always include their own copies of the SDK from which they were
originally generated. Upgrading these application to a new version of the SDK means
replacing the old copy with the new one. Co this by changing directories to your
application folder and running the following command:

    sencha app upgrade ../downloads/ext-4.1.2

The above command points to the path to a downloaded and extracted SDK.

**Important.** Do not use the `-sdk` switch for this command as you would for the
`sencha generate app` command. Instead use the command shown above.
