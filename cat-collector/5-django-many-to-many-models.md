<img src="https://i.imgur.com/HL5YY8J.png">

# Django Many-to-Many Relationships

## Learning Objectives

| Students Will Be Able To: |
|---|
| Use Django's `ManyToManyField` to Implement a M:M Relationship |
| Add an Association in a M:M Relationship |
| Remove an Association in a M:M Relationship |

## Road Map

1. Setup
2. Review the Starter Code
3. Many-to-Many Relationships in RDBMs
4. Many-to-Many Relationship in Django
5. Implement the Cat & Toy Association in Cat Collector
6. Refactoring the `CatCreate` CBV
7. Practice Exercise
8. Lab Assignment
9. Further Study

## 1. Setup 

Because many-to-many relationships require two existing data resources, i.e., two existing Models, a `Toy` Model and its CRUD functionality has been implemented in the starter code.

Don't worry, none of the additional code has anything that you haven't already worked with.

This way, we can focus on how to implement the actual `Cat >--< Toy` relationship in this lesson.

Thus, syncing Cat Collector with the starter code for this lesson is mandatory:

1. Move into the `catcollector` project:
    ```
    cd ~/code/catcollector
    ```
2. Open the project in VS Code:
    ```
    code .
    ```
3. Open an integrated terminal:
    ```
    [ctrl] + [backtick]
    ```
4. Sync with the starter code:
    ```
    git reset --hard origin/sync-18-many-starter
    ```
5. Because a new `Toy` model has been added, a new migration file exists in the starter code that has not yet been migrated to the database on your computer.  Verify this by running:
    ```
    python3 manage.py showmigrations
    ```
6. As you can see, there's an "unchecked" migration that has yet to be migrated - let's do that now:
    ```
    python3 manage.py migrate
    ```

7. Finally, we can start up the server:
    ```
    python3 manage.py runserver
    ```

> 👀 You just saw a common workflow that you'll come across when developing your group project!  Only one team member would have created a new model and ran `python3 manage.py makemigrations`.  Then, you would have received that new migration via syncing your code with the project repo where you would then migrate the newly received migration file.

## 2. Review the Starter Code

Let's browse to `localhost:8000` and create some toys so that we can check out the CRUD features for toys and assign them to cats later!

Here are the toys that 9 out of 10 cats enjoy:

```
Bouncy Mouse / Blue
Cat Charmer / Green
Catnip Banana / Gold
Whacky Mouse Chaser / Purple
```

As you can see, the `Toy` Model is pretty minimal, just `name` and `color` attributes.

Let's take a look at the `Toy`-related Django modules in `main_app`:

- **models.py**
- **urls.py**
- **views.py**
- **admin.py**

## 3. Many-to-Many Relationships in Relational Databases

Unlike MongoDB, due to its ability to use arrays, relational databases need a **join table** to implement many-to-many relationships.

A row in a join table is used to "associate" two rows in the related tables as shown in this diagram:

<img src="https://i.imgur.com/imTYIBl.png">

Each row in the join table contains _foreign keys_ for the other two tables' _primary keys_.

So, when we "associate" a cat and a toy a new row will be added to the join table.  Similarly, to "unassociate" a cat and toy, the corresponding row in the join table is deleted - not a cat row, not a toy row! 

## 4. Many-to-Many Relationship in Django

As usual, the Django framework will handle the heavy lifting when it comes to working with many-to-many relationships between Models.

To implement a many-to-many relationship in the database using Django we:

1. Add a `ManyToManyField` on **one** of the Models
2. Create the migration and migrate it to update the database

Using a `ManyToManyField` causes Django to automatically create a hidden join table used to implement the M:M association.

### Add a `ManyToManyField` on One Side of the Relationship

To create a M:M relationship between two models, we need to add a `ManyToManyField` to **one** of them.

When we do, we'll get to pick the name of that related-manager attribute.

Then, Django will automatically add a related-manager to the other side of the relationship.  This is similar to how Django automatically added a related-manager to cat objects that we could use access a cat's feedings.

<details>
<summary>
❓ What was the name of the related-manager attribute Django automatically added that allowed a cat object to access its feedings?
</summary>
<hr>

**`feeding_set`**, for example:

```python
feedings = some_cat.feeding_set.all()
```

<hr>
</details>

