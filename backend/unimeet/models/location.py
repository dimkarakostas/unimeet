# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models


class City(models.Model):
    country = models.ForeignKey('unimeet.Country')

    name = models.CharField(
        default='',
        max_length=255,
        help_text=('The city name.')
    )

    class Meta:
        unique_together = ('country', 'name')


class Country(models.Model):
    name = models.CharField(
        default='',
        unique=True,
        max_length=255,
        help_text=('The country name.')
    )
