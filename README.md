# Recruitment-Website
This project is a JavaWeb project using Java JSP HTML css JavaScript for development. Its purpose is for job seekers to find jobs and employers to hire talents.<br>
## REFERENCES:
In the process of developing this website, I referred to some templates from the Internet, so this website has some similarities with other websites
## Short videos displaying how this website works:
the video below shows the homepage of this website:<br>

https://user-images.githubusercontent.com/72424079/221785346-0cef1e99-a838-48c5-a857-4c9ed0d2ca06.mp4

<br>the video below shows how candidates sign up in this website:<br>


https://user-images.githubusercontent.com/72424079/221788666-ef1cb76e-bb64-4f77-a2da-5ffa4bfc3964.mp4

<br>the video below shows how companies sign up in this website:<br>


https://user-images.githubusercontent.com/72424079/221790693-98bf59f5-04b9-4cb1-bf16-8a2280c16fb9.mp4

<br>the video below shows how users sign in:


https://user-images.githubusercontent.com/72424079/221806854-4094b705-319d-42b0-82a8-60e5df351887.mp4

<br>the video below shows how employers post jobs:


https://user-images.githubusercontent.com/72424079/221870778-51793db8-4c88-4de0-9f27-aceff393690b.mp4

<br>the video below shows how to search for jobs:


https://user-images.githubusercontent.com/72424079/222032699-d1ab7494-761c-418d-bde4-4c5964203165.mp4

<br>the video below shows the webpage that displays job details:


https://user-images.githubusercontent.com/72424079/222035390-f5e860d0-42c8-4c5e-85ef-2a5479562394.mp4


<br>the video below shows how candidates apply for jobs:



https://user-images.githubusercontent.com/72424079/222038405-1010c335-1eb7-4e11-829f-456c5eaec23c.mp4


<br>the video below shows the statistic page:


https://user-images.githubusercontent.com/72424079/222136659-3a635d80-f659-4815-bf82-eb0c9a573054.mp4


## The aim of this project:
This website provides job seekers with a platform to find jobs and recruiters with a platform to recruit talents.This website has the following sub-modules: registration module, login module, position posting module, job searching module, job details page, application module, statistics module.
## Tech stack of this website:
HTML, CSS, JavaScript were used for front-end development and webpage development;<br>
MySQL8.0 database was used for storing data;<br>
Java, JSP were used for back-end development and sever development;<br>
Tomcat was used as server.
## Details about code and program:
### How the webpages are developed:
First I designed this logo myself, then embedded it into the website, modify the attribute of the div to make it suitable for this page. <br>
![logo](https://user-images.githubusercontent.com/72424079/224461223-4cb59297-1e5f-4f65-a903-c9d6ef5d4b15.png)

Create a drop-down box by using "select-option":<br>
![image](https://user-images.githubusercontent.com/72424079/224461103-a6e6ed0f-4e01-4c86-895a-0aaac695bf2a.png)
![image](https://user-images.githubusercontent.com/72424079/224461142-e98606d3-90c3-4ea9-a5fb-68b013bcac56.png)

Use "placeholder" to display sample answers in the text box:
![image](https://user-images.githubusercontent.com/72424079/224461352-655080bf-b8fb-4500-b544-8051115f767c.png)
![image](https://user-images.githubusercontent.com/72424079/224461366-48fc50a6-be24-424d-ba09-b4dda625339c.png)

Display the categories of jobs through the example icons like "ti-hummer" and "ti-money":
![image](https://user-images.githubusercontent.com/72424079/224461441-07dc1ea4-d45a-403c-8b7d-770cc32ee6cb.png)
![image](https://user-images.githubusercontent.com/72424079/224461453-44a75173-99ab-41f5-89ed-5eb765b0835b.png)

### How the registration function is implemented:
After filling in the information, click the sign-up button to execute the "candidate_signup" function bound to "onclick".
![image](https://user-images.githubusercontent.com/72424079/224462451-2c49863c-697e-4514-b419-57488538e186.png)
<br>This "candidate_signup" function first obtains the information filled in the text box by the user through the "getElementById" function, and then calls the "send" function to send them to the JSP program on the backend server.<br>
![image](https://user-images.githubusercontent.com/72424079/224462552-295d3e97-4c84-4205-b881-8604d7f94f25.png)
The JSP program in the back end server calls the "request.getParameter" method to receive the information sent by the front end browser, and then calls "DBConn.candidate_signup" method to store the information filled in by the user in the database.
![image](https://user-images.githubusercontent.com/72424079/224462821-b2bfef28-554e-4bf0-b9ba-e3dd5a38e814.png)
<br>In this "candidate_signup" method, the database will execute this statement "insert into candidate values(?,?,?,?,?,?,?,?,?,?,?)" to insert a new record to "candidate" table in the database. The parameters of this SQL statement(ex:email, name, etc) come from the parameters of the method.<br>
![image](https://user-images.githubusercontent.com/72424079/224462973-f00e4623-1b1a-4182-b07a-0279ede2a0e2.png)
