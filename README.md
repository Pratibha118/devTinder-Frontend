# DevTinder

-created Vite+React application
-Removed unecessary code
-Install Tailwind css
-Intall DaisyUI
-Add navbar component to App.jsx
-Create a navbar.jsx separate file inside components folder
-Install react-router-dom 
-Created basic routes in app.jsx
-Created Body component and added it in "/" default route.
-Created children of Body Component and called Navbar,Outlet and Footer in it.
-Crate a Login page
-Install axios 
-CORS -install cors in backend => add middleware to with {configurations: origin, credentials: true}
-Whenever you are making API call so pass => withCredentials: true
-Install Reduxtoolkit and react redux
-Create configureStore, provide your store in Provider, createSlice then add reducer to the store.
-Dispatch adduser action after successful login
-Navbar should update once user is login
-Other routes should not be accessible without login
-If token is not present, redirect user to login page.
-Logout feature
-Get the feed nd add feed data in store
-Build the user card on feed
-Edit profile feature
-Show Toast msg on saving changes in profile
-See all the connections
-Accept or reject connection requests
-Send/Ignore the user from the feed.
-SignUp form
-E2E tesing

# Deployment

-SignUp AWS account
-Create and launch an instance
-Connect to instance
-chmod 400 "DevTinder-secret.pem" //changing permission for this file
-ssh -i "DevTinder-secret.pem" ubuntu@ec2-56-228-80-5.eu-north-1.compute.amazonaws.com // connecting to the instance
-install node js on EC2 
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 24

# Verify the Node.js version:
node -v # Should print "v24.11.1".

# Verify npm version:
npm -v # Should print "11.6.2"."$

-git clone frontend code and backend code
-cd devTinder-Frontend 
    -> npm install -> npm run build 
    -> sudo apt update
    -> sudo apt install nginx (install nginx to host the application)
    -> sudo systemctl start nginx
    -> sudo systemctl enable nginx
    -> sudo scp -r dist/* /var/www/html (copy all the content of dist folder to this path /var/www/html)
    - enalbe port :80 on EC2 instance
-cd devTinder-Backend
    -> npm install
    -> Since mongo Database can not be access from anywhere, allow our EC2 instace IP address in database
    -> npm run start
    -> enable port 3000 in EC2 instance (or the port in which backend application is running)
    -> install pm2 globally, npm install pm2 -g
    -> pm2 start npm --name "devTinder-backend" -- start (it will run the backend code in background and change the name of the process to devTinder-backend)
    -> pm2 logs (to check the logs)
    -> pm2 list (shows the list of running processes)
    -> pm2 flush <name> it will delete the logs of given process
    -> pm2 delete <name> it will delete the process
    -> pm2 stop <name> it will stop the process
    -> config nginx - /etc/nginx/sites-available/default
    -> sudo systemctl restart nginx (restart nginx)



    Frontend = http://56.228.80.5/
    Backend = http://56.228.80.5:3000/

    Domain name = devTinder.com => 56.228.80.5

    Frontend = devTinder.com
    Backend = devTinder.com/api

    nginx config- 
    server - 56.228.80.5;
    location /api/ {
        proxy_pass http://localhost:3000/;   # NOTICE: ends with slash
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

# Sending email via SES
 
  - Create an IAM user
  - Give Access to AmazonSESFullAccess
  - Amazon SES: create an identity
  - Verify your email or domain name
  - Install AWS sdk - v3
  - code sample https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/ses-examples-sending-email.html
  - Setup SES client
  - Access credentials should be created in IAM under securityCredentials tab
  - Add the credentials to the env file
  - Write code for SESClient
  - Write code for Sending email address
  - Make the email dynamic by passing more params.



