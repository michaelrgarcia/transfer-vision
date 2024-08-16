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