Since we will more commonly be accessing a cat's toys, than a toy's cats, we'll add the new related-manager attribute to the `Cat` model:

```python
class Cat(models.Model):
  name = models.CharField(max_length=100)
  breed = models.CharField(max_length=100)
  description = models.TextField(max_length=250)
  age = models.IntegerField()
  # Add the M:M relationship
  toys = models.ManyToManyField(Toy)
```

> 👀 It definitely makes sense to name that attribute plurally because a cat can have many toys.

### Make and Run the Migration

Because we've made a change to a Model that impacts the database's schema, we must make a migration and migrate it to update the database.

#### 👉 You Do - Make and Apply the Migration (1 min)

You got this!

<details>
<summary>
Try not to peek!
</summary>
<hr>

First, make the migration:

```
python3 manage.py makemigrations
```

Migrate the created migration to update the schema:

```
python3 manage.py migrate
```

<hr>
</details>

We're ready to test drive the new relationship!

### Test Drive the `Cat >--< Toy` Relationship

We'll use the shell to test drive the  relationship:

```
python3 manage.py shell
```

Now let's import everything from **models.py**:

```
>>> from main_app.models import *
```

#### The Related-Manager

Previously we performed CRUD using the `objects` manager on a Model. For example, let's use the manager to query for all cats:

```python
>>> Cat.objects.all()
<QuerySet [<Cat: Maki (2)>, <Cat: Rubber Biscuit (1)>]>
```

We've also used the [related-manager](https://docs.djangoproject.com/en/4.1/ref/models/relations/) to access the feedings for a cat object:

```python
>>> Cat.objects.first().feeding_set.all()
```

The related-manager Django creates for a `ManyToManyField` is similar that for a `ForeignKey`:

```python
>>> cat = Cat.objects.first()
>>> cat
<Cat: Rubber Biscuit (1)>
>>> cat.toys.all()  # toys is the related-manager
<QuerySet []>   # Rubber Biscuit has no toys associated with it yet
```

Let's grab the first toy:

```python
>>> toy = Toy.objects.first()
>>> toy
<Toy: Bouncy Mouse>
```

Although we didn't add an attribute to the `Toy` Model, Django still created a related-manager that allows a toy to read, add & remove associated cats:

```python
>>> toy.cat_set.all()
<QuerySet []>
```

> 👀 Yep, the naming convention Django follows is the same as we saw with a `ForeignKey` related-manager - the related model's name (lower cased) and append `_set`.
 
#### Adding Associations Between a `cat` and a `toy`

To add an association, use the related-manager's [add()](https://docs.djangoproject.com/en/4.1/ref/models/relations/#django.db.models.fields.related.RelatedManager.add) method.

Let's associate the `cat` and the `toy` objects:

```python
>>> cat.toys.add(toy)
>>> cat.toys.all()
<QuerySet [<Toy: Bouncy Mouse>]>
```

> 👀 We can also provide an object's `id` instead of an entire object

Alternatively, `toy.cat_set.add(cat)` would have created the same association.
 
Let's get crazy and associate the last cat with both the first and last toy:

```python
>>> Cat.objects.last().toys.add(Toy.objects.first(), Toy.objects.last())
>>> Cat.objects.last().toys.all()
<QuerySet [<Toy: Cat Charmer>, <Toy: Bouncy Mouse>]>
```

Behind the scenes, there's a huge amount of SQL being sent to the database!

#### 👉 You Do - Add an Association (1 min)

1. Associate the first cat object with the last toy object.
2. Ensure that the toy was associated by running:
    ```python
    >>> Cat.objects.first().toys.all()
    ```
    The last toy should be included in the QuerySet

<details>
<summary>
Try not to peek!
</summary>
<hr>

One approach:

```python
>>> Cat.objects.first().toys.add(Toy.objects.last())
```

Or, starting with the last toy:

```python
>>> Toy.objects.last().cat_set.add(Cat.objects.first())
```

<hr>
</details>

#### Removing Associations

To remove an association, use the related-manager's [remove()](https://docs.djangoproject.com/en/4.1/ref/models/relations/#django.db.models.fields.related.RelatedManager.remove) method.

Let's remove the association between the `cat` and `toy` objects, but this time we'll do it using `toy`:

