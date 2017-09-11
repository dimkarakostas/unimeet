# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models


class Service(models.Model):
    name = models.CharField(
        default='',
        max_length=255,
        help_text=('The service name.')
    )

    token = models.CharField(
        default='',
        max_length=255,
        db_index=True,
        help_text=('The service UId token.')
    )

    activeUsers = models.IntegerField(
        default=0,
        help_text=("The connected users.")
    )
