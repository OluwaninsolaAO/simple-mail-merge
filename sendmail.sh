#!/usr/bin/bash

curl -si -H 'auth-token: d4150832-cec6-47af-8888-09ab6bc6e31c' 0:5000/v1/sendmail -X POST -H 'content-type: application/json' -d '{"config_id":"beac1633-4314-4044-8389-f03d8f4647f0", "subject":"Greetings {{name}}, Check me out!", "body":"<h1>Awesome attempt {{name}}</h1><p>We are happy to reach out to you {{name}}, that you are officially {{age}} years old! Please get in touch to claim your gift as well derserved by all your hard work in our workspace. We love and appreciate you.</p>", "recipients":"name,age,email\nAbraham,45,olagunjusola070@gmail.com"}'