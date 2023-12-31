<img src="https://i.imgur.com/iohZqCp.png">

# Django URLs, Views, and Templates

## Learning Objectives

| Students Will Be Able To: |
|---|
| Describe the Django Request/Response Cycle |
| Start a new Django project and create an app |
| Use a URL configuration module to define routes |
| Define basic View functions |
| Define a Django template |
| Use template inheritance (partial templates) |
| Include static files in a template |
| Render data in a template |

## Road Map

1. Learning Django Game Plan
2. Review the Request/Response Cycle in Django
3. Start the Cat Collector Project
4. Add the GitHub Remote to Sync With
5. Defining Routes (URLs)
6. Defining View Functions
7. Using Django Templates
8. Template Inheritance (Partials)
9. Including Static Files in a Template
10. Rendering Data in a Template
11. Summary
12. Labs for Cat Collector Lessons

## 1. Learning Django Game Plan

We've got a great set of Django lessons coming your way!

The lessons will add features, piece-by-piece, to a modern full-stack reference app named **Cat Collector**.

Let me show you the final version we're going to build this week.

Then, after the lessons, you will use lab time to repeat what you saw in the lesson by building your own app named anything you want, say - **Finch Collector**.

Here's an overview of the high-level topics we'll be covering, in order:

1. Django URLs, Views, and Templates
2. Data Models and Migrations
3. Django Class-based Views
4. One-to-Many Models & ModelForms
5. Many-to-Many Models
6. Uploading Images to the Cloud
7. Django Authentication

Let's get on with part 1...

## 2. Review the Request/Response Cycle in Django

Once again, let's review the following diagram that shows how a request flows through a Django project:

<img src="https://i.imgur.com/1fFg7lz.png">

The Request/Response Cycle in Django is the same as in Express in that:

- Clicking links and submitting forms on the front-end (browser) sends HTTP requests to the web app running on a web server.
- The web app has a routing mechanism that matches HTTP requests to code.
- That code typically performs CRUD, then either:
	- Renders dynamic templates for Read data operations.
	- Redirects the browser in the case of Create, Update or Delete data operations. 

## 3. Start the **Cat Collector** Project

### Create the database

Databases are not automatically created by Django.

Let's use the `createdb` command, installed with PostgreSQL, to create the database for the Cat Collector project:

```
createdb catcollector
```

Named using lowercase and ran together will work well.

> 👀 A `dropdb` command is also available for deleting databases from PostgreSQL.

### Start the Project

Let's put in a rep creating a Django project/app!


Move into your **~/code** folder:

```
cd ~/code
```

Run the following command to create the Django project:

```
django-admin startproject catcollector
```

The above command generated and configured a Django project in a folder named **catcollector** - move into it:

```
cd catcollector
```

Open the project folder in VS Code:

```
code .
```

Open an integrated Terminal and we're off to a great start...

### Create the App

A Django _project_ contains Django _apps_.

Django apps represent major functionality in a project, although you would typically create only a single app within the project.

Take a look at the `INSTALLED_APPS` list in **catcollector/settings.py**. Those pre-installed apps provide services such as the admin app and the ability to serve static files.

For Cat Collector, as well as for your project 3, you will need an app to implement the main functionality, in this case collecting cats 😸

It makes sense to name the main app generically, so let's do it:

```
python3 manage.py startapp main_app
```

You'll now find a **main_app** folder within the top-level project folder. That folder has been configured to be a Python package which is a way to organize modules.

Let's include it as part of the Cat Collector project by adding it to the `INSTALLED_APPS` in **settings.py**:

```python
INSTALLED_APPS = [
	'main_app',
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.staticfiles',
]
```

Let's check to make sure the project starts up:

```
python3 manage.py runserver
```

Ignore the red message about unapplied migrations, we'll take care of those in a bit.

Browse to `localhost:8000` and make sure you see the rocket on the page:

<img src="https://i.imgur.com/RozMgJ0.png">

### Connecting to the Database

Earlier we created a dedicated `catcollector` PostgreSQL database.

A Django project's configuration lives in **settings.py**. Let's update it to use our `catcollector` database:

