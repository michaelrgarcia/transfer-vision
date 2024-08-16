# TransferVision

TransferVision is a full-stack web application that allows a user to view all California Community College classes from ASSIST.org that satisfy the selected UC/CSU requirement.

Inspired by https://github.com/jacobtbigham/ccc_transfers.

# Index

- [Use Cases](#use-cases)
- [Technical Details](#technical-details)

## Use Cases

## "I am trying to find a college where this course is offered. I would prefer to take it before I transfer."

![image](https://github.com/user-attachments/assets/31168613-464a-498c-95de-b5c37e4b9f27)

### Select the corresponding school, major, and course on TransferVision to find a college that offers this course.

![image](https://github.com/user-attachments/assets/acd1d613-3d08-488d-a879-b135e419ccc2)

### There are a plethora of (possibly asynchronous) options to choose from.

![d9b42655be244a3022f19d90c646c91a(1)](https://github.com/user-attachments/assets/5c9991ec-7d97-4be1-af21-09eb8f3cb9ff)

## "I would like to minimize my courseload by taking a course that transfers to all of the schools that I want to apply to."

![image](https://github.com/user-attachments/assets/a49a6a2d-55d9-4463-8820-f4d49991495c)

### "CIS 21JA transfers to every other school but these two. I would really like to attend either of these two schools."

![image](https://github.com/user-attachments/assets/b47c18bf-5b2e-4975-bcbd-ab04b81facfb)

![image](https://github.com/user-attachments/assets/2fa8edac-8567-4fd3-b12e-c3a4f5ca7b1e)

### Look on TransferVision for a course that transfers to these two schools, including your other choices.

*UC Berkeley*
![image](https://github.com/user-attachments/assets/278e0c2e-39c0-40da-909e-eeee1fbf00a0)

*UC Irvine*
![image](https://github.com/user-attachments/assets/4e7cb0d1-5246-43cb-9a64-a2f301c25cb1)

*UC Los Angeles*
![image](https://github.com/user-attachments/assets/950c2369-843c-4920-938a-b2190919b522)

### To verify the data, click on a college name to view the respective ASSIST.org agreement.

![6ccc1d46270a58e94c4299b3f718990a](https://github.com/user-attachments/assets/85ea177b-8b71-4cb7-aa35-2fd3ea037a6b)

## "My college does offer this course, but the professor that teaches it would jeopardize my GPA."

![image](https://github.com/user-attachments/assets/20c3ea64-a8bc-4dcb-a9cd-798dec8ff3c6)

![image](https://github.com/user-attachments/assets/333259ef-7a62-4da6-b248-24a1552d3b5e)

### Use TransferVision to find a possible alternative.

![image](https://github.com/user-attachments/assets/ce5e4c15-0316-4d6b-be5e-5fdfabd843f9)

### Exactly one alternative.

![image](https://github.com/user-attachments/assets/b991af31-095c-4e39-a863-941de1cc20d1)

### "Some research shows that the course is asynchronous, which means that I can take it without commuting to Santa Barbara."

![image](https://github.com/user-attachments/assets/bd0c7d8c-0400-4e93-9b39-cfafde1b3518)

(from Santa Barbara City College's Spring 2024 class schedule page)

## Technical Details

**Frontend**: Vanilla JavaScript, HTML, and CSS

**Backend**: 2 Express.js APIs hosted on AWS Lambda / API Gateway.

**Database**: Amazon DynamoDB

I will likely get around to writing the frontend in a JavaScript framework such as React or Vue. 