```python
>>> toy.cat_set.all()
<QuerySet [<Cat: Rubber Biscuit (1)>]>
>>> toy.cat_set.remove(cat)
>>> toy.cat_set.all()
<QuerySet []>    # No more cats
```

The [clear()](https://docs.djangoproject.com/en/4.1/ref/models/relations/#django.db.models.fields.related.RelatedManager.clear) method is used to remove all associations on an instance.

For example, let's use a `for...in` loop and the `clear()` method to remove all associations between all cats and toys:

```python
>>> for c in Cat.objects.all():
...     c.toys.clear()   # Be sure to [tab]
... [press enter]
>>>
```

Fun stuff!  Exit the shell by typing `control + D` or `exit()`

## 5. Implement the Cat & Toy Association in Cat Collector

### User Stories

> _As a User, when viewing the detail page of a cat, I want to see a list of toys the cat has._

and

> _As a User, when viewing the detail page of a cat, I want to be able to add a toy from a list of toys that the cat doesn't already have._

### Displaying a List of Associated Toys

Displaying a cat's toys is just a matter of updating **templates/cats/detail.html**:

```html
<!-- This is all new markup to be added just above the <script> tag -->
<hr>
<div class="row">
  <div class="col s6">
    <h3>{{ cat.name }}'s Toys</h3>
    {% if cat.toys.count %}
      {% for toy in cat.toys.all %}
        <div class="card">
          <div class="card-content">
            <span class="card-title">
              A <span style="color: {{ toy.color }}">{{ toy.color }}</span> {{ toy.name }}
            </span>
          </div>
        </div>
      {% endfor %}
    {% else %}
      <h5>No Toys 😿</h5>
    {% endif %}
  </div>
  <!-- Available toys will come after this line -->
</div>
```

After saving and viewing the detail page for a cat, you'll see something like this:

<img src="https://i.imgur.com/6ZYUF9y.png">

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-19-display-toys-for-cat`**

<hr>
</details>

### Displaying a List of Unassociated Toys

Our next step is to display toys that the cat is not associated with.

Each toy should include an `ADD` button that will add the toy to the list (implemented in the next step).

To be able to display the list of unassociated toys, we'll need to query for them in the `cats_detail` view function and add them to the context (data) being passed to the template.

The following query to find all toys that a cat doesn't have is a bit complicated, but it demonstrates the power of the Django ORM.

In **views.py** update `cats_detail as follows`:

```python
def cats_detail(request, cat_id):
  cat = Cat.objects.get(id=cat_id)
  # Get the toys the cat doesn't have...
  # First, create a list of the toy ids that the cat DOES have
  id_list = cat.toys.all().values_list('id')
  # Now we can query for toys whose ids are not in the list using exclude
  toys_cat_doesnt_have = Toy.objects.exclude(id__in=id_list)
  feeding_form = FeedingForm()
  return render(request, 'cats/detail.html', {
    'cat': cat, 'feeding_form': feeding_form,
    # Add the toys to be displayed
    'toys': toys_cat_doesnt_have
  })
```

The object manager's `exclude` method is like `filter` except that it is used to return objects that don't meet the criteria.

The Django Query API enables [Field Lookups](https://docs.djangoproject.com/en/4.1/ref/models/querysets/#field-lookups) for every field in the model. `id__in` is one such field lookup that checks if the model's `id` is in a list and that list is being created with this code:

```python
id_list = cat.toys.all().values_list('id')
```

Finally, we are passing the toys to the template by adding it to the context dictionary.

Now for more markup to display the toys the cat doesn't have:

```html
</div>
<!-- Available toys will come after this line -->
<!-- New Markup Below -->
<div class="col s6">
  <h3>Available Toys</h3>
  {% if toys.count %}
    {% for toy in toys.all %}
      <div class="card">
        <div class="card-content">
          <span class="card-title">
            A <span style="color: {{ toy.color }}">{{ toy.color }}</span> {{ toy.name }}
          </span>
        </div>
        <div class="card-action">
          <form action="" method="POST">
            {% csrf_token %}
            <button type="submit" class="btn">Add</button>
          </form>
        </div>
      </div>
    {% endfor %}
  {% else %}
    <h5>{{cat.name}} Already Has All Toys Available</h5>
  {% endif %}
</div>
```

Yep, pretty much like what we just added previously, except for a couple of changes.

A form for adding the association has been included, but the `action` attribute is currently empty because we'll implement handling the form being submitted in the next section and we haven't identified what the path will be yet.

Here's what the updated UI looks like:

<img src="https://i.imgur.com/Lbhq1Ff.png">

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-20-available-toys`**

<hr>
</details>

### Making the Association

The app is looking good and all that's left is to handle the form being submitted to associate a toy with the cat.

To do this, the server needs to know the `id` of **both** the cat and the toy being associated.

Let's first add a new routes with a URL pattern that includes both `id`s in **urls.py**:

```python
path('cats/<int:cat_id>/add_feeding/', views.add_feeding, name='add_feeding'),
# associate a toy with a cat (M:M)
path('cats/<int:cat_id>/assoc_toy/<int:toy_id>/', views.assoc_toy, name='assoc_toy'),
```

As you can see, we've created two route parameters:  `cat_id` and `toy_id`.

Now let's make sure the form will post to this route...

### 👉 You Do - Update the `action` Attribute (2 mins)

Now that we have defined the route and named it...

- Use the `url` template tag to write out the proper URL in the form's `action` attribute.

    > Hint: The `assoc_toy` route has **two** route parameters defined, thus both the cat's `id` and the toy's `id` need to be provided.

<details>
<summary>
Try not to peek
</summary>
<hr>

```html
<div class="card-action">
  <form action="{% url 'assoc_toy' cat.id toy.id %}" method="POST">
      {% csrf_token %}
    <button type="submit" class="btn">Add</button>
  </form>
</div>
```

<hr>
</details>

All that's left is to code the `views.assoc_toy` view function:

In **views.py**:

```python
def assoc_toy(request, cat_id, toy_id):
  # Note that you can pass a toy's id instead of the whole toy object
  Cat.objects.get(id=cat_id).toys.add(toy_id)
  return redirect('detail', cat_id=cat_id)
```

The above code is similar to that we used when testing out the relationship in the shell.

Congrats on implementing a many-to-many relationship between cats and toys!

## 6. Refactoring the `CatCreate` CBV

If you browse to **Add a Cat**, you'll notice that the form has an input for the new cat's "toys".

This extra input will prevent us from being able to add a cat, so let's refactor the `fields` attribute of the `CatCreate` CBV as follows:

```python
# views.py

class CatCreate(CreateView):
  model = Cat
  # Refactor fields so that 'toys' is not rendered in form
  fields = ['name', 'breed', 'description', 'age']
```

Awesome!

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-21-assoc-toys`**

<hr>
</details>

Navigate to the next page for a practice exercise...

## 7. 💪 Practice Exercise (15 minutes)

Implement the following user story:

> **_AAU, when viewing the detail page for a cat, I want to be able to remove a toy from that cat_**

Hints:

- "Unassociating" a toy is VERY much the same process as the Associating process we just implemented.

- During the "test drive" we saw how to remove 😀 an association.

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-22-finish-many`**

<hr>
</details>

## 8. Lab Assignment

Lab time is to be spent implementing the same feature in your Finch Collector project 🦜

## 9. Further Study

Although Django automatically creates a "hidden" join table to implement a many-to-many relationship, there are times where it would be beneficial to be able to add additional attributes to that join table.

As an example, a `Ticket` Model provides the role of a join table between a `Concert` and a `Customer`:

```
Concert --< Ticket >-- Customer
```

In essence, a _Concert has many Customers through Tickets_

Further, a _Customer has many Concerts through Tickets_

Django includes a `through` kwarg to pull this type of relationship off.

```python
class Concert(models.Model):
    name = models.CharField(max_length=100)
    # other attributes here
    
class Customer(models.Model):
    name = models.CharField(max_length=50)
    # other attributes here
    concerts = models.ManyToManyField(Concert, through='Ticket')
    
class Ticket(models.Model):
	 seat = models.CharField(max_length=20)
	 # other attributes here
    concert = models.ForeignKey(Concert, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
```

For more information regarding _many-to-many through relationships_, start [here](https://docs.djangoproject.com/en/4.1/topics/db/models/#intermediary-manytomany) in the docs.

## References

[Examples of CRUD with Many-to-Many Relationships](https://docs.djangoproject.com/en/4.1/topics/db/examples/many_to_many/)
