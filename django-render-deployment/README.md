[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

## Overview

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Preparation](#preparation)
  - [Before We Start](#before-we-start)
  - [List of Dependencies](#list-of-dependencies)
  - [Setting Up Your ENV](#setting-up-your-env)
- [Setting Up Your Files](#setting-up-your-files)
- [neon.tech (cloud database)](#neontech-cloud-database)
- [bit.io (cloud database) (No longer recommended - sunsetting June 2023)](#bitio-cloud-database-no-longer-recommended---sunsetting-june-2023)
- [Render (deploy site)](#render-deploy-site)
- [CONGRATS! YOUR API IS DEPLOYED! NOW CLICK YOUR DEPLOY LINK!](#congrats-your-api-is-deployed-now-click-your-deploy-link)
- [License](#license)

## Prerequisites

-   A working, tested django application using django templates.
-   An account with [Render](https://render.com/). 
-   One of the following:
    -   An account with [neon.tech](https://neon.tech/).
    -   An account with [bit.io](https://bit.io/). (not recommended anymore, sunsetting in June of 2023)

## Preparation

* We will be using [neon.tech](https://neon.tech/) to host our database.

> In short, neon.tech is the fastest and easiest way to set up a PostgreSQL database that is hosted somewhere online.

* We will use [Render](https://render.com/) to deploy our apps.

> Render is a unified cloud to build and run all your apps and websites with free TLS certificates, a global CDN, DDoS protections, private networks, and auto deploy from Git.

### Before We Start
**Make sure to add your `SECRET_KEY` to your `.env` file!**

If you don't already have a `.gitignore` file, create it now in the top-level

* Make sure the `.env` file is included in `.gitignore`. This ensures that any private information will not be published to github.
  * If you've forgotten to use `.gitignore` and accidentally added in the `.env` file to git, you can remove it with the following command: `git rm .env`
* Make sure your code runs using `python manage.py runserver` at the root of your app
  * Do you get an error that looks like "xyz module is not found"? We might be missing some dependencies! Run the following command inside your virtual environment folder for each module you're missing:
    `pipenv install xyz`
* git `add`, `commit`, and `push` all your code to github  **after completing the entire preparation section**!

### List of Dependencies
You may have more than this, but you'll need at least these to be able to deploy:
```
dj-database-url
django
django-environ
gunicorn
psycopg2-binary
whitenoise
```
### Setting Up Your ENV
After installing your dependencies go to `settings.py` in your django app:
1. Underneath `from pathlib import Path` add:
```py
import environ
import os

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)
```
2. Underneath `BASE_DIR = Path(__file__).resolve().parent.parent` add
```py
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))
```
3. Change `SECRET_KEY='...'` to:
`SECRET_KEY = env('SECRET_KEY')`
## Setting Up Your Files
1. At the top of the `settings.py` file, underneath `from pathlib import Path` add `import dj_database_url`
2. Change `DEBUG = True` to:
```py
DEBUG = 'RENDER' not in os.environ
```
3. Underneath `ALLOWED_HOSTS` add:
```py
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)
```
4. In your `MIDDLEWARE` section, add this as your second line of middleware:
```py
'whitenoise.middleware.WhiteNoiseMiddleware',
```
5. Make sure to add this new `DATABASES` info underneath your current `DATABASES`:
```py
DATABASES = {
    'default': dj_database_url.config(     
    default='postgresql://postgres:postgres@localhost:5432/<name_of_database>',        
    conn_max_age=600    )
    }
```
6. At the bottom of the file, beneath `STATIC_URL = 'static/'` add:
```py
if not DEBUG:
    # Tell Django to copy statics to the `staticfiles` directory
    # in your application directory on Render.
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

    # Turn on WhiteNoise storage backend that takes care of compressing static files
    # and creating unique names for each version so they can safely be cached forever.
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```
7. At the base of your project (where you have your `manage.py` file) run the command: 

**This will create a file with all your dependencies**
```
pip freeze > requirements.txt 
```

8. Create a file called `build.sh`
* Inside this file you should have the following:
```
pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate
```


## neon.tech (cloud database)

Let's setup our application to use bit.io for the database!

1. Log in to your [neon.tech](https://neon.tech/) account
2. Create a new project
   * For the Database Name, choose a descriptive name, like the name of your project!
3. In the connection details section, click the link that says `Code examples for connecting from different frameworks and languages.`
4. Select `Django`, and copy the example `DATABASES` object, and use that to replace the old `DATABASES` object in your project's settings.py
5. Back in your neon dashboard, in the same section(Connection Details), copy the `Direct Connection` link, and paste as the value for `DATABASE_URL` in your `.env`. 
6. Make sure you `makemigrations` and `migrate`, if applicable!
7. Head over to the next section (Render) and start that process.


## bit.io (cloud database) (No longer recommended - sunsetting June 2023)

Let's setup our application to use bit.io for the database!

1. Log in to your [bit.io](https://bit.io/) account
2. Add a `New Db`
   * For the Database Name, choose a descriptive name, like the name of your project!
3. Click on `Connect` then copy the `Postgres Connection` string.

## Render (deploy site)

1. Log in to your [Render](https://render.com/) account
2. Click on `New +` and select `Web Service`
3. Make sure to connect your `GitHub` account so that you can select the repository that you want to deploy
4. Choose a `Name` that makes sense for your project.
5. Change the `Build Command` to `./build.sh`
6. Change the `Start Command` to `gunicorn` + `the-name-of-your-project.wsgi`
    * Example: `gunicorn catcollector.wsgi`
7. All the way at the bottom, click `Advanced` and add your `Environment Variables`:
    * `DATABASE_URL` should be the `Postgres Connection` string you copied from `bit.io` or `neon.tech`
    * `PYTHON_VERSION` should be 3.8.2
      * You can run `python --version` in terminal to get the number
    * `SECRET_KEY` can be generated by clicking the `Generate` button
    * Add any additional variables that you may have used throughout your app
8. Click `Create Web Service`

## CONGRATS! YOUR API IS DEPLOYED! NOW CLICK YOUR DEPLOY LINK!

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