**Note:** Some students may have to include the following fields(HOST, USER, PASSWORD), it depends how your postgres is setup locally. For example, the most common setup for windows and linux users may require you to include these three fields to properly connect to your local postgres instance. You can also use the 'PORT' property to change the port to something other than :8000

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'catcollector',
        # 'HOST': 'localhost',  <-- (optional) some computers might need this line
        # 'USER': 'admin', <-- (optional) postgres user name, if you have to sign into an account to open psql, you will want to add that user name here.
        # 'PASSWORD': 'password123', <-- (optional) postgres user password, if you have to sign into an account to open psql, you will want to add that user password here.
        # 'PORT': 3000 <-- if you desire to use a port other than 8000, you can change that here to any valid port id, some number between 1 and 65535 that isn't in use by some other process on your machine. The reason for this port number range is because of how TCP/IP works, a TCP/IP protocol network(the most widely used protocol used on the web) allocated 16 bits for port numbers. This means that number must be greater than 0 and less than 2^15 -1. 
    }
}
```

> 👀 By default, Django uses SQLite, a lightweight database that is not recommended for deployment.

We'll continue to the red unapplied migration message if the project successfully connected to the `catcollector` database. 

### Migrating the Pending Migrations

We use migrations to update the database's schema over time to meet the project's needs.

There are several migrations **pending**, i.e., just waiting to be applied to the database - let's do it: 

```
python3 manage.py migrate
```

We will cover migrations in more detail in the next lesson.

Nice - no more pending migrations!

Now let's code our first feature: a HOME page.

## 4. Add the GitHub Remote to Sync With

### Connect to the Remote

Let's connect to a remote repo that you can sync with just in case you can't resolve typos within a reasonable amount of time:

1. `git init`
2. `git add -A`
3. `git commit -m "Initial commit"`
4. `git remote add origin https://git.generalassemb.ly/sei-blended-learning/catcollector.git`
5. `git fetch --all`

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-1-setup`**

<hr>
</details>

### Updating the Database After Syncing Code

It's possible that you may receive new or different migration files when syncing code.

Just in case, always attempt to apply any new migrations after syncing code:

```
python3 manage.py migrate
```

### Unable to Migrate Database Due to Errors

Unfortunately, it's possible that the newly synced with code can have migrations that are incompatible with previously applied migrations.

If this is the case, the quickest fix is to delete the current database and create a new one.

> 👀 The following steps will delete any existing data that you may have saved in your current database.

Run the following commands in Terminal (**only if necessary**) to delete & replace the current database if having issues after syncing your code:

1. `dropdb <database name>`
2. `createdb <database name>`
3. `python3 manage.py migrate`
4. `python3 manage.py createsuperuser`<br>(you'll learn about this next lesson)

## 5. Defining Routes (URLs)

Just like with Express, there needs to be a route defined that matches each HTTP request coming from the browser.

<details>
<summary>
❓ What kind of error will we receive when there is no route defined that matches a given HTTP request? 
</summary>
<hr>

**404 Not Found**

<hr>
</details>

But, let's not forget that Django's routing system only cares about the URL (path) of the request and ignores the HTTP method.

For the HOME page functionality, we'll use the root route (`http://localhost:8000`) - let's see how...

### One-time URL Setup

In Django, routes are defined within modules named **urls.py**.

There's an existing project **catcollector/urls.py** that we could add additional routes to, but it's a best practice for each Django app to define its own and **include** those URLs in the project's.

> 👀 There are some helpful comments at the top of **catcollector/urls.py**.

Start by setting up **main_app**'s own **urls.py**:

1. Create the **urls.py** module:

	```
	touch main_app/urls.py
	```

2. Include it in the project's **catcollector/urls.py**

	```python
	from django.contrib import admin
	# Add the include function to the import
	from django.urls import path, include
	
	urlpatterns = [
	    path('admin/', admin.site.urls),
	    # '' represents the "starts with" path
	    path('', include('main_app.urls')),
	]
	```

	Be sure to import the `include` function near the top.
	
	Each item in the `urlpatterns` list defines a URL-based route or, as in the case above, mounts the routes contained in another urls.py module.
	
	Similar to how Express appends paths defined in a router module to the path in `app.use`, the paths defined in `'main_app.urls'` will be appended to the path specified in the `include` function.
	
	You can close **catcollector/urls.py** since all routes we define from this point forward will be defined within **main_app/urls.py**.

3. Now for the boilerplate needed in **main_app/urls.py**:

	```python
	from django.urls import path
	from . import views
	
	urlpatterns = [
	
	]
	```

	We've imported the `path` function that will be used to define each route.
	
	We've also created the required `urlpatterns` list that will hold each route we define for `main_app`.

