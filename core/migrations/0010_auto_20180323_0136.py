# Generated by Django 2.0.3 on 2018-03-23 01:36

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_auto_20180323_0129'),
    ]

    operations = [
        migrations.RenameField(
            model_name='fabric',
            old_name='fabric',
            new_name='fabric_type',
        ),
        migrations.AlterField(
            model_name='blind',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2018, 3, 23, 1, 36, 44, 418324, tzinfo=utc)),
        ),
    ]
