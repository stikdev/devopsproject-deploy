# The Devops Project

## Overview
Hey! We're the Waymark technology team.

We ask that you please spend no more than **8 hours** completing this project.

Our team will review your submission for a number of criteria -- functionality, completeness,
reliability, craft, and presentation, to name a few -- so please put your best foot
forward. We'd like to see what you think would qualify as "production-ready", so if you need to
make a decision between getting *everything* working and doing your best work for only some of the
project, we'd prefer to see your best work.

Once you've read through all of the instructions here (particularly the Deliverable section at
the end), you'll be ready to begin. **Please** contact us if anything is unclear or you have
any questions at all. Problems are solved by teams and we want to make sure you have everything
you need to succeed.

Finally, here at Waymark our semi-official mascot is the wombat, and we like to incorporate our
favorite marsupial into our recruitment projects.

Have fun!

## Project Description

**Automatically deploy a small web application to Amazon Web Services.**

We've built a little web application that uses React in the browser and NodeJS as the
application server. This web application tries to do a number of things, all meant to exercise
the company's infrastructure and confirm that things are connected properly:

1. Talk to the application server to retrieve a list of important things to do.
1. Ask the application server to upload a special image to Amazon's S3, then display it in the
   browser.
1. Use the application server to discover what time the database server thinks it is.
1. Use the application server to call a Lambda function that talks to wombats (we warned you...).

We'd like you to build a means of automatically deploying this application into Amazon's cloud
using the provisioning and automation tools of your choice.

### Application Repository
The Github repository (where this README lives) contains all of the application code in 3
subdirectories:

- `client`: The front-end portion of the application. This JavaScript app makes AJAX
      queries to the application server to perform the various tasks listed above.
- `lambda`: A small Lambda function that will return a message from the wombats when
      called.
- `server`: The NodeJS application server code. This server is capable of serving up
      the HTML, JavaScript, CSS, and other assets used for the client portion of the
      application. It also hosts the API that the client application will use to perform the
      monitoring tasks.

### Running the Application Locally
If you want to run the application locally to try it out, you can use the provided Vagrantfile
or install NodeJS 8 on your machine.

#### Local Installation

Install NodeJS 8 on your local machine, then run the following 3 sets of commands from within
the top level directory of the repository to install and build the application:

1. Install the JavaScript modules for the client-side JavaScript and CSS code, compile the
   code, then place the resulting assets in `client/build` for publication by the application
   server.
    - `$ cd client && npm install && npm run build && cd ..`
1. Install the JavaScript modules for the Lambda function's JavaScript code, compile the
   function, then create a zip file suitable for deploying to the AWS Lambda service.
    - `$ cd lambda && npm install && scripts/create-zip-file.sh && cd ..`
1. Install the JavaScript modules for the application server's nodeJS code, then run the server
    on port 3001 (the default).
    - `$ cd server && npm install && node bin/www`

#### Vagrant Installation

1. Install Vagrant.
1. Run the Vagrantfile located in this directory. This will create a bare Ubuntu 16.04 VM,
   clone the project repository, and install the npm dependencies.
    - `$ vagrant up`
1. ssh into the Vagrant VM.
    - `# vagrant ssh`
1. Go to the project server directory, then run the server. This will run the server on port
   3001, which will in turn be forwarded by the Vagrant VM to your localhost.
    - `cd devopsproject-deploy && node bin/www`

#### Open the Application in a Browser

You should now be able to access the application at `http://localhost:3001`. The problem is
that no one else can use it, and most of the application will fail to work without some
additional infrastructure. That's where you come in.

## Project Tasks

There are two main tasks necessary to complete this project.

#### One: Up and Running!
*Deploy the application to AWS.*

Your first task will be to get the server application running in the cloud. Use any means you
like so long as it runs entirely in Amazon's AWS infrastructure. You should be able to
demonstrate the application running to anyone who has the public IP address. The server code
will look for the client's static assets in `client/build`, a directory that is generated
during the `npm run build` portion of the client build scripts.