### Define `main_app`'s Home Page URL

With the setup done, we're ready to define the route to display the Home page.

In **main_app/urls.py**:

```python
urlpatterns = [
  path('', views.home, name='home'),
]
```

The above code defines a root route using an **empty string** and maps it to the `view.home` view function that does not exist yet - making the server unhappy.

The `name='home'` kwarg gives the route a names.  Naming a route is optional but is considered a best practice.  We will see how naming a route comes in handy later.

The Home page route has been defined!  On to the view...

## 6. Defining View Functions

<details>
<summary>
❓ What is the equivalent to a Django View Function in Express?
</summary>
<hr>

**Controller Function**

<hr>
</details>

In the route for the Home page we referenced a view function named `home`.

We will define all of the app's views in **main_app/views.py**.

Let's define the `home` view function and render a non-existing template:

```python
from django.shortcuts import render

# Define the home view
def home(request):
  # Include an .html file extension - unlike when rendering EJS templates
  return render(request, 'home.html')
```

All view functions need to define a positional parameter to accept the `request` object Django will be passing in.  This `request` object is very much like the `req` object we worked with in Express controller functions.

As expected, refreshing `localhost:8000` will cause an error complaining that the template does not exist:

<img src="https://i.imgur.com/J9WKz5A.png">

A very helpful error - let's fix it...

## 7. Using Django Templates

By default, a Django project is configured to look for templates inside of a `templates` folder within each app's folder (`main_app` in this case).

Let's create that `templates` folder for `main_app` to hold all of its template files:

```
mkdir main_app/templates
```

### Create a `home.html` Template

Now we can easily solve our error by creating the missing template and adding a bit of HTML:

1. Create a **templates/home.hm** file
2. Add the HTML boilerplate (`!` + `[tab]`)
3. Add a `<h1>Home</h1>` within the `<body>`

> 👀 Unlike EJS templates, Django templates use the common `.html` file extension.

Yep, it's not fancy, but we've implemented a feature in Django! 😀

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-2-home-page`**

<hr>
</details>

Before we continue learning more about templating, etc. in Django, navigate to the next page where you will have the opportunity to put in a rep implementing an "About" page...

### 👉 You Do - Define another URL, View Function and Template (10 mins)

1. Define another route with a path of `about/`.  The path's trailing slash instead of a leading slash is the Django way and is critical to follow.

2. Map the route to a view named `views.about`.

3. Name the route `'about'`.

4. Code the `about` view function in **views.py** so that it renders a template named `about.html`

5. Create the **templates/about.html** file.

6. Add the boilerplate and add HTML between the `<body>` tags:

	```html
	<h1>About the Cat Collector</h1>
	<hr>
	<p>Hire the Cat Collector!</p>
	<footer>All Rights Reserved, &copy; 2022 Cat Collector</footer>
	```

7. Test it out by browsing to `localhost:8000/about`

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-3-about-page`**

<hr>
</details>

So far, so good, but we haven't yet used any of DTL's capability to dynamically render data, etc.

But before we continue to break the DRY principle by repeating the boilerplate in future templates, let's see how to use Django's **Template Inheritance**.

## 8. Template Inheritance (Partials)

