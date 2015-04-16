Documentation for Weather Screen
===

The task with weather screen is in `app/block/weatherScreen2` folder. No server needed for its preview. `Version 0.8.0 beta`

Documentation for Weather API
===

The task was:
- Select an open API which you can use in the app to show current weather

Result of a SPILE is:
- you have to have a git repository with simple example
- you have to be ready to prove your decision

I used OpenWeatherMap
---
The API is very intuitive and easy to handle (JSON format). It is free of charge, has powerful functionality and great documentation.

I have simple example
---
However, I could not go without server. First you need to run it using `$node server.js` while being in `dist/` folder.
Then visit my page `localhost:3000/weather`

I have explained my decision...
---
...using this readme.md



Documentation for Login Form
===

The task was:
- Create markup using BEM and preprocessor
- Note: form must be centered by vertical and horizontal

I used BEM partly
---
because this task wasn't very complicated. It was no need to use BEM tools and set up a server for simple login form presentation. YAGNI rules.

Borders of the form
---
It's a poor chance that designer painted a form with such paddings. It was even bigger than my screen! I had two options: it is \<body\> background color or this is still the form element. I leaved background partly. In any case it's easy to fix. However, BEM philosophy means to feel free to exchange components. It's scary to imagine that anyone need such huge form.

Some work needs to be done both with designer
---
For example, font-weight or paddings. I could not measure them exactly.