One note: we ask that you use services that run in Amazon's free tier. Details can be found
here: [https://aws.amazon.com/free/](https://aws.amazon.com/free/)

Some of the services are limited to a 12-month introductory offer. Please feel free to create
an account strictly for this project if your account's free introductory period has expired, or
if you'd just prefer to do so. We won't need access to your account since we'll be running your
build and deploy scripts elsewhere to test them.

If you feel that you will need to pay for some services to do your best work, please contact
us! We're excited to hear what you have in mind and we can discuss it further.

Remember, the deployment and configuration of the application should be an automated process,
and we'll need to be able to understand and run your scripts ourselves when we're evaluating
your submission. You can change the application itself in any fashion to aid in your deployment
work, so long as the original functionality of the application is unchanged.

#### Two: Static Assets
*Separate the static assets from the application server.*

Now that it's running we'd love to have the static assets (JavaScript and CSS) hosted and
served somewhere other than on our new application server platform. The second task is to
modify the deployed application to use Amazon's S3 for serving up the client portion of the
application while still using the NodeJS application server for the API services.

To build to client code for a specific URL (ie. you want to specify where the client files are
coming from) use the `PUBLIC_URL` environment variable with the client build scripts:

    $ cd client && PUBLIC_URL="http://some.other.place.com" npm run build

Once you have done this the application server will serve up HTML that contains absolute URLs
to its JavaScript and CSS files by prepending the contents of `PUBLIC_URL` to the static file
locations.

### Extra Credit
At this point you should have an application that can retrieve a list of things to do from the
server and display them. There are three additional tasks that can be done for bonus points (or
fun!):

#### Bonus One: Improve Our Image
*Configure an S3 bucket for the application server to store images programmatically.*

The client application can ask the server code to programmatically copy an image to an S3
bucket (not necessarily the same bucket as set up for the static web hosting), and then display
the image using the server response. The server will need to be configured to store images in
an S3 bucket by providing the `S3_BUCKET` environment variable to the server NodeJS process at
startup.

#### Bonus Two: Does Anybody Really Know What Time It Is?

*Provision and configure a PostgreSQL database in Amazon's Relational Database Service (RDS).*

The client application can ask the server to query the database for the current time and return
it to the client application if the server has been provided the following environment
variables to configure a database connection.

- `PGHOST`: the host name of the RDS instance endpoint
    - eg. `waymark-devops-project.heebrn245rax.us-west-1.rds.amazonaws.com`
- `PGUSER`: the database user
- `PGPASSWORD`: the password for the database user
- `PGDATABASE`: the name of the configured PostgreSQL database
- `PGPORT`: the port number of the RDS instance endpoint (optional, defaults to 5432)

#### Bonus Three: Get On the Right Wavelength
*Deploy and configure the Lambda function.*

The client application can ask the server to contact the wombats for a comment if the Lambda
function has been deployed. The server will look for the Lambda function with the name
`wombat_roar` in the `us-west-1` region by default, or, if desired, by using the
`LAMBDA_REGION` and `LAMBDA_NAME` environment variables.

## Deliverable
Upon completion, please send us a link to your copy of this repository (preferably on
GitHub). Include a list of known bugs or deficiencies in your project, if necessary. **Please
do not fork the repository**; instead, follow these steps:

- Clone this repository
  - `git clone https://github.com/stikdev/devopsproject-deploy.git`
- Create an empty GitHub repository
  - `https://github.com/your-user-name/devopsproject-deploy.git`
- Add a remote to your empty repository
  - `git remote add my-origin https://github.com/your-user-name/devopsproject-deploy.git`
- Then you should be able to commit your changes and push them up to your repository
  - `git push my-origin master`

Within your copy of the repository, add your automation scripts with instructions on how to run
them in our own test AWS account.