Django has a [template inheritance](https://docs.djangoproject.com/en/4.1/ref/templates/language/#template-inheritance) feature built-in.

Template inheritance is like using partials in EJS with Express, except they're more flexible.

The reason Django calls it template _inheritance_ is because:

- You can declare that a template **extends** another template.
- When a template extends a "base" template, it's content defined in a "block" replaces the same "block" in the "base" template as shown below:

<img src="https://i.imgur.com/D4qnlWH.jpg">

Let's apply this concept in Cat Collector by first creating a **base.html** template (named by convention):

```
touch main_app/templates/base.html
```

The "base" template contains all of the boilerplate and markup that belongs on every template that extends it, such as the `<head>`, navigation, even a footer if you wish.

> 👀 Multiple "base" templates is rarely needed but can be defined if need be.

This will be our sweet boilerplate for now:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Cat Collector</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
</head>
<body>
  <header class="navbar-fixed">
    <nav>
      <div class="nav-wrapper">
        <ul>
          <li><a href="/" class="left brand-logo">&nbsp;&nbsp;Cat Collector</a></li>
        </ul>
        <ul class="right">
          <li><a href="/about">About</a></li>
        </ul>
      </div>
    </nav>
  </header>
  <main class="container">
    {% block content %}
    {% endblock %}
  </main>
  <footer class="page-footer">
    <div class="right">All Rights Reserved, &copy; 2021 Cat Collector &nbsp;</div>
  </footer>
</body>
</html>
```

Cat Collector will be using the [Materialize CSS Framework](https://materializecss.com/) which is based on Google's Material Design philosophy.

However, the most important part of the boilerplate in regards to template inheritance is:

```html
{% block content %}
{% endblock %}
```

This is our first look at DTL(Django Templating Language) **template tags**, `block` & `endblock`, enclosed within the template tag delimiters `{% %}`.

Django [template tags](https://docs.djangoproject.com/en/4.1/ref/templates/builtins/#ref-templates-builtins-tags) control logic within a template.  Depending upon the tag, they may, or may not, result in content being emitted in the page. 

Whenever another template **extends** this **base.html**, that other template's `{% block content %}` will replace the same block in **base.html**.

To see template inheritance in action, let's update **about.html** so that it extends **base.html**:

```html
{% extends 'base.html' %}
{% block content %}

<h1>About the Cat Collector</h1>
<hr>
<p>Hire the Cat Collector!</p>
<footer>All Rights Reserved, &copy; 2022 Cat Collector</footer>

{% endblock %}
```

Refresh. Yeah, it's not great (yet), but the template inheritance is working and we can stay nice and DRY.

## 9. Including Static Files in a Template

As you know, web apps usually have static files such as `.css`, `.js`, image files, etc.

If we want Cat Collector to look better, we're going to have to be able to define some custom CSS.

Django projects are pre-configured with a `'django.contrib.staticfiles'` app installed for the purpose of serving static files.

At the bottom of **settings.py**, there is a `STATIC_URL = 'static/'` variable that declares the name of the folder that will contain static files within Django apps.

We need that, so let's create it:

```
mkdir main_app/static
```

Next, let's create a folder within `static` dedicated to CSS:

```
mkdir main_app/static/css
```

Now let's create a `style.css`:

```
touch main_app/static/css/style.css
```

Just to make sure that **style.css** is properly loaded, let's put in a touch of hideous CSS:

```css
body {
  background-color: red;
}
```

We also have to update **base.html** by first adding the `load` template tag at the top:

```html
{% load static %}

<!DOCTYPE html>
```

Finally, add this `<link>` below the Materialize CDN:

```html
<link rel="stylesheet" type="text/css" href="{% static 'css/style.css' %}">
```

The `static` DTL template tag ensures that the correct URL is assigned to the `href`.

> 👀 Django caches templates & statics, so we'll need to restart the server!

Refresh - and red city tells us that **style.css** is being loaded.  Let's update it with the following more pleasing CSS:

```css
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}

footer.page-footer {
  padding-top: 0;
  text-align: right;
}
```

That's better!

<img src="https://i.imgur.com/ChPjvKm.png">

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-4-statics`**

<hr>
</details>

## 10. Rendering Data in a Template

To see how data is rendered dynamically using Django templating, we're going to implement the following user story:

> _As a User, when I click the **View All My Cats** link, I want to see a page listing all of my cats._

