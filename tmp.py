from models.user import User
from models import storage
from models.queue.tasks import task_send_mail

user: User = storage.match(User, firstname='Abraham')
config = user.smtp_configs[0]
print(config.alias)


Subject = "Action Required {{ firstname }}: Welcombe Onboard to your SMTP Journey"
template_email = """
<h1>Hello {{ firstname }} {{ lastname }}, your path to unending mail merging system.</h1>

<p>
Using dictionaries, lists, or tuples for custom types can be more lightweight and straightforward compared to defining classes, especially for simple data structures or when you don't need to encapsulate behavior (methods) with the data. However, for more complex scenarios or when you want to define specific behavior, classes are a more suitable choice.
</p>
"""

fields: dict = {
    'Subject': Subject,
    'body': template_email,
    'receipient': {'firstname': 'Abraham', 'lastname': 'Olagunju', 'email': 'olagunjusola070@gmail.com'},
    'content_type': 'html',
    'config_id': config.id
}

task_send_mail.apply_async(kwargs=fields)
