from models.user import User
from models import storage
from models.queue.tasks import task_bulk_send
from models.smtp_config import SMTPConfig
import random

user: User = storage.match(User, firstname='Abraham')

Subject = "Action Required {{ firstname }}: Welcombe Onboard to your SMTP Journey"
template_email = """
<h1>Hello {{ firstname }} {{ lastname }}, your path to unending mail merging system.</h1>

<p>
Using dictionaries, lists, or tuples for custom types can be more lightweight and straightforward compared to defining classes, especially for simple data structures or when you don't need to encapsulate behavior (methods) with the data. However, for more complex scenarios or when you want to define specific behavior, classes are a more suitable choice.
</p>
"""

recipients = [
    {
        'firstname': 'Abraham',
        'lastname': 'Olagunju',
        'email': 'olagunjusola070@gmail.com'
    },
    {
        'firstname': 'Seyi',
        'lastname': 'Ojo',
        'email': 'oluwaninsolaao@gmail.com'
    },
    {
        'firstname': 'Sunday',
        'lastname': 'Olugbodi',
        'email': 'aolagunju@lodlc.lautech.edu.ng'
    },
]

for _ in range(10):
    config: SMTPConfig = random.choice(user.smtp_configs)
    print('=>', config.alias, '+3')
    fields: dict = {
        'Subject': Subject,
        'body': template_email,
        'recipients': recipients,
        'content_type': 'html',
        'config': config.to_dict(detailed=True)
    }
    task_bulk_send.apply_async(kwargs=fields)
