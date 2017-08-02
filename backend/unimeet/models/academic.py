# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models


class School(models.Model):
    university = models.ForeignKey('unimeet.University')

    name = models.CharField(
        default='',
        max_length=255,
        help_text=('The school name.')
    )

    site = models.URLField(
        default='',
        help_text=('The school website.')
    )

    mailRegex = models.CharField(
        default='',
        max_length=255,
        help_text=('The regex for the email that the students use.')
    )

    unique_together = ('university', 'name')


class University(models.Model):
    city = models.ForeignKey('unimeet.City')

    name = models.CharField(
        default='',
        max_length=255,
        help_text=('The university name.')
    )

    unique_together = ('city', 'name')
