# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-07-26 15:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('unichat', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='token',
            field=models.CharField(db_index=True, default='', help_text="The user's authentication token for unichat", max_length=40),
        ),
    ]