Luckily the [process of how to add a feature to a web application](https://gist.github.com/jim-clark/9f9bd19d60d9ce2ec57be8242b6aee96) from the previous unit you had tattooed applies to all web frameworks!

### Step 1 - Identify the "Proper" Route

Although Django's URL-based routing doesn't follow the RESTful routing methodology, we can still rely on our training thus far and use similar paths when possible.

RESTful routing calls for a path of `/cats` when we want to see all cats - so we'll go with it!

### Step 2 - Create the UI

For the UI, it makes sense to add the **View All My Cats** link to the navigation bar in **base.html**:

```html
<li><a href="/about">About</a></li>
<!-- new markup below -->
<li><a href="/cats">View All My Cats</a></li>
```

> 👀 It's important to continue to use leading slashes in the HTML!

A quick refresh and we have our link:

<img src="https://i.imgur.com/4DZVGiI.png">

### Step 3 - Define the Route

Now let's add the new route to **main_app/urls.py**:

```python
urlpatterns = [
  path('', views.home, name='home'),
  path('about/', views.about, name='about'),
  # route for cats index
  path('cats/', views.cats_index, name='index'),
]
```

We only have a single **views.py**, so by naming the view `cat_index` we're anticipating that there might be another _index_ view for a different resource in the future (_toys_ maybe?).

Of course, by referencing a nonexistent view, the server's not happy.

### Step 4 - Code the View

When working in Django, we'll just have to get used to calling _controller functions_ **views** instead.

Let's code the `cats_index` view inside of **views.py**:

```python
# Add new view
def cats_index(request):
  # We pass data to a template very much like we did in Express!
  return render(request, 'cats/index.html', {
    'cats': cats
  })
```

Two interesting things above:

1. We're namespacing the `index.html` template by putting it in a new `templates/cats` folder for organizational purposes - just like we did in Express.

2. Similar to how we passed data to a template in Express using a JS object, we pass a dictionary as a third positional argument in Django's `render` function.

#### We Need Some Cats!

In the next lesson, we'll create a `Cat` model but for now we're simply going to use a Python list containing a couple of "cat" dictionaries near the top of **views.py**:

```python
# views.py

# Add this cats list below the imports
cats = [
  {'name': 'Lolo', 'breed': 'tabby', 'description': 'furry little demon', 'age': 3},
  {'name': 'Sachi', 'breed': 'calico', 'description': 'gentle and loving', 'age': 2},
]
```

### Step 5 - Respond to the Client's HTTP Request

✅ We've already written the code to respond using the `render()` method in the view.

However, we need to create the **cats/index.html** template currently being rendered.

First we need the `templates/cats` folder we'll use to organize cat related templates:

```
mkdir main_app/templates/cats
```

Now create the **cats/index.html** template file:

```
touch main_app/templates/cats/index.html
```

Now the fun stuff!

```html
{% extends 'base.html' %}
{% block content %}

<h1>Cat List</h1>

{% for cat in cats %}
  <div class="card">
    <div class="card-content">
      <span class="card-title">{{ cat.name }}</span>
      <p>Breed: {{ cat.breed }}</p>
      <p>Description: {{ cat.description }}</p>
      {% if cat.age > 0 %}
        <p>Age: {{ cat.age }}</p>
      {% else %}
        <p>Age: Kitten</p>
      {% endif %}
    </div>
  </div>
{% endfor %}

{% endblock %}
```

There are two control flow template tag constructs you'll use quite a bit:

- The `{% for %}` / `{% endfor %}` block used to perform looping
- The `{% if %}` / `{% elif %} / {% else %} / {% endif %}` block used for branching.

> 👀 Django template tags are designed to mimic their Python counterparts, however, they are not embedding Python the way EJS embedded JavaScript.  For example, Python does not have `endfor` or `endif` as part of the language.

The double curly brace syntax `{{}}` is used to print the values of variables and object properties.

If the property on an object is a method, it is automatically invoked by the template engine without any arguments and we **do not** put parenthesis after the method name.  For example, assuming a person object has a `getFullName` method, it would be printed like this `{{ person.getFullName }}` in the template. This is another example of how DTL is its own language and not Python. It is necessary to clarify that DTL is not technically a programming language, it is a templating language, like HTML or EJS. A templating language is a tool used to specify placeholders and structure for how information will be presented or processed by some other process.  

Some of you have probably already clicked the link and are understandably grinning!

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-5-finish-urls`**

<hr>
</details>

## 11. Summary

You now have a minimal but functional application that renders an **index** page that dynamically displays a hardcoded list of cats.

You now know pretty much all there is to know about the structure of a Django app!

In the next lesson we'll learn about Django Models where we'll code a `Cat` Model and use it to CRUD 😸😸😸 in the database!

## 12. Labs for Cat Collector Lessons

In this unit, the lab for each Django lesson will be to repeat everything done in the lesson, except you'll "collect" something else, like Finches, and call the project something like finchcollector, or whatever you are collecting 😀

The final version of your "Finch Collector" will be a deliverable.

Because your completed Finch Collector project will be fairly comprehensive, it will likely make a nice addition to your portfolio.

Be sure to create your project within your **~/code** folder and push it to a repo in your personal GitHub account.

## References

[Django Template Docs](https://docs.djangoproject.com/en/4.1/ref/templates/)

[Django Static Files](https://docs.djangoproject.com/en/4.1/howto/static-files/)
