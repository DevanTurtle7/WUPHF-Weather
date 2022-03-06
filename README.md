# WUPHF Weather

## Inspiration
We wanted to challenge ourselves and learn a lot of new technologies in this hackathon. We remembered an [office episode](https://www.youtube.com/watch?v=OrVskziCc4w) where they created a fictional product called WUPHF where it would notify you on everything at the same time. We thought it would be fun to try to pack as many notification methods into an app as possible.

We thought this would be a great way to use a lot of different technologies in one application. The sponsor Twilio also inspired us because they provided us with a way to send SMS/phone calls automatically.

## What it does
Our app allows you to sign up for a daily weather notification that informs you about the weather for the day with a little message. When you sign up for the app you provide your email and phone number and give us access to your location. We then ask you to choose a time you want to be notified.

WUPHF Weather automatically sends you a message on every platform you have registered.

It looks something like this:
```
Whew, it's going to be a cold one out there today. While it could be worse, I still recommend a few layers. Think about covering up those ears and fingers, and make sure to wear a warm jacket! Someone put a spoon under their pillow last night! Get ready for some snow today, and be careful on the roads. Think about wearing boots and a jacket when you go outside.
```

## How we built it
We built our application using lots of new software and tools!

We used **CockroachDB** for the backend database, **FastAPI** for the backend API server, **Twilio** for SMS/Phone calls, **Twilio Send Grid** for an email API, and **React Native** for the mobile app.

Devan created the front end. Nick and Ethan created the backend.

## Challenges we ran into
We never had any major roadblocks in the project, but it was challenging learning new APIs and tools for this hackathon. We had to read a lot of documentation and make test programs to learn how to do everything.

## Accomplishments that we're proud of
We are proud of pushing through and using lots of new technologies to make a fun app.

Devan has never used React Native before and was able to create a mobile app interface.

Nick and Ethan had never used FastAPI, Twilio, or CockroachDB before and were able to create a really clean backend.

We learned from our mistakes at our last hackathon and performed better this time. We had a lot of issues with CORS and were able to go through this hackathon without any CORS errors.

## What we learned
We learned a lot about how CockroachDB works and how useful Twilio is. We learned a lot about FastAPI and are definitely going to use it at future hackathons and future projects.

We learned about React Native and how it is useful for making mobile/web apps with one codebase.

## What's next for WUPHF Weather
We are planning on adding more ways to notify you. We built our backend and frontend in a way that is very extensible so it will be easy to add future notification methods.

## Try It!
![Screenshot](./docs/qrCode.png?raw=true)
