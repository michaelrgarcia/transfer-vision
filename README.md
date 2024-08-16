# TransferVision

Wanting to apply to multiple UC/CSU institutions as a prospective transfer can be unnecessarily difficult. These institutions often have differing requirements, making extensive scanning through ASSIST.org agreements a neccessity to transferring well.

TransferVision is a full-stack web application that allows a user to view all California Community College classes listed on ASSIST.org that satisfy the selected UC/CSU requirement.

Inspired by https://github.com/jacobtbigham/ccc_transfers.

# Index
- [Technical Details](#technical-details)
- [Use Cases](#use-cases)
- [CVC](#cvc)

## Technical Details

**Frontend**: Vanilla JavaScript, HTML, and CSS

**Backend**: 2 Express.js APIs hosted on AWS Lambda / API Gateway

**Database**: Amazon DynamoDB

I will likely get around to writing the frontend in a JavaScript framework such as React or Vue. 

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

### Use TransferVision to find a course that transfers to these two schools, while having every other school in mind.

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

## CVC 

CVC does have useful features (live seat count, instant enrollment, etc.) but often fails to display courses that meet specific UC/CSU major requirements.

TransferVision adresses this, but it understandably lacks CVC's extra features which are *exclusive* to the discretion of California Community Colleges. More information can be found on CVC's [website](https://cvc.edu/).

Here are various examples of TransferVision doing so:

### Example 1:

![image](https://github.com/user-attachments/assets/4376289d-4f1d-4629-ac2c-2a1508c8330b)

![image](https://github.com/user-attachments/assets/fc386d31-cd48-4da9-ab1b-856582a56259)

**Each option shown by TransferVision happens to be asynchronous.**

*From College Of San Mateo's Fall & Spring 2024 Class Schedule*

![image](https://github.com/user-attachments/assets/822dc980-7161-4620-897c-753c803a2afb)
![image](https://github.com/user-attachments/assets/b55a77b7-544c-4317-83fb-f95e45b4d800)

*From Evergreen Valley College's Fall 2024 Class Schedule*

![image](https://github.com/user-attachments/assets/764e9bf6-0bd8-4053-a012-c8fc6f29cdd8)

If this course wasn't asynchronous, I would have been able commute a short distance in order to take it, due to EVC being relatively close to me. This is another dimension that TransferVision has over CVC.

*From Laney College's Fall 2024 Class Schedule (2 asynchronous sections taught by Professor Ortak)*

![image](https://github.com/user-attachments/assets/1cc2d97f-afeb-42cf-b8ba-939f784a091a)

### Example 2:

![6d3dbe5f7e24ab1de3420f0c21c89ce5](https://github.com/user-attachments/assets/e6d4baa5-3f9c-48f3-a9c2-ee50d9504ddf)

**Similar courses are listed on CVC, but according to ASSIST.org, none of these courses truly articulate to PHILOS 12A.**
**Here is the ASSIST.org agreement for Saddleback College.**

![image](https://github.com/user-attachments/assets/66fcd555-768d-4d47-80c6-b30d91b3f2c2)

**Along with this, Saddleback College is not present on the list of colleges that offer courses that articulate to PHILOS 12A.**

![3649f390639afb69135d6dafc7de9065](https://github.com/user-attachments/assets/f04710e6-5f2d-4c14-9ab6-27bc9d27ec6c)

*From Los Angeles Pierce College's Fall 2024 Class Schedule*

![image](https://github.com/user-attachments/assets/035cbf01-85a5-4079-a9a0-6243038655eb)

*From Sierra College's Fall 2024 Class Schedule*

![image](https://github.com/user-attachments/assets/71f6ebb6-c2d2-41b3-8c50-6d05fd629015)

*From Chaffey College's Fall 2024 Class Schedule*

![image](https://github.com/user-attachments/assets/53c75355-ba56-4efe-aa20-75bbffaebb92)

*From Grossmont College's Fall 2024 Class Schedule*

![image](https://github.com/user-attachments/assets/8ce1462d-fd6f-4c67-8885-243f58dcdbe8)

Some of these may be very specific, but people often have specific goals for what major they'd like to transfer into. UC/CSU institutions tend to recommend completing as many lower division requirements as possible prior to transfer. In fact, some majors may *require* all requirements to be met prior to transfer.
