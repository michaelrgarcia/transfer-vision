# TransferVision

A tool that aims to alleviate the nuisance of scrolling through ASSIST.org agreements. At a glance, a student can see every class at all California Community Colleges that satisfy their selected transfer or lower division requirement.

The user may experience extensive loading times. This is due to the free-tier of the API service taking a few minutes to restart after inactivity.

> Why don't you just make direct GET requests to the Assist.org API?

Assist.org does not allow GET requests from an unknown origin. Therefore, I have to use my own API to manually scrape JSON from Assist.org API links.


